<template>
  <Transition name="modal-fade">
    <div
      v-if="project"
      @click.self="$emit('close')"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/90 border border-white/10 rounded-lg p-8 transform-gpu"
      >
        <header class="flex items-start justify-between mb-6">
          <div>
            <h2 class="text-2xl text-emerald-300">{{ project.name }}</h2>
            <p class="text-sm text-slate-400">{{ project.brief }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div class="mb-4">
              <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Objective
              </h3>
              <p class="text-slate-300">{{ project.objective }}</p>
            </div>

            <div class="mb-4">
              <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Tech Stack Used
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in project.tech"
                  :key="t"
                  class="text-xs px-2 py-1 rounded border border-emerald-400/30 text-emerald-300 bg-emerald-400/10"
                  >{{ t }}</span
                >
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Performance Metrics
              </h3>
              <div class="flex gap-3">
                <div
                  v-for="h in project.highlights"
                  :key="h.label"
                  class="px-3 py-2 rounded bg-slate-800/60 border border-white/10 text-xs flex-1"
                >
                  <div class="text-slate-400">{{ h.label }}</div>
                  <div class="text-emerald-300 text-lg">{{ h.value }}</div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Cognitive Gain
              </h3>
              <p class="text-slate-300 italic">"{{ project.cognitiveGain }}"</p>
            </div>
            <a
              :href="project.githubUrl"
              target="_blank"
              class="inline-block mt-4 px-4 py-2 rounded border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-900 font-bold transition-colors"
              >View GitHub</a
            >
          </div>
          <div>
            <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
              Visualization
            </h3>
            <img
              :src="project.imageUrl"
              alt="Project visualization"
              class="rounded-lg border border-white/10 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Project } from "../data/profile";
defineProps<{
  project: Project | null;
}>();
defineEmits(["close"]);
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease-out;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
