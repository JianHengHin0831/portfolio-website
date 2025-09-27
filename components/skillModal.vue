<template>
  <Transition name="modal-fade">
    <div
      v-if="skill"
      @click.self="handleClose"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-lg p-8"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-2xl text-emerald-300">{{ skill.name }}</h2>
            <p class="text-sm text-slate-400">{{ skill.type }}</p>
          </div>
          <button
            @click="handleClose"
            class="p-2 -mt-2 -mr-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
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
        </div>

        <div class="mb-4">
          <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
            Proficiency
          </h3>
          <div class="h-2 bg-slate-700/50 rounded-full w-full overflow-hidden">
            <div
              class="h-2 bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${skill.proficiency}%` }"
            ></div>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
            Self-Assessment Note
          </h3>
          <p class="text-slate-300 italic">"{{ skill.note }}"</p>
        </div>

        <div class="mb-4">
          <h3 class="text-xs text-slate-400 uppercase tracking-wider mb-2">
            Activation History (Projects)
          </h3>
          <ul class="space-y-1">
            <li v-for="project in skill.projects" :key="project.id">
              <button
                @click="$emit('view-project', project.id)"
                class="text-sm text-slate-300 hover:text-emerald-300 hover:underline"
              >
                > {{ project.name }}
              </button>
            </li>
          </ul>
        </div>
        <div
          class="mt-6 text-sm text-emerald-200 whitespace-pre-wrap border-l-2 border-emerald-400/50 pl-4"
        >
          <span class="font-bold text-emerald-300">[JIAN Context]: </span>
          {{ visibleLines[0] }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { delay, typeLine } from "../uitls/helper";
import { skills, type Skill } from "../data/profile";
import { ref, watch } from "vue";
const props = defineProps<{
  skill: Skill | null;
}>();
const emit = defineEmits(["close", "view-project"]);
const visibleLines = ref<string[]>([]);
const isOpening = ref(true);

watch(
  () => props.skill?.id,
  () => {
    if (props.skill?.id) {
      isOpening.value = true;
      showAssessment();
    }
  }
);
function handleClose() {
  isOpening.value = false;
  emit("close");
}

async function showAssessment() {
  if (isOpening.value) {
    visibleLines.value = ["Thinking...."];
    await delay(1000);
    visibleLines.value = [];
    visibleLines.value = await typeLine(
      props.skill?.jianContext || "",
      visibleLines.value,
      isOpening
    );
  } else {
    visibleLines.value = [];
  }
}
</script>
