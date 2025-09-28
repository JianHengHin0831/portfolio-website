<template>
  <div class="min-h-screen bg-transparent text-slate-100 font-mono">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
      >
        <h1 class="text-lg sm:text-xl text-emerald-300">
          JIAN // Main Dashboard
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section
          class="col-span-1 bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5"
        >
          <h2 class="text-emerald-300 mb-4 text-base sm:text-lg">
            Identity Profile
          </h2>
          <ul
            class="space-y-2 text-sm font-mono tracking-wide border-l border-slate-700 sm:pl-4"
          >
            <li v-for="(item, index) in profileInfo" :key="index">
              <span class="text-slate-400">{{ item.label }}:</span>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </section>

        <section
          class="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5"
        >
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0"
          >
            <div>
              <h2 class="text-emerald-300 text-base sm:text-lg">
                Core Competency Radar
              </h2>
              <div class="hidden md:visible text-xs text-slate-400">
                hover points for details
              </div>
              <div class="md:hidden text-xs text-slate-400">
                click points for details
              </div>
            </div>
            <button
              data-sound
              class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded z-20"
              @click="summarySkill"
            >
              Summary
            </button>
          </div>
          <div class="relative perspective-[1200px]">
            <SkillRadar v-show="!showSummary" />
            <pre
              v-show="showSummary"
              class="m-0 mb-2 whitespace-pre-wrap leading-relaxed text-emerald-100 drop-shadow-[0_0_6px_rgba(80,220,120,0.35)]"
              v-for="(line, idx) in visibleLines"
              :key="idx"
              >{{ line }}</pre
            >
          </div>
        </section>
      </div>

      <section
        class="mt-6 bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0"
        >
          <h2 class="text-emerald-300 text-base sm:text-lg">Activity Log</h2>
          <button
            data-sound
            class="z-[20] text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded"
            @click="fetchGithub"
          >
            sync github
          </button>
        </div>
        <div
          ref="logWrap"
          class="max-h-64 overflow-auto space-y-1 pr-2 text-sm"
        >
          <div
            v-for="(line, i) in logs"
            :key="i"
            class="whitespace-pre-wrap text-slate-200"
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
import { delay, typeLine } from "../uitls/helper";

type RadarDatum = { label: string; value: number; tools?: string[] };
const showSummary = ref(false);

let radarData: RadarDatum[] = [
  {
    label: "Machine Learning",
    value: 90,
    tools: ["PyTorch", "TensorFlow", "scikit-learn", "TabNet"],
  },
  {
    label: "Cloud & DevOps",
    value: 80,
    tools: ["GCP", "Docker", "CI/CD", "Supabase", "Vercel"],
  },
  {
    label: "System Architecture",
    value: 75,
    tools: ["Microservices", "REST API", "Authentication", "Caching"],
  },
  {
    label: "Frontend Dev",
    value: 70,
    tools: ["Nuxt.js", "Tailwind CSS", "TypeScript", "LangChain.js"],
  },
  {
    label: "Computer Vision",
    value: 65,
    tools: ["OpenCV", "CNN", "Diffusion Models", "DCGAN"],
  },
  {
    label: "NLP",
    value: 75,
    tools: ["Transformers", "Hugging Face", "RAG", "Vector Embeddings"],
  },
];

const radarRef = ref<HTMLCanvasElement | null>(null);
const tooltip = ref<{
  x: number;
  y: number;
  text: string;
  detail?: string;
} | null>(null);

const profileInfo = [
  { label: "Unit", value: "Hin Jian Heng" },
  { label: "Class", value: "Master's in Artificial Intelligence (UM)" },
  { label: "Status", value: "Active" },
  {
    label: "Primary Directive",
    value: "To develop and deploy efficient, real-time AI systems.",
  },
  {
    label: "Specialization",
    value: "Interpretable ML, RAG, Real-time AI Deployment",
  },
  {
    label: "Education",
    value: "BSc Computer Science (First Class, Southampton)",
  },
  { label: "Certifications", value: "IBM AI Engineering (2025)" },
  { label: "Languages", value: "English, Chinese" },
  { label: "Location", value: "Malaysia (GMT+8)" },
  { label: "Years Active", value: "4" },
  {
    label: "Core Skills",
    value: "PyTorch, TensorFlow, Transformers, GCP, Nuxt.js, MLOps, Docker",
  },
];

let animFrom: number[] | null = null;
let animTo: number[] | null = null;
let animStart = 0;
const animDuration = 650;
const visibleLines = ref<string[]>([]);

useHead({
  title: "Home | Hin Jian Heng",
});

const summaryLines: string[] = [
  "Strong in Machine Learning, Cloud, System Design, Frontend, NLP, and Computer Vision.",
  "Can build and run AI systems that work fast and explain results clearly.",
  "Uses tools like PyTorch, TensorFlow, Transformers, GCP, Nuxt.js, MLOps, and Docker.",
  "Always learning and improving, integrating skills with real projects.",
];

async function summarySkill() {
  showSummary.value = !showSummary.value;
  if (showSummary.value) {
    visibleLines.value = ["Thinking...."];
    await delay(1000);
    visibleLines.value = [];
    for (const line of summaryLines) {
      visibleLines.value = await typeLine(
        line,
        visibleLines.value,
        showSummary
      );
    }
    await delay(500);
  } else {
    visibleLines.value = [];
  }
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

  if (tooltip.value) {
    const t = tooltip.value;
    const ctx2 = ctx;
    const padding = 6;
    ctx2.font =
      "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";

    const mainTextW = ctx2.measureText(t.text).width;
    const detailTextW = t.detail ? ctx2.measureText(t.detail).width : 0;
    const textW = Math.max(mainTextW, detailTextW);
    const boxW = textW + padding * 2;
    const boxH = t.detail ? 40 : 22;

    ctx2.fillStyle = "rgba(2,6,23,0.9)";
    ctx2.strokeStyle = "rgba(94,234,212,0.4)";
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.rect(t.x, t.y, boxW, boxH);
    ctx2.fill();
    ctx2.stroke();

    ctx2.fillStyle = "#e2e8f0";
    ctx2.fillText(t.text, t.x + padding, t.y + 15);

    if (t.detail) {
      ctx2.fillStyle = "rgba(94,234,212,0.9)";
      ctx2.fillText(t.detail, t.x + padding, t.y + 30);
    }
  }
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

function setupHover() {
  const canvas = radarRef.value;
  if (!canvas) return;
  const rect = () => canvas.getBoundingClientRect();

  const getHitSkill = (mx: number, my: number): RadarDatum | null => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 + 10;
    const radius = Math.min(w, h) * 0.36;
    const spokes = radarData.length;

    let hitSkill: RadarDatum | null = null;
    radarData.forEach((d, i) => {
      const a = (Math.PI * 2 * i) / spokes - Math.PI / 2;
      const rr = (d.value / 100) * radius;
      const x = cx + rr * Math.cos(a);
      const y = cy + rr * Math.sin(a);
      const dx = mx - x;
      const dy = my - y;
      if (dx * dx + dy * dy < 9 * 9) hitSkill = d;
    });
    return hitSkill;
  };

  canvas.addEventListener("mousemove", (e) => {
    const mx = e.clientX - rect().left;
    const my = e.clientY - rect().top;
    const skill = getHitSkill(mx, my);
    if (skill) {
      tooltip.value = {
        x: mx + 12,
        y: my + 12,
        text: `${skill.label}: ${skill.value}`,
      };
    } else {
      tooltip.value = null;
    }
    drawRadar();
  });

  canvas.addEventListener("mousedown", (e) => {
    const mx = e.clientX - rect().left;
    const my = e.clientY - rect().top;
    const skill = getHitSkill(mx, my);
    if (skill) {
      tooltip.value = {
        x: mx + 12,
        y: my + 12,
        text: skill.label,
        detail: skill.tools?.join(", "),
      };
      drawRadar();
    }
  });

  canvas.addEventListener("mouseup", () => {
    tooltip.value = null;
    drawRadar();
  });
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
