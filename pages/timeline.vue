<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-mono">
    <div class="max-w-4xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl text-emerald-300">
          Development Timeline // Experience & Education
        </h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>

      <div class="relative">
        <div
          class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-emerald-500/30"
        ></div>
        <div
          v-for="(e, i) in experiences"
          :key="i"
          ref="nodes"
          class="relative mb-10 transition-all duration-700"
          :class="
            revealed[i]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          "
        >
          <div
            class="w-3 h-3 rounded-full bg-emerald-400 absolute left-[calc(1rem-6px)] md:left-[calc(50%-6px)] top-1.5 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
          ></div>
          <div class="ml-8 md:ml-0 md:pl-10 md:w-1/2 md:float-right">
            <div class="bg-white/5 border border-white/10 rounded-lg p-4">
              <div class="text-xs text-slate-400 mb-1">
                [Event:
                {{
                  e.type === "education"
                    ? "Core Training Initialized"
                    : "Deployment Cycle"
                }}]
              </div>
              <div class="text-emerald-300">[Institution/Org: {{ e.org }}]</div>
              <div class="text-slate-300">[Role: {{ e.role }}]</div>
              <div class="text-slate-400 text-xs mb-2">
                [Period: {{ e.period }}]
              </div>
              <ul class="list-disc list-inside text-sm">
                <li v-for="(d, j) in e.details" :key="j">{{ d }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { experiences } from "../data/profile";

const nodes = ref<HTMLDivElement[] | null>(null);
const revealed = ref<boolean[]>(experiences.map(() => false));

onMounted(() => {
  const els = (nodes.value as unknown as HTMLElement[]) || [];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = els.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0) revealed.value[idx] = true;
        }
      });
    },
    { threshold: 0.2 }
  );
  els.forEach((el) => observer.observe(el));
});
</script>
