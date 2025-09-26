<template>
  <div
    class="min-h-screen flex items-center justify-center bg-transparent text-emerald-100 font-mono relative p-6"
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

    <!-- Terminal Container -->
    <div
      v-show="showWelcome"
      class="w-full max-w-[960px] h-[360px] bg-black/70 border border-emerald-300/20 shadow-[inset_0_0_0_1px_rgba(80,220,120,0.08),0_12px_40px_rgba(0,0,0,0.45)] p-6 rounded-lg relative flex flex-col"
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
          <p>
            You may issue commands via the terminal or use scroll navigation for
            a guided overview.
          </p>

          <div v-for="(entry, i) in commandHistory" :key="i" class="mb-2">
            <pre class="m-0 text-cyan-200">$ {{ entry.command }}</pre>
            <pre class="m-0 opacity-95" v-if="entry.output">{{
              entry.output
            }}</pre>
          </div>
        </div>
      </div>

      <!-- Fixed input -->
      <div class="flex items-center gap-2 mt-2">
        <span class="text-teal-300">$</span>
        <input
          v-model="command"
          @keydown.enter.prevent="runCommand"
          @keydown.up.prevent="historyUp"
          @keydown.down.prevent="historyDown"
          :placeholder="placeholder"
          class="flex-1 bg-transparent border-none outline-none text-emerald-50 text-sm"
          aria-label="Terminal input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { outputGenerator, allowGUIVersion } from "../data/commandOutput";
import { typeLine, delay } from "../uitls/helper";

const bootLines = [
  "Initializing Neural Core... [OK]",
  "Parsing Identity Matrix: HIN JIAN HENG...",
  "Cognitive Engine Online.",
];

const visibleLines = ref<string[]>([]);
const showWelcome = ref(false);
const command = ref("");
const commandHistory = ref<{ command: string; output: string }[]>([]);
const historyIndex = ref(-1);
const placeholder =
  "$ help | about | projects | skills | timeline | dashboard | clear";
const router = useRouter();

async function playBootSequence() {
  for (const line of bootLines) {
    visibleLines.value = await typeLine(line, visibleLines.value);
  }
  await delay(500);
  showWelcome.value = true;
}

onMounted(() => {
  playBootSequence();
});

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
  const message = "Acknowledged. Navigating to" + raw;
  commandHistory.value.push({ command: raw, output: message });
  command.value = "";
  router.push(raw);
}

function runCommand() {
  const raw = command.value.trim();
  if (!raw) return;

  historyIndex.value = -1;
  const [baseCommand, ...args] = raw.toLowerCase().split(/\s+/);
  if (!baseCommand) return;
  const isGuiRequest = args.includes("--gui") || args.includes("-v");

  if (isGuiRequest && allowGUIVersion.includes(baseCommand)) {
    navigateTo(baseCommand);
    return;
  } else if (baseCommand == "clear") {
    commandHistory.value = [];
    command.value = "";
    return;
  } else {
    const output = outputGenerator(baseCommand);
    commandHistory.value.push({ command: raw, output });
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
