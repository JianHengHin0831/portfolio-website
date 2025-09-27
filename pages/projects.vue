<template>
  <div class="min-h-screen bg-transparent text-slate-100 font-mono">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl text-emerald-300">
          Simulation Archives // Projects
        </h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <article
          v-for="(p, index) in projects"
          :style="{ transitionDelay: `${index * 100}ms` }"
          :class="
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          "
          :key="p.id"
          data-sound
          @click="openModal(p)"
          class="transition-all duration-500 ease-out group bg-white/5 cursor-pointer border border-white/10 rounded-lg p-5 hover:border-emerald-400/40 transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(3deg)_rotateY(-4deg)_translateZ(6px)]"
        >
          <header class="flex items-center justify-between mb-2">
            <h2 class="text-emerald-300">{{ p.name }}</h2>
            <span class="text-xs text-slate-400">{{ p.period }}</span>
          </header>
          <div class="text-sm text-slate-300 mb-3">{{ p.brief }}</div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="t in p.tech"
              :key="t"
              class="text-xs px-2 py-1 rounded border border-emerald-400/30 text-emerald-300 bg-emerald-400/10"
              >{{ t }}</span
            >
          </div>
          <div class="flex gap-3 mb-3">
            <div
              v-for="h in p.highlights"
              :key="h.label"
              class="px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-xs"
            >
              <div class="text-slate-400">{{ h.label }}</div>
              <div class="text-emerald-300 text-base">{{ h.value }}</div>
            </div>
          </div>

          <button
            @click="openModal(p)"
            class="mt-2 text-slate-300 hover:text-emerald-300 transition-colors w-full text-left"
          >
            <span class="inline-block mr-1">▸</span>
            Post-Mortem Analysis
          </button>
        </article>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { projects as projectsData, type Project } from "../data/profile";

const projects = projectsData;
const selectedProject = ref<Project | null>(null);

function openModal(project: Project) {
  selectedProject.value = project;
}

function closeModal() {
  selectedProject.value = null;
}

const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});
</script>
