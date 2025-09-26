<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-mono">
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
          v-for="p in projects"
          :key="p.id"
          class="group bg-white/5 border border-white/10 rounded-lg p-5 hover:border-emerald-400/40 transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(3deg)_rotateY(-4deg)_translateZ(6px)]"
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

          <details class="mt-2 overflow-hidden rounded group">
            <summary
              class="cursor-pointer text-slate-300 hover:text-emerald-300 transition-colors"
            >
              <span
                class="inline-block transition-transform group-open:rotate-90 mr-1"
                >▸</span
              >
              Post-Mortem Analysis
            </summary>
            <div
              class="mt-3 space-y-3 will-change-transform transition-all duration-500 ease-out group-open:[transform:translateZ(12px)] group-open:[filter:drop-shadow(0_10px_30px_rgba(16,185,129,0.18))]"
            >
              <div class="flex gap-2 text-xs">
                <button
                  @click="setTab(p.id, 'brief')"
                  :class="tabClass(p.id, 'brief')"
                >
                  Technical Brief
                </button>
                <button
                  @click="setTab(p.id, 'impact')"
                  :class="tabClass(p.id, 'impact')"
                >
                  Business Impact
                </button>
                <button
                  @click="setTab(p.id, 'simple')"
                  :class="tabClass(p.id, 'simple')"
                >
                  Simple Explanation
                </button>
              </div>
              <div class="text-sm whitespace-pre-wrap">
                {{ activeText(p) }}
              </div>
            </div>
          </details>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { projects as projectsData } from "../data/profile";

const projects = projectsData;
const tabs = ref<Record<string, "brief" | "impact" | "simple">>({});

function setTab(id: string, t: "brief" | "impact" | "simple") {
  tabs.value[id] = t;
}

function tabClass(id: string, t: "brief" | "impact" | "simple") {
  const active = (tabs.value[id] || "brief") === t;
  return active
    ? "px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
    : "px-2 py-1 rounded bg-slate-900/60 text-slate-300 border border-white/10 hover:text-emerald-300";
}

function activeText(p: (typeof projects)[0]) {
  const t = tabs.value[p.id] || "brief";
  if (t === "impact") return p.businessImpact;
  if (t === "simple") return p.simple;
  return p.brief;
}
</script>
