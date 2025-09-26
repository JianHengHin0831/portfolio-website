<template>
  <div class="fixed bottom-4 right-4 z-50">
    <div
      v-if="open"
      class="w-80 bg-slate-900/95 text-slate-100 border border-emerald-400/30 rounded-lg shadow-xl overflow-hidden"
    >
      <div
        class="px-3 py-2 flex items-center justify-between bg-slate-800/80 border-b border-emerald-400/20"
      >
        <div class="text-emerald-300 text-sm">JIAN // NL Interface</div>
        <button
          class="text-slate-400 hover:text-slate-200"
          @click="open = false"
        >
          ✕
        </button>
      </div>
      <div class="p-3 max-h-72 overflow-auto space-y-2">
        <div v-for="(m, i) in messages" :key="i" class="text-sm">
          <div v-if="m.role === 'user'" class="text-slate-200">
            $ {{ m.content }}
          </div>
          <div v-else class="text-emerald-200 whitespace-pre-wrap">
            {{ m.content }}
          </div>
        </div>
      </div>
      <div class="p-2 border-t border-emerald-400/20">
        <form @submit.prevent="send" class="flex items-center gap-2">
          <input
            v-model="input"
            :placeholder="placeholder"
            class="flex-1 bg-transparent outline-none text-sm px-2 py-1 border border-white/10 rounded"
          />
          <button
            class="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded"
            :disabled="loading"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    <button
      v-else
      class="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-lg hover:bg-emerald-500/30"
      @click="open = true"
    >
      J
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type ChatMessage = { role: "user" | "assistant"; content: string };

const open = ref(false);
const input = ref("");
const loading = ref(false);
const messages = ref<ChatMessage[]>([
  {
    role: "assistant",
    content: "Hello. I am JIAN. Ask me about Hin Jian Heng.",
  },
]);

const placeholder = "Ask about projects, skills, or experience";

async function send() {
  const text = input.value.trim();
  if (!text || loading.value) return;
  messages.value.push({ role: "user", content: text });
  input.value = "";
  loading.value = true;
  try {
    const res = await fetch("/api/jian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    if (data?.reply)
      messages.value.push({ role: "assistant", content: data.reply });
    else
      messages.value.push({
        role: "assistant",
        content: data?.error || "No response",
      });
  } catch (e: any) {
    messages.value.push({
      role: "assistant",
      content: e?.message || "Network error",
    });
  } finally {
    loading.value = false;
  }
}
</script>
