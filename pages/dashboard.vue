<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-mono">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl text-emerald-300">JIAN // Main Dashboard</h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section
          class="col-span-1 bg-white/5 border border-white/10 rounded-lg p-5"
        >
          <h2 class="text-emerald-300 mb-4">Identity Profile</h2>
          <ul class="space-y-2">
            <li><span class="text-slate-400">Unit:</span> Hin Jian Heng</li>
            <li><span class="text-slate-400">Class:</span> AI Engineer</li>
            <li>
              <span class="text-slate-400">Status:</span> Active | Pursuing
              Master's in AI
            </li>
            <li>
              <span class="text-slate-400">Primary Directive:</span> To develop
              and deploy efficient, real-time AI systems.
            </li>
          </ul>
        </section>

        <section
          class="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-5"
        >
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-emerald-300">Core Competency Radar</h2>
            <button
              class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded"
              @click="shuffleData"
            >
              randomize
            </button>
          </div>
          <div class="relative perspective-[1200px]">
            <canvas
              ref="radarRef"
              width="640"
              height="420"
              class="w-full max-w-full will-change-transform transition-transform duration-500 ease-out hover:rotate-x-3 hover:rotate-y-[-2deg]"
            ></canvas>
            <div class="absolute top-2 right-2 text-xs text-slate-400">
              hover points for details
            </div>
          </div>
        </section>
      </div>

      <section class="mt-6 bg-white/5 border border-white/10 rounded-lg p-5">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-emerald-300">Activity Log</h2>
          <button
            class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded"
            @click="fetchGithub"
          >
            sync github
          </button>
        </div>
        <div ref="logWrap" class="max-h-64 overflow-auto space-y-1 pr-2">
          <div
            v-for="(line, i) in logs"
            :key="i"
            class="whitespace-pre-wrap text-sm text-slate-200"
          >
            {{ line }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

type RadarDatum = { label: string; value: number };

const radarRef = ref<HTMLCanvasElement | null>(null);
const tooltip = ref<{ x: number; y: number; text: string } | null>(null);

let radarData: RadarDatum[] = [
  { label: "Machine Learning", value: 85 },
  { label: "Cloud & DevOps", value: 75 },
  { label: "System Architecture", value: 80 },
  { label: "Frontend Dev", value: 70 },
  { label: "LLM Ops", value: 78 },
];

let animFrom: number[] | null = null;
let animTo: number[] | null = null;
let animStart = 0;
const animDuration = 650;

function shuffleData() {
  const next = radarData.map((d) => ({
    ...d,
    value: 60 + Math.round(Math.random() * 40),
  }));
  startInterp(next);
}

function drawRadar() {
  const canvas = radarRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2 + 10;
  const radius = Math.min(w, h) * 0.36;
  const spokes = radarData.length;

  // grid rings
  for (let r = 0; r <= 5; r++) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(94, 234, 212, 0.15)";
    ctx.lineWidth = 1;
    const rr = (radius / 5) * r;
    ctx.arc(cx, cy, rr, 0, Math.PI * 2);
    ctx.stroke();
  }

  // spokes + labels
  ctx.font =
    "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";
  radarData.forEach((d, i) => {
    const a = (Math.PI * 2 * i) / spokes - Math.PI / 2;
    const x = cx + radius * Math.cos(a);
    const y = cy + radius * Math.sin(a);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(94, 234, 212, 0.25)";
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    const lx = cx + (radius + 18) * Math.cos(a);
    const ly = cy + (radius + 18) * Math.sin(a);
    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.textAlign =
      Math.cos(a) > 0.2 ? "left" : Math.cos(a) < -0.2 ? "right" : "center";
    ctx.fillText(d.label, lx, ly);
  });

  // polygon fill
  ctx.beginPath();
  radarData.forEach((d, i) => {
    const a = (Math.PI * 2 * i) / spokes - Math.PI / 2;
    const rr = (d.value / 100) * radius;
    const x = cx + rr * Math.cos(a);
    const y = cy + rr * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(16, 185, 129, 0.18)";
  ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  // points
  radarData.forEach((d, i) => {
    const a = (Math.PI * 2 * i) / spokes - Math.PI / 2;
    const rr = (d.value / 100) * radius;
    const x = cx + rr * Math.cos(a);
    const y = cy + rr * Math.sin(a);
    ctx.beginPath();
    ctx.fillStyle = "#34d399";
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function startInterp(next: RadarDatum[]) {
  animFrom = radarData.map((d) => d.value);
  animTo = next.map((d) => d.value);
  animStart = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - animStart) / animDuration);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
    const from =
      animFrom && animFrom.length === radarData.length
        ? animFrom
        : radarData.map((d) => d.value);
    const to =
      animTo && animTo.length === radarData.length
        ? animTo
        : next.map((d) => d.value);
    radarData = radarData.map((d, i) => {
      const fi = from[i] ?? d.value;
      const ti = to[i] ?? d.value;
      return { ...d, value: Math.round(fi + (ti - fi) * ease) };
    });
    drawRadar();
    if (t < 1) requestAnimationFrame(step);
    else {
      radarData = next;
      drawRadar();
    }
  };
  requestAnimationFrame(step);
}

// simple hover tooltip (canvas mousemove)
function setupHover() {
  const canvas = radarRef.value;
  if (!canvas) return;
  const rect = () => canvas.getBoundingClientRect();
  const handler = (e: MouseEvent) => {
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 + 10;
    const radius = Math.min(w, h) * 0.36;
    const spokes = radarData.length;
    const mx = e.clientX - rect().left;
    const my = e.clientY - rect().top;

    let hit = null as null | string;
    radarData.forEach((d, i) => {
      const a = (Math.PI * 2 * i) / spokes - Math.PI / 2;
      const rr = (d.value / 100) * radius;
      const x = cx + rr * Math.cos(a);
      const y = cy + rr * Math.sin(a);
      const dx = mx - x;
      const dy = my - y;
      if (dx * dx + dy * dy < 9 * 9) hit = `${d.label}: ${d.value}`;
    });
    tooltip.value = hit ? { x: mx + 12, y: my + 12, text: hit } : null;

    // redraw to show tooltip
    drawRadar();
    if (tooltip.value) {
      const t = tooltip.value;
      const ctx2 = ctx;
      ctx2.fillStyle = "rgba(2,6,23,0.9)";
      ctx2.strokeStyle = "rgba(94,234,212,0.4)";
      ctx2.lineWidth = 1;
      const padding = 6;
      ctx2.font =
        "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";
      const textW = ctx2.measureText(t.text).width;
      const boxW = textW + padding * 2;
      const boxH = 22;
      ctx2.beginPath();
      ctx2.rect(t.x, t.y, boxW, boxH);
      ctx2.fill();
      ctx2.stroke();
      ctx2.fillStyle = "#e2e8f0";
      ctx2.fillText(t.text, t.x + padding, t.y + 15);
    }
  };
  canvas.addEventListener("mousemove", handler);
}

// activity log
const logs = ref<string[]>([]);
const logWrap = ref<HTMLDivElement | null>(null);

function pushLog(line: string) {
  logs.value.push(`${new Date().toISOString()}  ${line}`);
  requestAnimationFrame(() => {
    const el = logWrap.value;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });
}

async function fetchGithub() {
  try {
    pushLog("GitHub sync: fetching latest public events...");
    const res = await fetch(
      "https://api.github.com/users/JianHengHin0831/events/public"
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const events = await res.json();
    const take = (events as any[]).slice(0, 5);
    take.forEach((ev: any) => {
      const type = ev.type;
      const repo = ev.repo?.name;
      pushLog(`GitHub ${type} on ${repo}`);
    });
  } catch (e: any) {
    pushLog(`GitHub sync failed: ${e?.message || e}`);
  }
}

onMounted(() => {
  // initial logs
  pushLog("Cognitive core heartbeat nominal.");
  pushLog("Telemetry uplink established.");
  pushLog("Subsystems: ML/LLM/Serving active.");
  drawRadar();
  setupHover();
  // lazy fetch github
  setTimeout(fetchGithub, 800);
});
</script>
