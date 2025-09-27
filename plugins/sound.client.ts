export default defineNuxtPlugin(() => {
  const clickAudio = new Audio("/clickSound.wav");
  const hoverAudio = new Audio("/hoverSound.wav");

  clickAudio.volume = 0.6;
  hoverAudio.volume = 0.3;

  const COOLDOWN = 300;
  let lastHover = 0;
  let lastClick = 0;

  function play(audio: HTMLAudioElement, lastTimeRef: "hover" | "click") {
    const now = Date.now();
    const last = lastTimeRef === "hover" ? lastHover : lastClick;
    if (now - last < COOLDOWN) return;

    if (lastTimeRef === "hover") lastHover = now;
    else lastClick = now;

    audio.currentTime = 0;
    audio.play();
  }

  function isInteractive(el: HTMLElement): boolean {
    if (el.hasAttribute("data-sound")) return true;
    const targetParent = el.parentElement as HTMLElement;
    return targetParent && isInteractive(targetParent);
  }

  function interactiveElement(el: HTMLElement): HTMLElement {
    if (el.hasAttribute("data-sound")) return el;
    const targetParent = el.parentElement as HTMLElement;
    return interactiveElement(targetParent) || targetParent;
  }

  let hoverElement: HTMLElement | null = null;
  document.addEventListener("mouseover", (e) => {
    const target = e.target as HTMLElement;
    console.log(target);
    if (isInteractive(target) && hoverElement != interactiveElement(target)) {
      hoverElement = interactiveElement(target);
      play(hoverAudio, "hover");
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (isInteractive(target)) {
      play(clickAudio, "click");
    }
  });
});
