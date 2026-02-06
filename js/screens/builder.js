// Builder screen (Game Creation Flow)

function renderBuilderScreen(params) {
    // Reset state when entering builder
    appState.gameState = { type: null, subtype: null, theme: null, players: null };
    appState.currentStep = 1;
    
    return `
        <!-- Progress Indicator -->
        <div class="px-4 pt-4 mb-4">
            <div class="flex justify-center items-center space-x-1.5">
                <div id="step-indicator-1" class="w-2.5 h-2.5 rounded-full bg-blue-500 transition-all duration-300"></div>
                <div class="w-8 h-0.5 bg-gray-300 rounded"></div>
                <div id="step-indicator-2" class="w-2.5 h-2.5 rounded-full bg-gray-300 transition-all duration-300"></div>
                <div class="w-8 h-0.5 bg-gray-300 rounded"></div>
                <div id="step-indicator-3" class="w-2.5 h-2.5 rounded-full bg-gray-300 transition-all duration-300"></div>
                <div class="w-8 h-0.5 bg-gray-300 rounded"></div>
                <div id="step-indicator-4" class="w-2.5 h-2.5 rounded-full bg-gray-300 transition-all duration-300"></div>
            </div>
        </div>

        <!-- Step Container -->
        <div id="step-container" class="px-4 pb-24">
            <!-- Step 1: Game Type -->
            <div id="step-1" class="step-content">
                <h2 class="text-2xl font-semibold text-gray-800 mb-5 text-center">Choose Your Game Type</h2>
                <div class="space-y-4">
                    <div class="game-type-card card" data-type="racing">
                        <div class="text-5xl mb-3 text-center">🏎️</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Racing</h3>
                        <p class="text-gray-600 text-center text-sm">Speed, competition, and victory</p>
                    </div>
                    <div class="game-type-card card" data-type="shooting">
                        <div class="text-5xl mb-3 text-center">🔫</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Shooting</h3>
                        <p class="text-gray-600 text-center text-sm">Action-packed battles</p>
                    </div>
                    <div class="game-type-card card" data-type="cards">
                        <div class="text-5xl mb-3 text-center">🃏</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Cards</h3>
                        <p class="text-gray-600 text-center text-sm">Strategic card games</p>
                    </div>
                </div>
            </div>

            <!-- Step 2: Subtype -->
            <div id="step-2" class="step-content hidden">
                <h2 class="text-2xl font-semibold text-gray-800 mb-5 text-center">Choose Subtype</h2>
                <div class="space-y-4">
                    <div class="subtype-card card" data-subtype="arcade">
                        <div class="text-4xl mb-3 text-center">🎮</div>
                        <h3 class="text-lg font-semibold mb-1 text-center">Arcade</h3>
                        <p class="text-gray-600 text-center text-sm">Fast-paced, pick-up-and-play</p>
                    </div>
                    <div class="subtype-card card" data-subtype="simulator">
                        <div class="text-4xl mb-3 text-center">🏁</div>
                        <h3 class="text-lg font-semibold mb-1 text-center">Simulator</h3>
                        <p class="text-gray-600 text-center text-sm">Realistic physics and controls</p>
                    </div>
                    <div class="subtype-card card" data-subtype="open-world">
                        <div class="text-4xl mb-3 text-center">🌍</div>
                        <h3 class="text-lg font-semibold mb-1 text-center">Open World</h3>
                        <p class="text-gray-600 text-center text-sm">Explore vast environments</p>
                    </div>
                    <div class="subtype-card card" data-subtype="nascar">
                        <div class="text-4xl mb-3 text-center">🏁</div>
                        <h3 class="text-lg font-semibold mb-1 text-center">Nascar</h3>
                        <p class="text-gray-600 text-center text-sm">Oval track racing</p>
                    </div>
                </div>
            </div>

            <!-- Step 3: Theme -->
            <div id="step-3" class="step-content hidden">
                <h2 class="text-2xl font-semibold text-gray-800 mb-5 text-center">Choose Theme</h2>
                <div class="space-y-4">
                    <div class="theme-card card" data-theme="jungle">
                        <div class="text-5xl mb-3 text-center">🌴</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Jungle</h3>
                        <p class="text-gray-600 text-center text-sm">Tropical adventure</p>
                    </div>
                    <div class="theme-card card" data-theme="sci-fi">
                        <div class="text-5xl mb-3 text-center">🚀</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Sci-Fi</h3>
                        <p class="text-gray-600 text-center text-sm">Futuristic worlds</p>
                    </div>
                    <div class="theme-card card" data-theme="realistic">
                        <div class="text-5xl mb-3 text-center">🏙️</div>
                        <h3 class="text-xl font-semibold mb-1 text-center">Realistic</h3>
                        <p class="text-gray-600 text-center text-sm">Real-world settings</p>
                    </div>
                </div>
            </div>

            <!-- Step 4: Players -->
            <div id="step-4" class="step-content hidden">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">How Many Players?</h2>
                <div class="flex justify-center items-center space-x-4 mb-6">
                    <div class="player-slot cursor-pointer" data-players="1">
                        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 border-4 border-transparent transition-all duration-300">1</div>
                    </div>
                    <div class="player-slot cursor-pointer" data-players="2">
                        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 border-4 border-transparent transition-all duration-300">2</div>
                    </div>
                    <div class="player-slot cursor-pointer" data-players="3">
                        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 border-4 border-transparent transition-all duration-300">3</div>
                    </div>
                    <div class="player-slot cursor-pointer" data-players="4">
                        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 border-4 border-transparent transition-all duration-300">4</div>
                    </div>
                </div>
                <p class="text-center text-gray-600 text-sm" id="player-count-text">Select number of players</p>
            </div>

            <!-- Build Loading State -->
            <div id="build-loading" class="step-content hidden">
                <div class="text-center pt-8">
                    <div class="text-6xl mb-5 pulse-animation">⚡</div>
                    <h2 class="text-2xl font-semibold text-gray-800 mb-3">Building Your Game...</h2>
                    <p class="text-gray-600 mb-6 text-sm">Our AI is crafting the perfect experience</p>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div id="progress-bar" class="bg-blue-500 h-full rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <p id="build-status" class="text-xs text-gray-500 mt-3">Initializing...</p>
                </div>
            </div>

            <!-- Game Ready State -->
            <div id="game-ready" class="step-content hidden">
                <div class="text-center mb-6">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-3">Your Game is Ready!</h2>
                </div>
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-5">Game Summary</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 font-medium text-sm">Type:</span>
                            <span class="text-gray-900 font-semibold" id="summary-type">-</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 font-medium text-sm">Subtype:</span>
                            <span class="text-gray-900 font-semibold" id="summary-subtype">-</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 font-medium text-sm">Theme:</span>
                            <span class="text-gray-900 font-semibold" id="summary-theme">-</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 font-medium text-sm">Players:</span>
                            <span class="text-gray-900 font-semibold" id="summary-players">-</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-3">
                    <button id="play-btn" class="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-base active:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95">
                        🎮 Play Now
                    </button>
                    <button id="invite-btn" class="w-full px-6 py-4 bg-green-500 text-white rounded-xl font-semibold text-base active:bg-green-600 transition-all duration-300 shadow-lg active:scale-95">
                        👥 Invite Friends
                    </button>
                </div>
            </div>
        </div>

        <!-- Create Navigation Buttons -->
        <div id="create-nav-buttons" class="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-inset-bottom">
            <div class="flex items-center justify-between gap-3 mx-auto" style="max-width: 420px;">
                <button id="back-btn" class="px-5 py-3 mb-5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-base active:bg-gray-200 transition-all duration-300 hidden flex-shrink-0">
                    ← Back
                </button>
                <button id="next-btn" class="flex-1 px-5 py-3 mb-5 bg-blue-500 text-white rounded-xl font-semibold text-base active:bg-blue-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:bg-blue-500">
                    Next →
                </button>
            </div>
        </div>
    `;
}

function initBuilderScreen() {
    // Reset UI
    document.querySelectorAll('.step-content').forEach(step => step.classList.add('hidden'));
    const step1 = document.getElementById('step-1');
    if (step1) step1.classList.remove('hidden');
    
    const navButtons = document.getElementById('create-nav-buttons');
    if (navButtons) navButtons.style.display = 'block';
    
    // Reset selections
    document.querySelectorAll('.game-type-card, .subtype-card, .theme-card').forEach(card => {
        card.classList.remove('ring-4', 'ring-blue-500', 'bg-blue-50');
        card.classList.add('bg-white');
    });
    
    document.querySelectorAll('.player-slot').forEach(slot => {
        const circle = slot.querySelector('div');
        circle.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
        circle.classList.add('bg-gray-200', 'text-gray-400', 'border-transparent');
    });
    
    updateProgressIndicator();
    updateNavigationButtons();
    
    // Event listeners
    document.querySelectorAll('.game-type-card').forEach(card => {
        card.addEventListener('click', () => selectGameType(card));
    });
    document.querySelectorAll('.subtype-card').forEach(card => {
        card.addEventListener('click', () => selectSubtype(card));
    });
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => selectTheme(card));
    });
    document.querySelectorAll('.player-slot').forEach(slot => {
        slot.addEventListener('click', () => selectPlayers(slot));
    });
    
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    if (nextBtn) nextBtn.addEventListener('click', goToNextStep);
    if (backBtn) backBtn.addEventListener('click', goToPreviousStep);
    
    const playBtn = document.getElementById('play-btn');
    const inviteBtn = document.getElementById('invite-btn');
    if (playBtn) playBtn.addEventListener('click', handlePlayGame);
    if (inviteBtn) inviteBtn.addEventListener('click', handleInviteFriends);
    
    // Auto-select arcade
    setTimeout(() => {
        if (appState.currentStep === 1) {
            // Will auto-select when step 2 is shown
        }
    }, 100);
}

function selectGameType(card) {
    document.querySelectorAll('.game-type-card').forEach(c => {
        c.classList.remove('ring-4', 'ring-blue-500', 'bg-blue-50');
        c.classList.add('bg-white');
    });
    card.classList.add('ring-4', 'ring-blue-500', 'bg-blue-50');
    card.classList.remove('bg-white');
    appState.gameState.type = card.dataset.type;
    updateNextButton();
}

function selectSubtype(card) {
    document.querySelectorAll('.subtype-card').forEach(c => {
        c.classList.remove('ring-4', 'ring-blue-500', 'bg-blue-50');
        c.classList.add('bg-white');
    });
    card.classList.add('ring-4', 'ring-blue-500', 'bg-blue-50');
    card.classList.remove('bg-white');
    appState.gameState.subtype = card.dataset.subtype;
    updateNextButton();
}

function selectTheme(card) {
    document.querySelectorAll('.theme-card').forEach(c => {
        c.classList.remove('ring-4', 'ring-blue-500', 'bg-blue-50');
        c.classList.add('bg-white');
    });
    card.classList.add('ring-4', 'ring-blue-500', 'bg-blue-50');
    card.classList.remove('bg-white');
    appState.gameState.theme = card.dataset.theme;
    updateNextButton();
}

function selectPlayers(slot) {
    const playerCount = parseInt(slot.dataset.players);
    document.querySelectorAll('.player-slot').forEach(s => {
        const circle = s.querySelector('div');
        circle.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
        circle.classList.add('bg-gray-200', 'text-gray-400', 'border-transparent');
    });
    const selectedCircle = slot.querySelector('div');
    selectedCircle.classList.remove('bg-gray-200', 'text-gray-400', 'border-transparent');
    selectedCircle.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
    appState.gameState.players = playerCount;
    const playerCountText = document.getElementById('player-count-text');
    if (playerCountText) {
        playerCountText.textContent = `${playerCount} ${playerCount === 1 ? 'Player' : 'Players'} Selected`;
    }
    updateNextButton();
}

function goToNextStep() {
    if (!validateCurrentStep()) return;
    
    if (appState.currentStep < totalSteps) {
        appState.currentStep++;
        showStep(appState.currentStep);
        updateProgressIndicator();
        updateNavigationButtons();
        if (appState.currentStep === 2 && !appState.gameState.subtype) {
            setTimeout(() => {
                const arcadeCard = document.querySelector('.subtype-card[data-subtype="arcade"]');
                if (arcadeCard) selectSubtype(arcadeCard);
            }, 100);
        }
    } else if (appState.currentStep === totalSteps) {
        startBuildProcess();
    }
}

function goToPreviousStep() {
    if (appState.currentStep > 1) {
        appState.currentStep--;
        showStep(appState.currentStep);
        updateProgressIndicator();
        updateNavigationButtons();
    }
}

function showStep(stepNumber) {
    document.querySelectorAll('.step-content').forEach(step => step.classList.add('hidden'));
    const stepElement = document.getElementById(`step-${stepNumber}`);
    if (stepElement) {
        stepElement.classList.remove('hidden');
        stepElement.classList.add('slide-in');
    }
}

function updateProgressIndicator() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        if (indicator) {
            if (i <= appState.currentStep) {
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-blue-500');
            } else {
                indicator.classList.remove('bg-blue-500');
                indicator.classList.add('bg-gray-300');
            }
        }
    }
}

function updateNavigationButtons() {
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (backBtn) {
        if (appState.currentStep === 1) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
    }
    updateNextButton();
}

function updateNextButton() {
    const nextBtn = document.getElementById('next-btn');
    if (!nextBtn) return;
    
    nextBtn.textContent = appState.currentStep === totalSteps ? 'Build Game →' : 'Next →';
    nextBtn.disabled = !validateCurrentStep();
    if (nextBtn.disabled) {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function validateCurrentStep() {
    switch (appState.currentStep) {
        case 1: return appState.gameState.type !== null;
        case 2: return appState.gameState.subtype !== null;
        case 3: return appState.gameState.theme !== null;
        case 4: return appState.gameState.players !== null;
        default: return true;
    }
}

function startBuildProcess() {
    const navButtons = document.getElementById('create-nav-buttons');
    if (navButtons) navButtons.style.display = 'none';
    
    document.querySelectorAll('.step-content').forEach(step => step.classList.add('hidden'));
    const loadingStep = document.getElementById('build-loading');
    if (loadingStep) loadingStep.classList.remove('hidden');
    
    const progressBar = document.getElementById('progress-bar');
    const buildStatus = document.getElementById('build-status');
    const statusMessages = [
        { progress: 20, message: 'Analyzing game mechanics...' },
        { progress: 40, message: 'Generating assets...' },
        { progress: 60, message: 'Creating physics engine...' },
        { progress: 80, message: 'Optimizing performance...' },
        { progress: 100, message: 'Finalizing game...' }
    ];
    
    let currentStatusIndex = 0;
    const updateProgress = () => {
        if (currentStatusIndex < statusMessages.length) {
            const status = statusMessages[currentStatusIndex];
            if (progressBar) progressBar.style.width = `${status.progress}%`;
            if (buildStatus) buildStatus.textContent = status.message;
            currentStatusIndex++;
            if (currentStatusIndex < statusMessages.length) {
                setTimeout(updateProgress, 800);
            } else {
                setTimeout(showGameReady, 500);
            }
        }
    };
    updateProgress();
}

function showGameReady() {
    const loadingStep = document.getElementById('build-loading');
    if (loadingStep) loadingStep.classList.add('hidden');
    
    const gameReady = document.getElementById('game-ready');
    if (gameReady) {
        gameReady.classList.remove('hidden');
        
        const summaryType = document.getElementById('summary-type');
        const summarySubtype = document.getElementById('summary-subtype');
        const summaryTheme = document.getElementById('summary-theme');
        const summaryPlayers = document.getElementById('summary-players');
        
        if (summaryType) {
            summaryType.textContent = appState.gameState.type.charAt(0).toUpperCase() + appState.gameState.type.slice(1);
        }
        if (summarySubtype) {
            summarySubtype.textContent = appState.gameState.subtype.charAt(0).toUpperCase() + appState.gameState.subtype.slice(1);
        }
        if (summaryTheme) {
            summaryTheme.textContent = appState.gameState.theme.charAt(0).toUpperCase() + appState.gameState.theme.slice(1);
        }
        if (summaryPlayers) {
            summaryPlayers.textContent = `${appState.gameState.players} ${appState.gameState.players === 1 ? 'Player' : 'Players'}`;
        }
    }
}

function handlePlayGame() {
    saveCreatedGame();
    alert('🎮 Game would launch here! This is a prototype.');
    navigateTo('home');
}

function handleInviteFriends() {
    saveCreatedGame();
    alert('👥 Invite friends feature would open here! This is a prototype.');
    navigateTo('home');
}

function saveCreatedGame() {
    const game = {
        id: `game_${Date.now()}`,
        title: generateGameTitle(),
        type: appState.gameState.type.charAt(0).toUpperCase() + appState.gameState.type.slice(1),
        subtype: appState.gameState.subtype.charAt(0).toUpperCase() + appState.gameState.subtype.slice(1),
        theme: appState.gameState.theme.charAt(0).toUpperCase() + appState.gameState.theme.slice(1),
        players: appState.gameState.players,
        creator: appState.currentUser.username,
        plays: 0,
        likes: 0,
        emoji: getEmojiForType(appState.gameState.type),
        createdAt: new Date().toISOString()
    };
    
    appState.createdGames.push(game);
    localStorage.setItem('playstre_games', JSON.stringify(appState.createdGames));
}
