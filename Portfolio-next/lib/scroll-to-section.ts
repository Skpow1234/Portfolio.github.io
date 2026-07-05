function performScroll(sectionId: string, options?: { updateHash?: boolean }): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });

  if (options?.updateHash !== false) {
    const hash = `#${sectionId}`;
    const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }

  return true;
}

export function scrollToSection(sectionId: string, options?: { updateHash?: boolean }) {
  if (performScroll(sectionId, options)) return;

  window.requestAnimationFrame(() => {
    if (performScroll(sectionId, options)) return;
    window.setTimeout(() => performScroll(sectionId, options), 150);
    window.setTimeout(() => performScroll(sectionId, options), 400);
  });
}
