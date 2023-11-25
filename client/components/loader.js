function LoaderComponent(parentElement) {
    this.parentElement = parentElement;
    this.loaderElement = document.createElement('div');
    this.loaderElement.style.position = 'fixed';
    this.loaderElement.style.top = '0';
    this.loaderElement.style.left = '0';
    this.loaderElement.style.width = '100vw';
    this.loaderElement.style.height = '100vh';
    this.loaderElement.style.display = 'flex';
    this.loaderElement.style.justifyContent = 'center';
    this.loaderElement.style.alignItems = 'center';
    this.loaderElement.style.backgroundColor = 'rgba(20, 20, 20, 0.6)'; // semi-transparent background
    this.loaderElement.style.zIndex = '1000'; // ensure it's on top
    this.loaderElement.style.display = 'none'; // Initially hidden

    // Create the actual spinning element inside the loader
    const spinner = document.createElement('div');
    spinner.style.border = '5px solid #f3f3f3'; // Light grey border
    spinner.style.borderTop = '5px solid red'; // Blue border
    spinner.style.borderRadius = '50%';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.animation = 'spin 2s linear infinite';

    // Add keyframes for the spinning animation
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Append the spinner to the loader element
    this.loaderElement.appendChild(spinner);

    // Append the loader to the body (not the parent element)
    document.body.appendChild(this.loaderElement);

    // Method to show the loader
    this.show = function() {
        this.loaderElement.style.display = 'flex';
    };

    // Method to hide the loader
    this.hide = function() {
        // Start by setting the opacity to 1
        this.loaderElement.style.opacity = '1';
    
        // Use a CSS transition for the opacity change
        this.loaderElement.style.transition = 'opacity 1s ease-out';
    
        // Change the opacity to 0 to start the fade-out effect
        this.loaderElement.style.opacity = '0';
    
        // Use setTimeout to wait for the transition to complete before hiding the element
        setTimeout(() => {
            this.loaderElement.style.display = 'none';
        }, 500); // 1000ms = 1s, should match the duration of the transition
    };
    
}

// Usage example:
 const loader = new LoaderComponent(document.body);
 loader.show(); 


 setTimeout(() => {
    loader.hide();
 }, 500);


 // To show the loader
// loader.hide(); // To hide the loader
