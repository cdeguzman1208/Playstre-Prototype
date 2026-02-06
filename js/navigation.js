// Navigation controller

let screenRegistry = {};

function registerScreen(screenName, renderFunction, initFunction) {
    screenRegistry[screenName] = {
        render: renderFunction,
        init: initFunction || null
    };
}

function navigateTo(screenName, params = {}) {
    const screen = screenRegistry[screenName];
    if (!screen) {
        console.error(`Screen "${screenName}" not found`);
        return;
    }
    
    const appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error('App container not found');
        return;
    }
    
    // Render the screen
    appContainer.innerHTML = screen.render(params);
    
    // Update app state
    appState.currentScreen = screenName;
    
    // Update app shell (bottom nav visibility)
    updateAppShell();
    
    // Update bottom nav highlighting
    updateBottomNav();
    
    // Scroll to top
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
    
    // Call screen init function if it exists
    if (screen.init) {
        screen.init();
    }
}

function updateBottomNav() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        const screen = tab.dataset.screen;
        if (screen === appState.currentScreen) {
            tab.classList.remove('text-gray-400');
            tab.classList.add('text-blue-500');
        } else {
            tab.classList.remove('text-blue-500');
            tab.classList.add('text-gray-400');
        }
    });
}

// Update app shell visibility based on auth state
function updateAppShell() {
    // No bottom nav in new design - always hidden
    // This function kept for compatibility but does nothing
}

// Make navigateTo and updateAppShell available globally
window.navigateTo = navigateTo;
window.updateAppShell = updateAppShell;