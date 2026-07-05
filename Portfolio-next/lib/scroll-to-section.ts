function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? header.offsetHeight + 8 : 88;
}

function scrollToElement(sectionId: string, options?: { updateHash?: boolean }): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const headerOffset = getHeaderOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  if (options?.updateHash !== false) {
    const nextUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
    window.history.pushState(null, "", nextUrl);
  }

  return true;
}

export function scrollToSection(sectionId: string, options?: { updateHash?: boolean }) {
  if (scrollToElement(sectionId, options)) return;

  // Retry for lazily mounted sections (dynamic imports).
  window.requestAnimationFrame(() => {
    if (scrollToElement(sectionId, options)) return;
    window.setTimeout(() => scrollToElement(sectionId, options), 150);
    window.setTimeout(() => scrollToElement(sectionId, options), 400);
  });
}
