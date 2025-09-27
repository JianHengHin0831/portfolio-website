<template>
  <div class="min-h-screen bg-transparent text-slate-100 font-mono">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-12">
        <h1 class="text-xl text-emerald-300">
          Comms Channel // Establish Connection
        </h1>
        <NuxtLink to="/" class="text-emerald-300 hover:underline"
          >/home</NuxtLink
        >
      </div>

      <div class="text-center mb-12">
        <p class="text-slate-300">
          The interface is ready to establish a connection. All channels are
          monitored for incoming transmissions. Select a protocol to proceed.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Loop through contact methods -->
        <div
          v-for="(method, index) in contactMethods"
          :key="method.name"
          :style="{ transitionDelay: `${index * 100}ms` }"
          class="transition-all duration-500 ease-out"
          :class="
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          "
        >
          <component
            :is="method.is === 'a' ? 'a' : 'button'"
            :href="method.url"
            :target="method.is === 'a' ? '_blank' : undefined"
            @click="method.action"
            class="group w-full text-left"
          >
            <div
              class="bg-white/5 border border-white/10 rounded-lg p-6 flex items-center gap-6 transition-all duration-300 ease-in-out hover:border-emerald-400/40 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/50"
            >
              <Icon
                :name="method.icon"
                class="text-emerald-400 w-10 h-10 flex-shrink-0"
              />
              <div class="flex-grow flex-1">
                <h2 class="text-emerald-300 text-lg">{{ method.name }}</h2>
                <p class="text-slate-400 text-sm">{{ method.description }}</p>
              </div>
              <div
                class="!w-28 text-center py-2 rounded border-2 border-slate-600 text-slate-300 transition-all duration-300 group-hover:border-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-400/10"
              >
                {{ method.actionText }}
              </div>
            </div>
          </component>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-xs text-slate-500">[ End of Transmission Log ]</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const copiedEmail = ref("Copy Address");

const copyToClipboard = () => {
  navigator.clipboard.writeText("jianhenghin0831@gmail.com");
  copiedEmail.value = "Address Copied!";
  setTimeout(() => {
    copiedEmail.value = "Copy Address";
  }, 2000);
};

const contactMethods = ref([
  {
    is: "a",
    name: "Professional Network Protocol",
    description:
      "Access professional profile, career history, and endorsements on LinkedIn.",
    icon: "mdi:linkedin",
    url: "https://linkedin.com/in/jian-heng-hin",
    actionText: ref("Connect"),
    action: null,
  },
  {
    is: "a",
    name: "Code Repository Access",
    description:
      "View source code for all public projects and contribution activity on GitHub.",
    icon: "mdi:github",
    url: "https://github.com/JianHengHin0831",
    actionText: ref("View Code"),
    action: null,
  },
  {
    is: "button",
    name: "Direct Transmission Protocol",
    description:
      "Transmit a secure message directly via the Electronic Mail Gateway.",
    icon: "heroicons:envelope-solid",
    url: null,
    actionText: copiedEmail,
    action: copyToClipboard,
  },
]);

const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});
</script>
