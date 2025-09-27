<template>
  <div class="min-h-screen bg-transparent text-slate-100 font-mono">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-12 space-y-3 sm:space-y-0"
      >
        <h1 class="text-base sm:text-xl text-emerald-300">
          Development Timeline // Experience & Education
        </h1>
      </div>

      <div class="relative">
        <div
          class="absolute left-4 -ml-px w-0.5 h-full bg-emerald-500/20"
        ></div>

        <div
          ref="activeLine"
          class="absolute left-4 -ml-px w-0.5 bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)] transition-all duration-500 ease-out"
          :style="{ height: activeLineHeight + 'px' }"
        ></div>

        <div
          v-for="(e, i) in experiences"
          :key="i"
          data-sound
          ref="timelineNodes"
          class="relative group"
        >
          <div
            class="w-3 h-3 rounded-full bg-emerald-400 absolute left-[calc(1rem-6px)] top-1.5 transition-transform duration-300"
            :class="revealed[i] ? 'scale-100 animate-pulse-glow' : 'scale-0'"
          ></div>

          <div
            class="pl-10 pb-8 sm:pb-12 transition-all duration-700 ease-out"
            :class="
              revealed[i]
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            "
          >
            <div
              class="absolute left-7 top-[1.1rem] w-3 h-px bg-emerald-500/30"
            ></div>

            <div
              class="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 group-hover:border-emerald-400/40 transition-colors duration-300"
            >
              <div class="text-[0.7rem] sm:text-xs text-slate-400 mb-1">
                [Event:
                {{
                  e.type === "education"
                    ? "Core Training Initialized"
                    : "Deployment Cycle"
                }}]
              </div>
              <div class="text-emerald-300 text-sm sm:text-base">
                [Institution/Org: {{ e.org }}]
              </div>
              <div class="text-slate-300 text-sm sm:text-base">
                [Role: {{ e.role }}]
              </div>
              <div class="text-slate-400 text-[0.7rem] sm:text-xs mb-2">
                [Period: {{ e.period }}]
              </div>
              <ul
                class="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1"
              >
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
import { onMounted, onBeforeUnmount, ref } from "vue";
import { experiences } from "../data/profile";

const timelineNodes = ref<HTMLElement[] | null>(null);
const activeLine = ref<HTMLElement | null>(null);
const activeLineHeight = ref(0);
const revealed = ref<boolean[]>(experiences.map(() => false));

useHead({
  title: "Timeline | Hin Jian Heng",
});

let observer: IntersectionObserver;

onMounted(() => {
  const nodes = (timelineNodes.value as HTMLElement[]) || [];
  if (nodes.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const idx = nodes.indexOf(target);
          if (idx !== -1) {
            revealed.value[idx] = true;

            const newHeight =
              target.offsetTop +
              target.querySelector(".bg-white\\/5")!.clientHeight / 2;
            if (newHeight > activeLineHeight.value) {
              activeLineHeight.value = newHeight;
            }
          }
        }
      });
    },
    { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
  );

  nodes.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style>
@keyframes pulse-glow {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 10px 8px rgba(16, 185, 129, 0.3);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite ease-in-out;
}
</style>
