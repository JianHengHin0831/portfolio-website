import type { H3Event } from "h3";
import { projects, profile, skills, experiences } from "../../data/profile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<{ messages: ChatMessage[] }>(event);
    const incomingMessages = body?.messages || [];

    if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
      return { error: "Invalid or empty message history" };
    }

    const systemPrompt = [
      "You are JIAN, the Cognitive AI Interface for Hin Jian Heng.",
      "Answer strictly about Hin Jian Heng using ONLY the provided context.",
      "Be precise, professional, and concise. If a question is outside the context, politely state that you do not have that information.",
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

    const config = useRuntimeConfig();
    const apiKey = config.openaiApiKey;
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Server is not configured with an API key.",
      });
    }

    const messagesForOpenAI = incomingMessages.map((msg) => ({
      role: msg.role,
      content: [{ type: "text", text: msg.content }],
    }));

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: systemPrompt }],
          },
          ...messagesForOpenAI,
        ],
        temperature: 0.2,
        max_tokens: 512,
      }),
    });

    if (!resp.ok) {
      const err = await resp.json();
      console.error("OpenAI API Error:", err);
      return { error: `OpenAI error: ${resp.status}`, detail: err };
    }

    const data = await resp.json();
    const text =
      data.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a response.";
    return { reply: text };
  } catch (e: any) {
    console.error("Server Handler Error:", e);
    return { error: e?.message || "An unknown server error occurred." };
  }
});
