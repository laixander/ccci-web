// plugins/prism.js
export default defineNuxtPlugin((nuxtApp) => {
    // Function to apply Prism highlighting
    const applyPrismHighlighting = () => {
      if (typeof window !== 'undefined' && window.Prism) {
        window.Prism.highlightAll();
      }
    };
  
    // Apply Prism highlighting after page transition
    nuxtApp.hook('page:transitioned', () => {
      applyPrismHighlighting();
    });
  
    // Apply Prism highlighting after the page has finished loading
    nuxtApp.hook('page:finish', () => {
      applyPrismHighlighting();
    });
  
    // Apply Prism highlighting when the component is mounted (for initial page load)
    nuxtApp.hook('vue:mounted', () => {
      applyPrismHighlighting();
    });
  });
  