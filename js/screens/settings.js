// Settings screen

function renderSettingsScreen(params) {
    if (!appState.currentUser) {
        return '<div class="px-4 pt-4 text-center text-gray-500">Not signed in</div>';
    }
    
    return `
        <div class="px-4 pt-4 pb-6">
            <div class="flex items-center mb-6">
                <button onclick="navigateTo('profile')" class="mr-3 text-blue-500 font-semibold">← Back</button>
                <h2 class="text-2xl font-bold text-gray-900">Settings</h2>
            </div>
            <div class="space-y-4">
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <h3 class="font-semibold text-gray-800 mb-2">Account</h3>
                    <p class="text-sm text-gray-600 mb-4">Signed in as <span class="font-semibold">${appState.currentUser.username}</span></p>
                    <button id="signout-btn" class="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm active:bg-red-600 transition-all duration-300">
                        Sign Out
                    </button>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <h3 class="font-semibold text-gray-800 mb-2">About</h3>
                    <p class="text-sm text-gray-600">Playstre v1.0.0</p>
                    <p class="text-xs text-gray-500 mt-2">Create games in seconds with AI</p>
                </div>
            </div>
        </div>
    `;
}

function initSettingsScreen() {
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', handleSignOut);
    }
}

function handleSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('playstre_user');
        appState.currentUser = null;
        appState.isAuthenticated = false;
        appState.createdGames = [];
        
        // Hide app shell
        const appShell = document.getElementById('app-shell');
        if (appShell) {
            appShell.style.display = 'none';
        }
        
        // Update app shell (hides bottom nav)
        updateAppShell();
        
        navigateTo('auth');
    }
}
