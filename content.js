function simulateSearch(query) {
    console.log("Clicking search box...");
  
    const searchBox = document.querySelector('input.search-global-typeahead__input');
  
    if (!searchBox) {
      console.error('Search box not found');
      alert('Search box not found. Please ensure you are on the LinkedIn feed page.');
      return;
    }
  
    searchBox.focus();
    searchBox.value = query;
  
    const inputEvent = new InputEvent('input', { bubbles: true });
    searchBox.dispatchEvent(inputEvent);
  
    console.log(`Search initiated for: ${query}`);
  
    // Simulate Enter key press with a slight delay
    setTimeout(() => {
      const enterEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'Enter',
        code: 'Enter'
      });
      searchBox.dispatchEvent(enterEvent);
      console.log('Enter key simulated.');
    }, 300); // Adjust the delay if necessary
  }
  simulateSearch('AI Agent');
  