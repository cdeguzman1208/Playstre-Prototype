// Search screen

function renderSearchScreen(params) {
    const allGames = [...fakeGames, ...appState.createdGames];
    const gamesHtml = allGames.map(game => createGameCard(game)).join('');
    
    return `
        <div class="px-4 pt-4 pb-2">
            <div class="relative mb-4">
                <input type="text" id="search-input" placeholder="Search games..." class="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span class="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
        </div>
        <div id="search-results" class="px-4 space-y-4">
            ${gamesHtml}
        </div>
    `;
}

function initSearchScreen() {
    const searchInput = document.getElementById('search-input');
    const container = document.getElementById('search-results');
    
    if (!searchInput || !container) return;
    
    searchInput.addEventListener('input', (e) => {
        handleSearch(e, container);
    });
    
    // Initial click handlers
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            navigateTo('game', { gameId });
        });
    });
}

function handleSearch(e, container) {
    const query = e.target.value.toLowerCase().trim();
    const allGames = [...fakeGames, ...appState.createdGames];
    
    if (!query) {
        container.innerHTML = allGames.map(game => createGameCard(game)).join('');
    } else {
        const filtered = allGames.filter(game => 
            game.title.toLowerCase().includes(query) ||
            game.creator.toLowerCase().includes(query) ||
            game.type.toLowerCase().includes(query) ||
            game.theme.toLowerCase().includes(query)
        );
        
        container.innerHTML = filtered.length > 0
            ? filtered.map(game => createGameCard(game)).join('')
            : '<div class="text-center py-12 text-gray-500">No games found</div>';
    }
    
    // Re-attach click handlers
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            navigateTo('game', { gameId });
        });
    });
}
