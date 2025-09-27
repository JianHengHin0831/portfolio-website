<template>
  <div class="relative min-h-screen overflow-hidden bg-[#05070c] text-white">
    <!-- Background Layer -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <!-- Animated grid lines -->
      <div
        class="absolute inset-0 opacity-30"
        :style="{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          animation: 'moveGrid 30s linear infinite',
        }"
      ></div>

      <!-- Neon radial gradients -->
      <div
        class="absolute inset-0 animate-pulse opacity-25"
        :style="{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #0ea5e9 0%, transparent 40%), radial-gradient(circle at 80% 70%, #10b981 0%, transparent 35%)',
        }"
      ></div>

      <!-- Twinkling particles -->
      <div class="absolute inset-0">
        <div
          v-if="style1"
          :style="{
            top: style1.top,
            left: style1.left,
            'animation-delay': style1.delay,
            position: 'absolute',
          }"
        />
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 pr-16">
      <TheNavbar :showMode="showMode" />
      <slot />
      <JianDock />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const showMode = ref("terminal");

const style1 = ref<{ top: string; left: string; delay: string } | null>(null);

onMounted(() => {
  style1.value = {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
  };
});
</script>
<style scoped>
@keyframes moveGrid {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 40px;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.animate-twinkle {
  animation: twinkle 3s infinite ease-in-out;
}
</style>
