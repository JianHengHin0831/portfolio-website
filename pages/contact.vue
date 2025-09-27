<template>
  <div class="min-h-screen bg-transparent text-slate-100 font-mono">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0"
      >
        <h1 class="text-lg sm:text-xl text-emerald-300">
          Comms Channel // Contacts
        </h1>
      </div>

      <!-- Intro -->
      <div class="text-left md:text-center mb-8 sm:mb-12">
        <p class="text-slate-300 text-sm sm:text-base px-2">
          The interface is ready to establish a connection. All channels are
          monitored for incoming transmissions. Select a protocol to proceed.
        </p>
      </div>

      <!-- Contact Methods -->
      <div class="space-y-4 sm:space-y-6">
        <div
          v-for="(method, index) in contactMethods"
          data-sound
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
            class="group w-full text-left block"
          >
            <div
              class="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-300 ease-in-out hover:border-emerald-400/40 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/50"
            >
              <!-- Icon -->
              <Icon
                :name="method.icon"
                class="text-emerald-400 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
              />

              <!-- Text -->
              <div class="flex-grow flex-1 text-left">
                <h2 class="text-emerald-300 text-base sm:text-lg">
                  {{ method.name }}
                </h2>
                <p class="text-slate-400 text-xs sm:text-sm">
                  {{ method.description }}
                </p>
              </div>

              <!-- Action Button -->
              <div
                class="w-full sm:w-28 text-center py-1.5 sm:py-2 rounded border-2 border-slate-600 text-slate-300 text-sm sm:text-base transition-all duration-300 group-hover:border-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-400/10 mt-2 sm:mt-0"
              >
                {{ method.actionText }}
              </div>
            </div>
          </component>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 sm:mt-16 text-center">
        <p class="text-[10px] sm:text-xs text-slate-500">
          [ End of Transmission Log ]
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const copiedEmail = ref("Copy Address");

useHead({
  title: "Contacts | Hin Jian Heng",
});

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
