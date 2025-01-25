export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
      if (typeof window !== 'undefined' && window.Prism) {
        window.Prism.highlightAll(); // Reapply syntax highlighting
      }
    });
  });
  