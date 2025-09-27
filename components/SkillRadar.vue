<template>
  <div class="w-full h-96 -mt-20">
    <ClientOnly>
      <apexchart
        type="radar"
        height="150%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>

<script setup>
const skills = [
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

const series = [{ label: "Skill Level", data: skills.map((s) => s.value) }];

const chartOptions = {
  chart: {
    toolbar: { show: false },
    background: "transparent",
    fontFamily: "monospace",
  },
  xaxis: {
    categories: skills.map((s) => s.label),
    labels: { style: { colors: "#0ff", fontSize: "14px" } },
  },
  yaxis: {
    show: true,
    labels: { style: { colors: "#0ff" } },
    min: 0,
    max: 100,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["#06b6d4"],
  },
  fill: {
    opacity: 0.3,
    colors: ["#06b6d4"],
  },
  markers: {
    size: 5,
    colors: ["#111"],
    strokeColors: "#0ff",
    strokeWidth: 2,
    hover: { size: 7 },
  },
  tooltip: {
    custom: ({ dataPointIndex }) => {
      const skill = skills[dataPointIndex];
      return `
          <div class="p-2 rounded-lg bg-gray-900/90 border border-cyan-400 backdrop-blur-sm">
            <div class="font-bold text-cyan-300 mb-1">${skill.label}</div>
            <div class="text-sm text-emerald-200">
              ${skill.tools.map((t) => `• ${t}`).join("<br>")}
            </div>
          </div>
        `;
    },
  },
};
</script>
