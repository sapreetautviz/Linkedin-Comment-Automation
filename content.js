var keyword = "AI Agent";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateSearch() {
  try {
    console.log("Clicking search box...");
    const searchBox = document.querySelector('input.search-global-typeahead__input');

    if (!searchBox) throw new Error('Search box not found. Ensure you are on the LinkedIn feed page.');

    searchBox.focus();
    searchBox.value = keyword;
    searchBox.dispatchEvent(new InputEvent('input', { bubbles: true }));

    console.log("Search initiated for:", keyword);
    await delay(1000);

    searchBox.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
      code: 'Enter'
    }));
    console.log('Enter key simulated.');

    await delay(2000);

    const postsButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent.trim().toLowerCase() === 'posts'
    );

    if (!postsButton) throw new Error('Posts button not found.');

    postsButton.click();
    console.log('Posts button clicked.');
    await delay(2000);

    await expandAndExtractPost();
  } catch (error) {
    console.error(error.message);
  }
}

async function expandAndExtractPost() {
  try {
    console.log("Extracting Post...");

    const descriptionContainer = document.querySelector('.update-components-update-v2__commentary');
    const descriptionText = descriptionContainer ? descriptionContainer.innerText.trim() : 'Description not found.';
    console.log('Post text:', descriptionText);

    const comment = generateComment(descriptionText);
    console.log("Generated comment:", comment);

    const commentButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent.trim().toLowerCase() === 'comment'
    );

    if (!commentButton) throw new Error('Comment button not found.');

    commentButton.click();
    console.log('Comment button clicked.');

    // Wait for comment box
    let commentBox;
    for (let i = 0; i < 10; i++) {
      commentBox = document.querySelector('.comments-comment-box-comment__text-editor .ql-editor[contenteditable="true"]');
      if (commentBox && commentBox.offsetParent !== null) break;
      console.log(`Waiting for comment box... (${i + 1}/10)`);
      await delay(500);
    }

    if (!commentBox) throw new Error('Comment box not found.');

    commentBox.focus();
    document.execCommand('insertText', false, comment);
    await delay(1000);

    const submitButton = document.querySelector('.comments-comment-box__submit-button--cr');

    if (!submitButton) throw new Error('Submit button not found.');

    submitButton.click();
    chrome.storage.local.set({ isRunning: false }, () => {
        console.log('Comment submitted successfully');
     });

  } catch (error) {
    console.error(error.message);
  }
}

function generateComment(postText) {
  return `Great insights Thanks for sharing.`;
}

simulateSearch();
