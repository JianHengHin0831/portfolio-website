import type { H3Event } from "h3";
import { projects, profile, skills, experiences } from "../../data/profile";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<{ message: string }>(event);
    const userMessage = (body?.message || "").slice(0, 4000);
    if (!userMessage) {
      return { error: "Empty message" };
    }

    const systemPrompt = [
      "You are JIAN, the Cognitive AI Interface for Hin Jian Heng.",
      "Answer strictly about Hin Jian Heng using ONLY the provided context.",
      "Be precise, professional, and concise. If unknown, say you do not have that info.",
      "",
      "PROFILE:",
      JSON.stringify(profile),
      "",
      "SKILLS:",
      JSON.stringify(skills),
      "",
      "PROJECTS:",
      JSON.stringify(projects),
      "",
      "EXPERIENCES:",
      JSON.stringify(experiences),
    ].join("\n");

    const apiKey = process.env.OPENAI_API_KEY || "";
    if (!apiKey) {
      return { error: "Missing OPENAI_API_KEY on server" };
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.2,
        max_tokens: 512,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return { error: `OpenAI error: ${resp.status}`, detail: err };
    }
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content?.trim() || "";
    return { reply: text };
  } catch (e: any) {
    return { error: e?.message || "Unknown server error" };
  }
});
