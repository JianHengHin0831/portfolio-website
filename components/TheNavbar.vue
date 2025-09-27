<template>
  <nav class="fixed top-6 right-6 z-50">
    <Transition name="unfold">
      <ul class="flex flex-col space-y-2" v-show="showMode == 'GUI'">
        <li
          v-for="(item, index) in navItems"
          :key="item.name"
          class="unfold-item"
          :style="{ '--delay': `${index * 100}ms` }"
        >
          <NuxtLink
            :to="item.path"
            class="group relative flex items-center justify-center w-16 h-[68px]"
            active-class="is-active"
            @mouseenter="playHoverSound"
            @click="playClickSound"
          >
            <svg
              class="absolute inset-0 w-full h-full fill-gray-800/50 stroke-cyan-400/50 stroke-2 transition-all duration-300 group-hover:fill-cyan-400/20 group-hover:stroke-cyan-400 group-[.is-active]:fill-cyan-400/30 group-[.is-active]:stroke-cyan-400"
              viewBox="0 0 100 115.47"
            >
              <polygon
                points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87 50,0"
              />
            </svg>

            <div
              class="absolute inset-0 bg-cyan-400 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-40 group-[.is-active]:opacity-50"
            ></div>

            <Icon
              :name="item.icon"
              class="relative z-10 text-cyan-400/70 w-7 h-7 transition-all duration-300 group-hover:text-white group-hover:scale-150 group-hover:rotate-45 group-[.is-active]:text-white group-[.is-active]:scale-110"
            />

            <span
              class="absolute right-full mr-4 z-10 px-3 py-1 bg-gray-900/80 border border-cyan-400/50 rounded text-cyan-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
        </li>
      </ul></Transition
    >
  </nav>
</template>

<script setup>
//nav
const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "heroicons:home-solid" },
  { name: "Projects", path: "/projects", icon: "heroicons:folder-solid" },
  { name: "Skills", path: "/skills", icon: "heroicons:cpu-chip-solid" },
  { name: "Timeline", path: "/timeline", icon: "heroicons:clock" },
  { name: "Contact", path: "/contact", icon: "heroicons:envelope-solid" },
  { name: "Terminal", path: "/", icon: "heroicons:command-line" },
];

//sound
import { ref, onMounted } from "vue";
const route = useRoute();
let clickSound = null;
let hoverSound = null;
const showMode = ref("terminal");

const lastPlay = {
  click: 0,
  hover: 0,
};

const COOLDOWN = 200;

onMounted(() => {
  clickSound = new Audio("/clickSound.wav");
  hoverSound = new Audio("/hoverSound.wav");

  let prevValue = null;
  setInterval(() => {
    const current = sessionStorage.getItem("visited_home");
    if (current !== prevValue) {
      prevValue = current;
      showMode.value = current;
    }
  }, 300);
});

function playSound(audio, type) {
  if (!audio) return;

  const now = Date.now();
  if (now - lastPlay[type] < COOLDOWN) return;

  lastPlay[type] = now;
  audio.currentTime = 0;
  audio.play();
}

function playClickSound() {
  playSound(clickSound, "click");
}

function playHoverSound() {
  playSound(hoverSound, "hover");
}
</script>

<style>
.unfold-enter-active,
.unfold-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.unfold-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.unfold-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.unfold-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.unfold-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.unfold-item {
  transform: translateX(20px) scale(0.95);
  transition: opacity 0.4s, transform 0.4s;
  transition-delay: var(--delay, 0ms);
}

.unfold-enter-from .unfold-item,
.unfold-leave-to .unfold-item {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.unfold-enter-to .unfold-item,
.unfold-leave-from .unfold-item {
  opacity: 1;
  transform: translateX(0) scale(1);
}
</style>
