export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const header = document.querySelector("header");
  const headerOffset = header instanceof HTMLElement ? header.offsetHeight + 8 : 88;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
