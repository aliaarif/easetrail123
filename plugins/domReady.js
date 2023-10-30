// plugins/domReady.js
export default ({ app }, inject) => {
    if (process.client) {
      document.addEventListener('DOMContentLoaded', () => {
        // Your code to run when the DOM is ready
        console.log('DOM is ready!');
      });
    }
  };
  