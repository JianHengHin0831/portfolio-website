<template>
  <div
    class="min-h-screen bg-transparent text-slate-100 font-mono overflow-x-hidden"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))]"
    ></div>

    <div class="max-w-7xl mx-auto px-6 pt-10 relative z-10">
      <div class="flex items-center justify-between">
        <h1 class="text-xl text-emerald-300">
          Cognitive Architecture // Mainboard
        </h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>
      <h1
        class="text-md text-cyan-400 font-mono tracking-wide pb-10 drop-shadow-lg animate-fade-in"
      >
        Explore skill details by selecting any block
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Column 1: Processor Cores -->
        <div class="space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Processor Cores
          </h2>
          <div class="space-y-4">
            <button
              v-for="core in cores"
              :key="core.name"
              @click="handleCoreClick(core.name)"
              class="group w-full text-left transition-all duration-500 ease-in-out"
              :class="coreClass(core.name)"
            >
              <div
                class="border border-white/20 rounded-lg p-4 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-400/60"
              >
                <div class="text-xs text-slate-400">Category</div>
                <h2 class="text-lg text-emerald-300 font-bold">
                  {{ core.name }}
                </h2>
                <div class="h-px bg-white/10 my-2"></div>
                <p class="text-xs text-slate-400">
                  {{ core.skills.length }} modules
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- Column 2: Modules (Skills) -->
        <div class="space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Modules
          </h2>
          <TransitionGroup tag="div" name="list" class="relative space-y-3">
            <button
              v-for="skill in displayedSkills"
              :key="skill.id"
              @click="handleSkillClick(skill)"
              class="block w-full text-left p-3 rounded bg-slate-900/50 border border-white/10 transition-all duration-500 ease-in-out"
              :class="skillClass(skill)"
            >
              <p class="text-slate-200 font-semibold">{{ skill.name }}</p>
              <p class="text-xs text-slate-500">{{ skill.type }}</p>
            </button>
          </TransitionGroup>
        </div>

        <!-- Column 3: Activation History (Projects) -->
        <div class="space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Activation History
          </h2>
          <TransitionGroup tag="div" name="list" class="relative space-y-3">
            <button
              v-for="project in displayedProjects"
              :key="project.id"
              @click="openProjectModal(project)"
              class="block w-full text-left p-3 rounded bg-slate-900/50 border border-white/10 transition-all duration-500 ease-in-out"
              :class="projectClass(project)"
            >
              <p class="text-emerald-300">{{ project.name }}</p>
              <p class="text-xs text-slate-400">{{ project.period }}</p>
            </button>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <SkillModal
      :skill="selectedSkillForModal"
      @close="closeSkillModal"
      @view-project="handleViewProjectFromSkill"
    />
    <ProjectModal :project="selectedProject" @close="closeProjectModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  skills as skillsData,
  projects as projectsData,
  type Skill,
  type Project,
} from "../data/profile";

const categories = [
  "AI/ML",
  "Cloud & DevOps",
  "Frontend",
  "Languages",
] as const;
const cores = computed(() =>
  categories.map((cat) => ({
    name: cat,
    skills: skillsData.filter((s) => s.category === cat),
  }))
);

const activeCore = ref<Skill["category"] | null>(null);
const activeSkill = ref<Skill | null>(null);

const selectedSkillForModal = ref<Skill | null>(null);
const selectedProject = ref<Project | null>(null);

const activeProjectIds = computed(() => {
  const ids = new Set<string>();
  if (activeSkill.value) {
    activeSkill.value.projects.forEach((p) => ids.add(p.id));
  } else if (activeCore.value) {
    skillsData
      .filter((s) => s.category === activeCore.value)
      .forEach((skill) => skill.projects.forEach((p) => ids.add(p.id)));
  }
  return ids;
});

const getSortScore = (item: Skill | Project, type: "skill" | "project") => {
  if (type === "skill" && activeSkill.value && item.id === activeSkill.value.id)
    return 3;
  if (
    type === "skill" &&
    activeCore.value &&
    (item as Skill).category === activeCore.value
  )
    return 2;
  if (type === "project" && activeProjectIds.value.has(item.id)) return 2;
  return 1;
};

const displayedSkills = computed(() => {
  return [...skillsData].sort(
    (a, b) => getSortScore(b, "skill") - getSortScore(a, "skill")
  );
});

const displayedProjects = computed(() => {
  return [...projectsData].sort(
    (a, b) => getSortScore(b, "project") - getSortScore(a, "project")
  );
});

const coreClass = (coreName: Skill["category"]) => {
  if (!activeCore.value)
    return "opacity-80 scale-100 transition-all duration-300 ease-out";

  return activeCore.value === coreName
    ? "opacity-100 scale-110 text-cyan-300 shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all duration-300 ease-out"
    : "opacity-50 scale-95 text-slate-400 blur-sm transition-all duration-300 ease-out";
};

const skillClass = (skill: Skill) => {
  const classes = ["transition-all duration-300 ease-out"];

  if (activeSkill.value && activeSkill.value.id === skill.id) {
    // selected class
    classes.push(
      "opacity-100 scale-110 border border-emerald-400/60 text-cyan-300 shadow-[0_0_15px_rgba(16,185,129,0.6)] hover:shadow-[0_0_25px_rgba(16,185,129,0.8)]"
    );
  } else if (activeCore.value && skill.category === activeCore.value) {
    // is current core
    classes.push(
      "opacity-90 scale-105 text-emerald-300 border border-emerald-300/30 shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    );
  } else if (activeCore.value) {
    //not current core
    classes.push("opacity-40 scale-95 text-slate-400 blur-sm");
  } else {
    //no core
    classes.push("opacity-100 scale-100 text-slate-200");
  }

  return classes.join(" ");
};

const projectClass = (project: Project) => {
  if (!activeCore.value)
    return "opacity-100 scale-100 hover:border-emerald-400/60";
  return activeProjectIds.value.has(project.id)
    ? "opacity-100 scale-105 border-emerald-400/60"
    : "opacity-40 scale-95";
};

const handleCoreClick = (coreName: Skill["category"]) => {
  if (activeCore.value === coreName) {
    activeCore.value = null;
    activeSkill.value = null;
  } else {
    activeCore.value = coreName;
    activeSkill.value = null;
  }
};

const handleSkillClick = (skill: Skill) => {
  if (activeSkill.value?.id === skill.id) {
    selectedSkillForModal.value = skill;
  } else {
    activeCore.value = skill.category;
    activeSkill.value = skill;
  }
};

const openProjectModal = (project: Project) => {
  selectedProject.value = project;
};

const closeProjectModal = () => {
  selectedProject.value = null;
};

const closeSkillModal = () => {
  selectedSkillForModal.value = null;
};

const handleViewProjectFromSkill = (projectId: string) => {
  const project = projectsData.find((p) => p.id === projectId);
  if (project) {
    closeSkillModal();
    setTimeout(() => openProjectModal(project), 150);
  }
};
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(30px);
}
.list-leave-active {
  position: absolute;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease-out;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
