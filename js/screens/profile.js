// Profile screen

function renderProfileScreen(params) {
    if (!appState.currentUser) {
        return '<div class="px-4 pt-4 text-center text-gray-500">Not signed in</div>';
    }
    
    const gameCount = appState.createdGames.length;
    const totalPlays = appState.createdGames.reduce((sum, g) => sum + g.plays, 0);
    const stats = `${gameCount} games created • ${totalPlays} total plays`;
    
    let gamesHtml = '';
    if (appState.createdGames.length === 0) {
        gamesHtml = `
            <div class="text-center py-12 text-gray-500">
                <div class="text-4xl mb-3">🎮</div>
                <p>You haven't created any games yet</p>
                <button onclick="navigateTo('create')" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold active:bg-blue-600">
                    Create Your First Game
                </button>
            </div>
        `;
    } else {
        gamesHtml = appState.createdGames
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(game => createGameCard(game)).join('');
    }
    
    return `
        <div class="px-4 pt-4 pb-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900">Profile</h2>
                <button onclick="navigateTo('settings')" class="text-gray-600 text-2xl">⚙️</button>
            </div>
            <div class="text-center mb-6">
                <div class="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl text-white mx-auto mb-3">
                    ${appState.currentUser.avatar}
                </div>
                <h2 class="text-2xl font-bold text-gray-900">${appState.currentUser.username}</h2>
                <p class="text-gray-600 text-sm mt-1">${stats}</p>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-800 px-2">My Games</h3>
                <div id="profile-games-list" class="space-y-3">
                    ${gamesHtml}
                </div>
            </div>
        </div>
    `;
}

function initProfileScreen() {
    const container = document.getElementById('profile-games-list');
    if (!container) return;
    
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            navigateTo('game', { gameId });
        });
    });
}
