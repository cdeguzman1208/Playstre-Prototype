// Game Editor screen

let editorState = {
    isBuilding: false,
    isBuilt: false,
    currentGame: null,
    chatMessages: [],
    lastGameId: null
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomResponse() {
    const responses = [
        "Done! I've made that update.",
        "All set — I’ve applied the change.",
        "That’s been updated. Want to tweak anything else?",
        "Finished! Let me know if you want more adjustments."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

async function runInitialBuildSequence() {
    const steps = [
        'Generating assets…',
        'Designing gameplay mechanics…',
        'Building map…',
        editorState.currentGame?.type === 'Racing'
            ? 'Creating cars and tracks…'
            : 'Creating characters…'
    ];

    editorState.chatMessages = [];
    editorState.isBuilding = true;
    editorState.isBuilt = false;

    updateEditorControlsUI();
    updateChatUI();
    renderPreview();

    for (const step of steps) {
        editorState.chatMessages.push({ type: 'system', text: step });
        updateChatUI();
        await delay(700 + Math.random() * 400);
    }

    editorState.chatMessages.pop();
    editorState.chatMessages.push({
        type: 'system',
        text: 'Your game is ready! You can ask me to make changes.'
    });

    editorState.isBuilding = false;
    editorState.isBuilt = true;

    updateEditorControlsUI();
    updateChatUI();
    renderPreview();
}

function renderEditorScreen(params) {
    const gameId = params.gameId;

    if (!gameId) {
        navigateTo('home');
        return '<div>Redirecting...</div>';
    }

    const allGames = [...fakeGames, ...appState.createdGames];
    const game = allGames.find(g => g.id === gameId);

    if (!game) {
        navigateTo('home');
        return '<div>Game not found. Redirecting...</div>';
    }

    // 🔁 RESET editor state when entering with a new game
    if (editorState.lastGameId !== gameId) {
        editorState.lastGameId = gameId;
        editorState.currentGame = game;
        editorState.chatMessages = [];
        editorState.isBuilding = false;
        editorState.isBuilt = false;
    } else {
        editorState.currentGame = game;
    }

    const chatMessagesHtml = editorState.chatMessages.map(msg => `
        <div class="chat-message ${msg.type === 'system' ? 'system-message' : 'user-message'} mb-4">
            <div class="text-sm ${msg.type === 'system' ? 'text-gray-600' : 'text-gray-900'}">${msg.text}</div>
        </div>
    `).join('');

    return `
        <!-- Top Bar -->
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                <h1 class="text-xl font-semibold text-gray-900">Playstre</h1>
                <button 
                    id="publish-btn"
                    class="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium transition-colors hover:bg-blue-600"
                >
                    Publish
                </button>
            </div>
        </div>

        <div class="flex h-[calc(100vh-73px)] bg-gray-50">
            <!-- Left Panel -->
            <div class="w-96 bg-white border-r border-gray-200 flex flex-col">
                <div class="flex-1 overflow-y-auto p-6" id="chat-messages">
                    ${chatMessagesHtml}
                </div>
                <div class="border-t border-gray-200 p-4">
                    <form id="chat-form" class="flex gap-2">
                        <input 
                            type="text"
                            id="chat-input"
                            placeholder="Ask me to change something..."
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <!-- Right Panel -->
            <div class="flex-1 bg-gray-100 flex items-center justify-center p-8" id="game-preview">
                ${renderGamePreview()}
            </div>

            <!-- Publish Modal -->
            <div id="publish-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900">Your game is live 🎉</h2>
                    <p class="text-sm text-gray-600">
                        Your game has been saved. Share it or head back to your dashboard.
                    </p>

                    <div class="flex items-center gap-2">
                        <input
                            id="share-link-input"
                            type="text"
                            readonly
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50"
                        />
                        <button
                            id="copy-link-btn"
                            class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
                        >
                            Copy
                        </button>
                    </div>

                    <button
                        id="return-dashboard-btn"
                        class="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                        Save & Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderGamePreview() {
    if (editorState.isBuilding) {
        return `
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
                <div class="text-6xl mb-4">🛠️</div>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">Building your game</h2>
                <p class="text-gray-600">This may take a moment…</p>
            </div>
        `;
    }

    if (editorState.currentGame) {
        return `
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
                <div class="text-center mb-6">
                    <div class="text-7xl mb-4">${editorState.currentGame.emoji}</div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">
                        ${editorState.currentGame.title}
                    </h2>
                    <p class="text-gray-600">
                        ${editorState.currentGame.type} • ${editorState.currentGame.subtype} • ${editorState.currentGame.theme}
                    </p>
                </div>
                <div class="bg-gray-100 rounded-lg p-8 text-center">
                    <div class="text-4xl mb-4">🎮</div>
                    <p class="text-gray-600">Game Preview</p>
                    <p class="text-sm text-gray-500 mt-2">
                        This is where your playable game would appear
                    </p>
                </div>
            </div>
        `;
    }

    return '';
}

function renderPreview() {
    const preview = document.getElementById('game-preview');
    if (preview) {
        preview.innerHTML = renderGamePreview();
    }
}

function initEditorScreen() {
    document.getElementById('chat-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            handleChatMessage(message);
            input.value = '';
        }
    });

    document.getElementById('publish-btn')?.addEventListener('click', handlePublish);
    document.getElementById('copy-link-btn')?.addEventListener('click', copyShareLink);
    document.getElementById('return-dashboard-btn')?.addEventListener('click', finalizePublish);

    updateEditorControlsUI();

    if (!editorState.isBuilt && !editorState.isBuilding) {
        runInitialBuildSequence();
    }
}

function handleChatMessage(message) {
    editorState.chatMessages.push({ type: 'user', text: message });
    editorState.chatMessages.push({ type: 'system', text: '...' });

    editorState.isBuilding = true;
    updateEditorControlsUI();
    updateChatUI();

    setTimeout(() => {
        editorState.chatMessages.pop();
        editorState.chatMessages.push({
            type: 'system',
            text: getRandomResponse()
        });

        editorState.isBuilding = false;
        updateEditorControlsUI();
        updateChatUI();
    }, 1200 + Math.random() * 800);
}

function updateEditorControlsUI() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.querySelector('#chat-form button[type="submit"]');
    const publishBtn = document.getElementById('publish-btn');

    const isBuilding = editorState.isBuilding;

    if (input) {
        input.disabled = isBuilding;
        input.placeholder = isBuilding
            ? 'Building your game…'
            : 'Ask me to change something...';

        input.classList.toggle('bg-gray-100', isBuilding);
        input.classList.toggle('cursor-not-allowed', isBuilding);
        input.classList.toggle('opacity-60', isBuilding);
    }

    if (sendBtn) {
        sendBtn.disabled = isBuilding;
        sendBtn.classList.toggle('opacity-50', isBuilding);
        sendBtn.classList.toggle('cursor-not-allowed', isBuilding);
    }

    if (publishBtn) {
        publishBtn.disabled = isBuilding;
        publishBtn.classList.toggle('opacity-50', isBuilding);
        publishBtn.classList.toggle('cursor-not-allowed', isBuilding);
    }
}

function updateChatUI() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;

    chatContainer.innerHTML = editorState.chatMessages.map(msg => `
        <div class="chat-message ${msg.type === 'system' ? 'system-message' : 'user-message'} mb-4">
            <div class="text-sm ${msg.type === 'system' ? 'text-gray-600' : 'text-gray-900'}">${msg.text}</div>
        </div>
    `).join('');

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handlePublish() {
    if (!editorState.currentGame) {
        navigateTo('home');
        return;
    }

    const existingIndex = appState.createdGames.findIndex(
        g => g.id === editorState.currentGame.id
    );

    if (existingIndex >= 0) {
        appState.createdGames[existingIndex] = editorState.currentGame;
    } else {
        appState.createdGames.push(editorState.currentGame);
    }

    localStorage.setItem('playstre_games', JSON.stringify(appState.createdGames));

    const shareUrl = `${window.location.origin}/play/${editorState.currentGame.id}`;
    const linkInput = document.getElementById('share-link-input');
    if (linkInput) linkInput.value = shareUrl;

    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function copyShareLink() {
    const input = document.getElementById('share-link-input');
    if (!input) return;
    input.select();
    navigator.clipboard.writeText(input.value);
}

function finalizePublish() {
    editorState.chatMessages = [];
    editorState.isBuilt = false;
    editorState.isBuilding = false;

    const modal = document.getElementById('publish-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    navigateTo('home');
}
