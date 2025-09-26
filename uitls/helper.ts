export async function typeLine(full: string, visibleLines: string[]) {
  const buffer = [] as string[];

  for (let i = 0; i < full.length; i++) {
    buffer.push(full[i] || "");
    const current = buffer.join("");
    if (
      visibleLines.length === 0 ||
      visibleLines[visibleLines.length - 1] !== current
    ) {
      if (i === 0) visibleLines.push("");
      visibleLines[visibleLines.length - 1] = current;
    }
    await delay(16 + Math.random() * 24);
  }
  await delay(220);
  return visibleLines;
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
