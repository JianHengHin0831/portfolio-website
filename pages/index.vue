<template>
  <div
    class="min-h-screen flex items-center justify-center bg-transparent text-fuchsia-300 font-mono relative p-6"
  >
    <div
      class="w-full max-w-[960px] min-h-[260px] bg-black/70 border border-emerald-300/20 shadow-[inset_0_0_0_1px_rgba(80,220,120,0.08),0_12px_40px_rgba(0,0,0,0.45)] p-6 rounded-lg relative overflow-hidden"
      aria-live="polite"
      aria-label="Boot sequence output"
      v-show="!showWelcome"
    >
      <div
        class="absolute inset-0 pointer-events-none opacity-20 text-emerald-200"
        aria-hidden="true"
      >
        <pre class="m-0 whitespace-pre">
   _  _  _   _   _   _   _   _   _
 _/ \/ \/ \_/ \_/ \_/ \_/ \_/ \_/ \_
\_  Neural Mesh Topology — v1.0 — JIAN  _/
  \_/\_/\_/\_/\_/\_/\_/\_/\_/\_/\_/
        .--.            .--.            .--.
       ( OO )==========( OO )==========( OO )
        '--'            '--'            '--'
        /\\              /\\              /\\
       /  \\            /  \\            /  \\
      '----'          '----'          '----'
        </pre>
      </div>
      <pre
        class="m-0 mb-2 whitespace-pre-wrap leading-relaxed text-emerald-100 drop-shadow-[0_0_6px_rgba(80,220,120,0.35)]"
        v-for="(line, idx) in visibleLines"
        :key="idx"
        >{{ line }}</pre
      >
    </div>

    <!-- GUI button -->
    <button
      @click="toggleMode"
      @mouseenter="playHoverSound"
      class="absolute top-4 right-4 z-50 flex items-center px-4 py-2 border-2 border-cyan-400 text-cyan-400 rounded-lg text-sm uppercase font-semibold tracking-wider transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:shadow-[0_0_15px_theme(colors.cyan.400)]"
    >
      <Icon name="mdi:grid-large" class="w-5 h-5 mr-2 text-white" />
      <span>Visual Mode</span>
    </button>

    <!-- Terminal Container -->
    <div
      v-show="showWelcome"
      class="w-full max-w-[960px] h-[560px] bg-black/70 border border-emerald-300/20 shadow-[inset_0_0_0_1px_rgba(80,220,120,0.08),0_12px_40px_rgba(0,0,0,0.45)] p-6 rounded-lg relative flex flex-col"
      aria-live="polite"
    >
      <!-- Scrollable history area -->
      <div
        class="flex-1 overflow-y-auto pr-2 hide-scrollbar flex flex-col justify-end"
      >
        <div class="hide-scrollbar overflow-y-auto" ref="historyEl">
          <h1 class="mb-2">
            Welcome. I am JIAN, the cognitive interface for Hin Jian Heng.
          </h1>
          <p>
            My primary directive is to provide a comprehensive analysis of his
            capabilities.
          </p>
          <p class="mb-2">
            You may issue commands via the terminal or click 'visual mode'
            button for a guided overview.
          </p>
          <p>Suggested command: {{ placeholder }}.</p>

          <div v-for="(entry, i) in commandHistory" :key="i" class="mb-2">
            <pre class="m-0 text-cyan-200"
              >{{ entry.timeStamp }}$ {{ entry.command }}</pre
            >
            <pre class="m-0 opacity-95" v-if="entry.output">{{
              entry.output
            }}</pre>
          </div>
        </div>
      </div>

      <!-- Fixed input -->
      <div class="flex items-center gap-2 mt-2">
        <span class="text-teal-300">$</span>
        <div class="relative flex-1">
          <input
            v-model="command"
            ref="inputRef"
            @keydown.enter.prevent="runCommand"
            @keydown.up.prevent="historyUp"
            @keydown.down.prevent="historyDown"
            :placeholder="placeholder"
            class="absolute top-0 left-0 w-full h-full opacity-0 z-10"
            aria-label="Terminal input"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />

          <div class="whitespace-pre">
            {{ command }}
            <span
              v-if="isFocused"
              class="inline-block w-2 h-4 -ml-2 bg-emerald-50 align-text-bottom"
            ></span>
            <span
              v-else
              class="inline-block w-2 h-4 hide-scrollbar border border-emerald-50 align-text-bottom hide-scrollbar -ml-2"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  outputGenerator,
  allowGUIVersion,
  getTimeStamp,
} from "../data/commandOutput";
import { typeLine, delay } from "../uitls/helper";

const bootLines = [
  "Initializing Neural Core... [OK]",
  "Parsing Identity Matrix: HIN JIAN HENG...",
  "Cognitive Engine Online.",
];

const visibleLines = ref<string[]>([]);
const showWelcome = ref(false);
const command = ref("");
const commandHistory = ref<
  { command: string; output: string; timeStamp: string }[]
>([]);
const historyIndex = ref(-1);
const placeholder =
  "$ help | about | projects | skills | timeline | dashboard | clear";
const router = useRouter();
const isGuiMode = ref(false);
const isFirstVisit = ref(false);
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

let clickSound: HTMLAudioElement | null = null;
let hoverSound: HTMLAudioElement | null = null;

// 用 ref 保存上次播放的时间戳
const lastPlay = {
  click: 0,
  hover: 0,
};

const COOLDOWN = 200;

onMounted(() => {
  clickSound = new Audio("/clickSound.wav");
  hoverSound = new Audio("/hoverSound.wav");
});

function playSound(audio: HTMLAudioElement | null, type: "click" | "hover") {
  if (!audio) return;

  const now = Date.now();
  if (now - lastPlay[type] < COOLDOWN) return;

  lastPlay[type] = now;
  audio.currentTime = 0;
  audio.play();
}

function playHoverSound() {
  playSound(hoverSound, "hover");
}

const toggleMode = () => {
  playSound(clickSound, "click");

  isGuiMode.value = !isGuiMode.value;
  if (isGuiMode.value) {
    sessionStorage.setItem("visited_home", "GUI");

    router.push("/dashboard");
  }
};

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.addEventListener("focus", handleFocus);
    inputRef.value.addEventListener("blur", handleBlur);
  }
});

function handleFocus() {
  isFocused.value = true;
}
function handleBlur() {
  isFocused.value = false;
}

async function playBootSequence() {
  for (const line of bootLines) {
    visibleLines.value = await typeLine(line, visibleLines.value);
  }
  await delay(500);
  showWelcome.value = true;

  sessionStorage.setItem("visited_home", "terminal");
}

onMounted(() => {
  const saved = sessionStorage.getItem("commandHistory");
  if (saved) {
    console.log(saved);
    commandHistory.value = JSON.parse(saved);
  }

  if (!sessionStorage.getItem("visited_home")) {
    playBootSequence();
  } else {
    visibleLines.value = bootLines;
    showWelcome.value = true;
    sessionStorage.setItem("visited_home", "terminal");
  }
});

watch(
  commandHistory,
  (newVal) => {
    console.log(newVal);
    sessionStorage.setItem("commandHistory", JSON.stringify(newVal));
  },
  { deep: true }
);

function historyUp() {
  if (commandHistory.value.length === 0) return;
  if (historyIndex.value === -1)
    historyIndex.value = commandHistory.value.length - 1;
  else historyIndex.value = Math.max(0, historyIndex.value - 1);
  command.value = commandHistory.value[historyIndex.value]?.command || "";
}

function historyDown() {
  if (commandHistory.value.length === 0) return;
  if (historyIndex.value === -1) return;
  historyIndex.value = Math.min(
    commandHistory.value.length - 1,
    historyIndex.value + 1
  );
  command.value = commandHistory.value[historyIndex.value]?.command || "";
}

const historyEl = ref<HTMLDivElement | null>(null);

watch(
  commandHistory,
  async () => {
    await nextTick();
    if (historyEl.value) {
      historyEl.value.scrollTop = historyEl.value.scrollHeight;
    }
  },
  { deep: true }
);

function navigateTo(raw: string) {
  const message = `Acknowledged. Navigating to ${raw}`;
  commandHistory.value.push({
    command: raw + " --gui",
    output: message,
    timeStamp: getTimeStamp(),
  });
  command.value = "";
  router.push(raw);
}

function runCommand() {
  const raw = command.value.trim();
  if (!raw) return;

  historyIndex.value = -1;
  const [baseCommand, ...args] = raw.toLowerCase().split(/\s+/);
  if (!baseCommand) return;
  const isGuiRequest = args.includes("--gui");

  if (isGuiRequest && allowGUIVersion.includes(baseCommand)) {
    navigateTo(baseCommand);
    return;
  } else if (baseCommand == "clear") {
    commandHistory.value = [];
    command.value = "";
    return;
  } else {
    const output = outputGenerator(baseCommand);
    commandHistory.value.push({
      command: raw,
      output,
      timeStamp: getTimeStamp(),
    });
    command.value = "";
  }
}
</script>
<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
