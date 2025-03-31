import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css"; // Change theme as needed
import "prismjs/components/prism-javascript"; // Add more languages if needed

export default defineNuxtPlugin(() => {
  return {
    provide: {
      prism: Prism,
    },
  };
});
