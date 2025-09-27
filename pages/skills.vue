<template>
  <div
    class="min-h-screen bg-transparent text-slate-100 font-mono overflow-x-hidden"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))]"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 relative z-10">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-0"
      >
        <h1 class="text-lg sm:text-xl text-emerald-300">
          Cognitive Architecture // Skills
        </h1>
      </div>
      <h1
        class="text-sm sm:text-md text-cyan-400 font-mono tracking-wide pb-6 sm:pb-10 drop-shadow-lg animate-fade-in"
      >
        Explore skill details by selecting any block
      </h1>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12"
      >
        <!-- Column 1: Processor Cores -->
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Processor Cores
          </h2>
          <div class="space-y-3 sm:space-y-4">
            <button
              v-for="(core, index) in cores"
              :key="core.name"
              data-sound
              @click="handleCoreClick(core.name)"
              class="transition-all duration-500 ease-out group w-full text-left"
              :class="{
                [coreClass(core.name)]: true,
                'opacity-100 translate-y-0': isMounted,
                'opacity-0 translate-y-16': !isMounted,
              }"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div
                class="border border-white/20 rounded-lg p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-400/60"
              >
                <div class="text-[0.7rem] sm:text-xs text-slate-400">
                  Category
                </div>
                <h2 class="text-base sm:text-lg text-emerald-300 font-bold">
                  {{ core.name }}
                </h2>
                <div class="h-px bg-white/10 my-1 sm:my-2"></div>
                <p class="text-[0.7rem] sm:text-xs text-slate-400">
                  {{ core.skills.length }} modules
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- Column 2: Modules (Skills) -->
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Modules
          </h2>
          <TransitionGroup tag="div" name="list" class="relative space-y-3">
            <button
              v-for="(skill, index) in displayedSkills"
              :key="skill.id"
              data-sound
              @click="handleSkillClick(skill)"
              class="transition-all duration-500 ease-out block w-full text-left p-3 rounded bg-slate-900/50 border border-white/10"
              :class="{
                [skillClass(skill)]: true,
                'opacity-100 translate-y-0': isMounted,
                'opacity-0 translate-y-16': !isMounted,
              }"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <p class="text-slate-200 font-semibold text-sm sm:text-base">
                {{ skill.name }}
              </p>
              <p class="text-[0.7rem] sm:text-xs text-slate-500">
                {{ skill.type }}
              </p>
            </button>
          </TransitionGroup>
        </div>

        <!-- Column 3: Activation History (Projects) -->
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-slate-400 text-sm border-b border-white/10 pb-2">
            Activation History
          </h2>
          <TransitionGroup tag="div" name="list" class="relative space-y-3">
            <button
              v-for="(project, index) in displayedProjects"
              :key="project.id"
              data-sound
              @click="openProjectModal(project)"
              class="transition-all duration-500 ease-out block w-full text-left p-3 rounded bg-slate-900/50 border border-white/10"
              :class="{
                [projectClass(project)]: true,
                'opacity-100 translate-y-0': isMounted,
                'opacity-0 translate-y-16': !isMounted,
              }"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <p class="text-emerald-300 text-sm sm:text-base">
                {{ project.name }}
              </p>
              <p class="text-[0.7rem] sm:text-xs text-slate-400">
                {{ project.period }}
              </p>
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
import { ref, computed, onMounted } from "vue";
import {
  skills as skillsData,
  projects as projectsData,
  type Skill,
  type Project,
} from "../data/profile";

useHead({
  title: "Skills | Hin Jian Heng",
});

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
      " opacity-90 scale-105 text-emerald-300 border border-emerald-300/30 shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    );
  } else if (activeCore.value) {
    //not current core
    classes.push(" opacity-40 scale-95 text-slate-400 blur-sm");
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
    : " opacity-40 scale-95 text-slate-400 blur-sm";
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

const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});
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
