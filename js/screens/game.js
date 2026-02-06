// Game detail screen

function renderGameScreen(params) {
    const gameId = params.gameId;
    const allGames = [...fakeGames, ...appState.createdGames];
    const game = allGames.find(g => g.id === gameId);
    
    if (!game) {
        return '<div class="px-4 pt-4 text-center text-gray-500">Game not found</div>';
    }
    
    appState.viewingGameId = gameId;
    const previousScreen = appState.currentScreen === 'game' ? 'home' : appState.currentScreen;
    
    return `
        <div class="px-4 pt-4 pb-6">
            <div class="mb-6">
                <button onclick="navigateTo('${previousScreen}')" class="mb-4 text-blue-500 font-semibold">← Back</button>
                <div class="text-center mb-6">
                    <div class="text-7xl mb-4">${game.emoji}</div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">${game.title}</h1>
                    <p class="text-gray-600">by ${game.creator}</p>
                </div>
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Game Details</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Type:</span>
                            <span class="font-semibold">${game.type}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Subtype:</span>
                            <span class="font-semibold">${game.subtype}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Theme:</span>
                            <span class="font-semibold">${game.theme}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Players:</span>
                            <span class="font-semibold">${game.players}</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div class="text-2xl mb-1">🎮</div>
                        <div class="text-lg font-semibold">${game.plays}</div>
                        <div class="text-xs text-gray-500">Plays</div>
                    </div>
                    <div class="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div class="text-2xl mb-1">❤️</div>
                        <div class="text-lg font-semibold">${game.likes}</div>
                        <div class="text-xs text-gray-500">Likes</div>
                    </div>
                    <div class="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div class="text-2xl mb-1">👥</div>
                        <div class="text-lg font-semibold">${game.players}</div>
                        <div class="text-xs text-gray-500">Players</div>
                    </div>
                </div>
                <button class="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-base active:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95">
                    🎮 Play Game
                </button>
            </div>
        </div>
    `;
}

function initGameScreen() {
    // No special initialization needed
}
