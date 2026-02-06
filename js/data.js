// Shared data and state management

// Fake game data
const fakeGames = [
    {
        id: '1',
        title: 'Jungle Racer',
        type: 'Racing',
        subtype: 'Arcade',
        theme: 'Jungle',
        players: 2,
        creator: 'GameMaster',
        plays: 1240,
        likes: 89,
        emoji: '🏎️',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        title: 'Space Shooter',
        type: 'Shooting',
        subtype: 'Arcade',
        theme: 'Sci-Fi',
        players: 1,
        creator: 'StarGamer',
        plays: 3420,
        likes: 234,
        emoji: '🚀',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        title: 'City Drift',
        type: 'Racing',
        subtype: 'Simulator',
        theme: 'Realistic',
        players: 4,
        creator: 'SpeedDemon',
        plays: 567,
        likes: 45,
        emoji: '🏁',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '4',
        title: 'Poker Night',
        type: 'Cards',
        subtype: 'Arcade',
        theme: 'Realistic',
        players: 4,
        creator: 'CardKing',
        plays: 890,
        likes: 67,
        emoji: '🃏',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '5',
        title: 'Tropical Chase',
        type: 'Racing',
        subtype: 'Open World',
        theme: 'Jungle',
        players: 2,
        creator: 'AdventureSeeker',
        plays: 1234,
        likes: 112,
        emoji: '🌴',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '6',
        title: 'Galactic Battle',
        type: 'Shooting',
        subtype: 'Arcade',
        theme: 'Sci-Fi',
        players: 2,
        creator: 'CosmicWarrior',
        plays: 2100,
        likes: 178,
        emoji: '🔫',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// App state
let appState = {
    currentUser: null,
    isAuthenticated: false,
    currentScreen: 'home',
    createdGames: [],
    gameState: {
        type: null,
        subtype: null,
        theme: null,
        players: null
    },
    currentStep: 1,
    viewingGameId: null
};

const totalSteps = 4;

// Helper functions
function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function createGameCard(game) {
    const timeAgo = getTimeAgo(game.createdAt);
    return `
        <div class="game-card card" data-game-id="${game.id}">
            <div class="flex items-start space-x-4">
                <div class="text-5xl flex-shrink-0">${game.emoji}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${game.title}</h3>
                    <p class="text-sm text-gray-600 mb-2">${game.type} • ${game.subtype} • ${game.theme}</p>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>👤 ${game.creator}</span>
                        <span>🎮 ${game.plays} plays</span>
                        <span>❤️ ${game.likes}</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-2">${timeAgo}</p>
                </div>
            </div>
        </div>
    `;
}

function generateGameTitle() {
    const themes = {
        'jungle': ['Tropical', 'Jungle', 'Wild'],
        'sci-fi': ['Galactic', 'Space', 'Future'],
        'realistic': ['City', 'Urban', 'Street']
    };
    const types = {
        'racing': ['Racer', 'Speed', 'Drift'],
        'shooting': ['Shooter', 'Battle', 'Combat'],
        'cards': ['Cards', 'Poker', 'Deck']
    };
    
    const themeWords = themes[appState.gameState.theme] || ['Epic'];
    const typeWords = types[appState.gameState.type] || ['Game'];
    
    return `${themeWords[Math.floor(Math.random() * themeWords.length)]} ${typeWords[Math.floor(Math.random() * typeWords.length)]}`;
}

function getEmojiForType(type) {
    const emojis = {
        'racing': '🏎️',
        'shooting': '🔫',
        'cards': '🃏'
    };
    return emojis[type] || '🎮';
}
