<template>
  <div class="fixed bottom-6 right-6 z-50 font-mono">
    <!-- Main Transition for the Window -->
    <Transition name="chat-window">
      <div
        v-if="open"
        class="w-96 h-[32rem] /* Fixed height is key */ flex flex-col /* This enables the layout fix */ bg-slate-900/80 backdrop-blur-md /* Frosted glass effect */ text-slate-100 border border-emerald-400/30 rounded-lg shadow-2xl shadow-emerald-900/50 overflow-hidden"
      >
        <!-- Header -->
        <div
          class="px-4 py-2 flex items-center justify-between bg-slate-800/80 border-b border-emerald-400/20 flex-shrink-0"
        >
          <div class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              ></span>
            </span>
            <div class="text-emerald-300 text-sm">JIAN // NL Interface</div>
          </div>
          <button
            class="text-slate-400 hover:text-white transition-colors"
            @click="open = false"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" data-sound />
          </button>
        </div>

        <!-- Message List (The scrollable part) -->
        <div
          ref="messageContainer"
          class="flex-1 p-4 space-y-4 overflow-y-auto"
        >
          <TransitionGroup name="message-fade">
            <div v-for="(m, i) in messages" :key="i" class="text-sm">
              <div v-if="m.role === 'user'" class="flex justify-end">
                <p class="bg-slate-700/50 rounded-lg px-3 py-2 max-w-xs">
                  {{ m.content }}
                </p>
              </div>
              <div v-else class="flex justify-start">
                <p
                  class="bg-emerald-500/10 text-emerald-200 rounded-lg px-3 py-2 max-w-xs whitespace-pre-wrap"
                >
                  {{ m.content }}
                </p>
              </div>
            </div>
          </TransitionGroup>

          <!-- AI Typing Indicator -->
          <div v-if="loading" key="loading" class="flex justify-start">
            <div
              class="bg-emerald-500/10 text-emerald-200 rounded-lg px-3 py-2 flex items-center gap-1.5"
            >
              <span
                class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse [animation-delay:-0.3s]"
              ></span>
              <span
                class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse [animation-delay:-0.15s]"
              ></span>
              <span
                class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              ></span>
            </div>
          </div>
        </div>

        <!-- Input Form (Fixed at the bottom) -->
        <div
          class="p-3 border-t border-emerald-400/20 bg-slate-800/50 flex-shrink-0"
        >
          <form @submit.prevent="send" class="flex items-center gap-2">
            <input
              v-model="input"
              :placeholder="placeholder"
              class="flex-1 bg-transparent outline-none text-sm px-2 py-1.5 border border-white/10 rounded focus:border-emerald-400/50 focus:ring-0 transition-colors"
            />
            <button
              class="text-xs px-3 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 rounded flex items-center justify-center w-16 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              <Icon v-if="loading" name="eos-icons:loading" class="w-4 h-4" />
              <span v-else>Send</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Floating Action Button -->
    <button
      v-if="!open"
      data-sound
      class="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-900/60 hover:bg-emerald-500/30 hover:scale-105 animate-pulse-subtle transition-all duration-300"
      @click="open = true"
    >
      <Icon name="heroicons:chat-bubble-left-right" class="w-7 h-7" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

type ChatMessage = { role: "user" | "assistant"; content: string };

const open = ref(false);
const input = ref("");
const loading = ref(false);
const messages = ref<ChatMessage[]>([
  {
    role: "assistant",
    content:
      "Hello. I am JIAN. Ask me any questions you have about Hin Jian Heng.",
  },
]);
const messageContainer = ref<HTMLElement | null>(null);

const placeholder = "Ask about projects, skills, etc.";

const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

async function send() {
  const text = input.value.trim();
  if (!text || loading.value) return;
  messages.value.push({ role: "user", content: text });
  input.value = "";
  scrollToBottom();

  loading.value = true;
  try {
    const res = await fetch("/api/jian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.value }), // Send chat history for context
    });
    const data = await res.json();
    let notificationSound = new Audio("/notification.wav");
    notificationSound.volume = 0.1;
    notificationSound.play();
    if (data?.reply)
      messages.value.push({ role: "assistant", content: data.reply });
    else
      messages.value.push({
        role: "assistant",
        content: data?.error || "Error: No valid response from server.",
      });
  } catch (e: any) {
    messages.value.push({
      role: "assistant",
      content: e?.message || "Error: Could not connect to the network.",
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
}
</script>

<style>
/* Custom Scrollbar Styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  border: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(16, 185, 129, 0.5);
}

/* Transitions */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.message-fade-enter-active {
  transition: all 0.3s ease-out;
}
.message-fade-leave-active {
  transition: all 0.3s ease-in;
}
.message-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom Animation */
@keyframes pulse-subtle {
  0%,
  100% {
    box-shadow: 0 0 20px 0px rgba(16, 185, 129, 0.2);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px 5px rgba(16, 185, 129, 0.3);
    transform: scale(1.02);
  }
}
.animate-pulse-subtle {
  animation: pulse-subtle 3s infinite ease-in-out;
}
</style>
