// plugins/domReady.js
export default ({ app }, inject) => {
    if (process.client) {
      document.addEventListener('DOMContentLoaded', () => {
        // Your code to run when the DOM is ready
          console.log('DOM is ready!');
          
          document.addEventListener('DOMContentLoaded', function () {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
        
            accordionHeaders.forEach(header => {
              header.addEventListener('click', function () {
                const accordionItem = this.parentElement;
                const isExpanded = accordionItem.classList.contains('is-active');
        
                accordionHeaders.forEach(innerHeader => {
                  innerHeader.parentElement.classList.remove('is-active');
                });
        
                if (!isExpanded) {
                  accordionItem.classList.add('is-active');
                }
              });
            });
          });
          
      });
    }
  };
  