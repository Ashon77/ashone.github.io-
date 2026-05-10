// Set the current year in the footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Toggle extra Milky Way facts (show/hide)
const factToggleBtn = document.getElementById('fact-toggle-btn');
const extraFacts = document.getElementById('extra-facts');

if (factToggleBtn && extraFacts) {
  factToggleBtn.addEventListener('click', () => {
    const isHidden = extraFacts.classList.contains('hidden');

    // Show or hide the extra facts
    extraFacts.classList.toggle('hidden');

    // Update accessibility attribute
    factToggleBtn.setAttribute('aria-expanded', String(isHidden));

    // Keep focus in the right place
    if (!isHidden) {
      factToggleBtn.focus();
    } else {
      extraFacts.focus();
    }
  });
}

// Tabs system on Earth page (switch between sections)
const tabsContainer = document.querySelector('[data-tabs]');
if (tabsContainer) {
  const tabButtons = tabsContainer.querySelectorAll('[role="tab"]');
  const tabPanels = tabsContainer.querySelectorAll('[role="tabpanel"]');

  // Function to activate a tab
  function activateTab(newTab) {
    tabButtons.forEach((btn) => {
      const isActive = btn === newTab;
      btn.setAttribute('aria-selected', String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    // Show the matching panel
    tabPanels.forEach((panel) => {
      const isMatch = panel.id === newTab.getAttribute('aria-controls');
      panel.hidden = !isMatch;
    });

    newTab.focus();
  }

  // Click + keyboard controls for tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateTab(btn);
    });

    btn.addEventListener('keydown', (event) => {
      const key = event.key;
      const currentIndex = Array.prototype.indexOf.call(tabButtons, btn);
      let newIndex = currentIndex;

      // Move right or left between tabs
      if (key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabButtons.length;
      } else if (key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabButtons[newIndex]);
    });
  });
}

// Simple planet quiz (checks if answer is Saturn)
const quizForm = document.getElementById('planet-quiz');
const quizFeedback = document.getElementById('quiz-feedback');

if (quizForm && quizFeedback) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get selected answer
    const formData = new FormData(quizForm);
    const answer = formData.get('planet');

    // If nothing selected
    if (!answer) {
      quizFeedback.textContent = 'Please choose an answer before checking.';
      quizFeedback.style.color = '#ffb347';
      return;
    }

    // Check if correct
    if (answer === 'Saturn') {
      quizFeedback.textContent = 'Correct! Saturn is famous for its bright ring system.';
      quizFeedback.style.color = '#7CFC00';
    } else {
      quizFeedback.textContent = 'Not quite. The planet best known for its rings is Saturn.';
      quizFeedback.style.color = '#ff6b6b';
    }
  });
}

// Simple page navigation function
function goTo(page) {
  window.location.href = page;
}
