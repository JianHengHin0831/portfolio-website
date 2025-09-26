<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-mono">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl text-emerald-300">
          Core Modules & Libraries // Skills
        </h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section
          class="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-5"
        >
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              v-for="s in skills"
              :key="s.id"
              @click="openSkill(s.id)"
              class="group h-24 rounded border border-white/10 bg-slate-900/60 hover:border-emerald-400/40 transition-colors flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-emerald-300">{{ s.label }}</div>
                <div class="text-xs text-slate-400">{{ s.category }}</div>
              </div>
            </button>
          </div>
        </section>

        <section class="bg-white/5 border border-white/10 rounded-lg p-5">
          <h2 class="text-emerald-300 mb-2">Info</h2>
          <div v-if="current">
            <div class="text-slate-200 mb-1">{{ current.label }}</div>
            <div class="text-xs text-slate-400 mb-2">
              Proficiency: {{ current.proficiency }} / 100
            </div>
            <div class="text-xs text-slate-400 mb-2">Activations:</div>
            <ul class="list-disc list-inside text-sm">
              <li v-for="a in current.activations" :key="a">{{ a }}</li>
            </ul>
            <div class="mt-3">
              <button
                class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded"
                @click="askContext"
                :disabled="loading"
              >
                Ask JIAN for context
              </button>
            </div>
            <div
              v-if="answer"
              class="mt-3 text-sm text-emerald-200 whitespace-pre-wrap"
            >
              {{ answer }}
            </div>
          </div>
          <div v-else class="text-slate-400 text-sm">
            Select a skill to view details.
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { skills as skillsData } from "../data/profile";

const skills = skillsData;
const selected = ref<string | null>(null);
const answer = ref("");
const loading = ref(false);

const current = computed(() => skills.find((s) => s.id === selected.value));

function openSkill(id: string) {
  selected.value = id;
  answer.value = "";
}

async function askContext() {
  if (!current.value) return;
  loading.value = true;
  try {
    const prompt = `Explain how the skill ${current.value.label} was applied in Hin Jian Heng's projects.`;
    const res = await fetch("/api/jian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
    const data = await res.json();
    answer.value = data?.reply || data?.error || "No response";
  } finally {
    loading.value = false;
  }
}
</script>
