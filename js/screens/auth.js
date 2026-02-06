// Auth screen (Sign In)

function renderAuthScreen(params) {
    return `
        <div class="min-h-screen flex flex-col items-center justify-center px-6">
            <div class="text-center mb-8 fade-in">
                <h1 class="text-5xl font-bold text-gray-900 mb-2">Playstre</h1>
                <p class="text-gray-600 text-base">Create games in seconds with AI</p>
            </div>
            <div class="w-full max-w-sm space-y-4">
                <input type="text" id="signin-username" placeholder="Username" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button id="signin-btn" class="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-base active:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95">
                    Sign In
                </button>
                <p class="text-xs text-gray-500 text-center">No account? Just enter a username to get started!</p>
            </div>
        </div>
    `;
}

function initAuthScreen() {
    document.getElementById('signin-btn').addEventListener('click', handleSignIn);
    document.getElementById('signin-username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSignIn();
    });
}

function handleSignIn() {
    const usernameInput = document.getElementById('signin-username');
    if (!usernameInput) return;
    
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Please enter a username');
        return;
    }
    
    appState.currentUser = {
        username: username,
        id: `user_${Date.now()}`,
        avatar: username.charAt(0).toUpperCase()
    };
    
    appState.isAuthenticated = true;
    
    localStorage.setItem('playstre_user', JSON.stringify(appState.currentUser));
    
    // Show app shell and update UI
    const appShell = document.getElementById('app-shell');
    if (appShell) {
        appShell.style.display = 'flex';
    }
    
    // Update app shell (shows bottom nav)
    updateAppShell();
    
    navigateTo('home');
}
