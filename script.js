// Screen Management
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    switchScreen('landing');
}

// ===== NUMBER GAME =====
function startNumberGame() {
    switchScreen('numberGame');
    document.getElementById('numberGame').querySelector('.thinking-phase').classList.remove('hidden');
    document.getElementById('numberReveal').classList.add('hidden');
    document.getElementById('numberExplain').classList.add('hidden');
}

function revealNumberGuess() {
    document.querySelector('#numberGame .thinking-phase').classList.add('hidden');
    document.getElementById('numberReveal').classList.remove('hidden');
    
    // Psychology trick: 7 is the most commonly chosen number between 1-10
    // Second most common: 3, 8, 5
    const weights = { 7: 50, 3: 20, 8: 15, 5: 10, 4: 3, 6: 1, 2: 0.5, 1: 0.3, 9: 0.2, 10: 0 };
    const guess = weightedRandomChoice(weights);
    
    setTimeout(() => {
        document.getElementById('numberGuess').textContent = guess;
    }, 2000);
}

function weightedRandomChoice(weights) {
    const entries = Object.entries(weights);
    const totalWeight = entries.reduce((sum, [_, weight]) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let [value, weight] of entries) {
        random -= weight;
        if (random <= 0) return value;
    }
    return entries[0][0];
}

function numberReaction() {
    document.getElementById('numberReveal').classList.add('hidden');
    document.getElementById('numberExplain').classList.remove('hidden');
    document.getElementById('explainText').innerHTML = `
        <strong>The Secret:</strong> In psychological studies, when people think of a random number between 1-10, they overwhelmingly choose 7. 
        It's considered the most "random" number! The number 3 is second most common, followed by 8. Your brain naturally avoids extremes 
        and gravitates toward numbers in the middle-upper range. I simply predicted the most likely choice! 🧠
    `;
}

function numberMissed() {
    document.getElementById('numberReveal').classList.add('hidden');
    document.getElementById('numberExplain').classList.remove('hidden');
    document.getElementById('explainText').innerHTML = `
        <strong>Hmm, interesting!</strong> Well, about 50% of people DO choose 7, but you're in the other 50%. 
        The point is: your mind is more predictable than you think! Try again with a friend and watch them get surprised. 😉
    `;
}

// ===== COLOR GAME =====
function startColorGame() {
    switchScreen('colorGame');
    document.getElementById('colorGame').querySelector('.thinking-phase').classList.remove('hidden');
    document.getElementById('colorReveal').classList.add('hidden');
    document.getElementById('colorExplain').classList.add('hidden');
}

function revealColorGuess() {
    // Add tracking to see if user hovers or focuses on any color
    const colorOptions = document.querySelectorAll('.color-option');
    let userHovered = null;
    
    colorOptions.forEach((option, index) => {
        option.addEventListener('mouseenter', () => {
            userHovered = index;
        }, { once: true });
    });

    document.querySelector('#colorGame .thinking-phase').classList.add('hidden');
    document.getElementById('colorReveal').classList.remove('hidden');
    
    // Psychology trick: 
    // - Blue is most commonly chosen overall
    // - Red is second
    // - Green third
    // But we'll also try to detect if they hovered
    const guess = predictColor(userHovered);
    
    setTimeout(() => {
        const colorNames = { 0: '🔴 Red', 1: '🔵 Blue', 2: '💚 Green' };
        document.getElementById('colorGuess').textContent = colorNames[guess];
    }, 2000);
}

function predictColor(hoveredIndex) {
    // If they hovered, there's a 70% chance they were thinking of that one
    if (hoveredIndex !== null && Math.random() < 0.7) {
        return hoveredIndex;
    }
    
    // Otherwise, use statistical preference
    // Blue: 50%, Red: 30%, Green: 20%
    const weights = { 1: 50, 0: 30, 2: 20 };
    return weightedRandomChoice(weights);
}

function colorReaction() {
    document.getElementById('colorReveal').classList.add('hidden');
    document.getElementById('colorExplain').classList.remove('hidden');
    document.getElementById('colorExplainText').innerHTML = `
        <strong>The Secret:</strong> Studies show that blue is chosen 50% of the time, red 30%, and green 20%. 
        Additionally, I was subtly watching your mouse movements—people often hover over their choice before clicking, 
        or their eye gaze betrays them. Your unconscious mind leaks information! 👀
    `;
}

function colorMissed() {
    document.getElementById('colorReveal').classList.add('hidden');
    document.getElementById('colorExplain').classList.remove('hidden');
    document.getElementById('colorExplainText').innerHTML = `
        <strong>Plot twist:</strong> You're one of the rare humans! Most people follow predictable patterns, 
        but some brave souls choose outside the norm. Still, I was reading something... just not that color! 
        The principle still works—humans are creatures of habit. 🎭
    `;
}

// ===== SHAPE GAME =====
function startShapeGame() {
    switchScreen('shapeGame');
    document.getElementById('shapeGame').querySelector('.thinking-phase').classList.remove('hidden');
    document.getElementById('shapeReveal').classList.add('hidden');
    document.getElementById('shapeExplain').classList.add('hidden');
}

function revealShapeGuess() {
    document.querySelector('#shapeGame .thinking-phase').classList.add('hidden');
    document.getElementById('shapeReveal').classList.remove('hidden');
    
    // Psychology trick: Circle is most commonly chosen (60%), Triangle (25%), Square (15%)
    // Circles feel safer and more "natural"
    const weights = { 0: 60, 1: 25, 2: 15 };
    const guess = weightedRandomChoice(weights);
    
    setTimeout(() => {
        const shapeNames = { 0: '⭕ Circle', 1: '🔺 Triangle', 2: '⬜ Square' };
        document.getElementById('shapeGuess').textContent = shapeNames[guess];
    }, 2000);
}

function shapeReaction() {
    document.getElementById('shapeReveal').classList.add('hidden');
    document.getElementById('shapeExplain').classList.remove('hidden');
    document.getElementById('shapeExplainText').innerHTML = `
        <strong>The Secret:</strong> In psychological tests, circles are chosen 60% of the time because they feel 
        "natural" and "safe." Triangles (25%) and squares (15%) are less intuitive. Circles have no sharp edges—
        humans subconsciously prefer them. Your primitive brain chose for you! 🧬
    `;
}

function shapeMissed() {
    document.getElementById('shapeReveal').classList.add('hidden');
    document.getElementById('shapeExplain').classList.remove('hidden');
    document.getElementById('shapeExplainText').innerHTML = `
        <strong>Interesting deviation!</strong> You went against the statistical grain. However, even your "random" 
        choice isn't truly random—it's influenced by your personality, culture, and recent experiences. 
        Free will is an illusion, and you just proved it! 😈
    `;
}

// ===== ANIMAL GAME =====
function startAnimalGame() {
    switchScreen('animalGame');
    document.getElementById('animalGame').querySelector('.thinking-phase').classList.remove('hidden');
    document.getElementById('animalReveal').classList.add('hidden');
    document.getElementById('animalExplain').classList.add('hidden');
}

function revealAnimalGuess() {
    document.querySelector('#animalGame .thinking-phase').classList.add('hidden');
    document.getElementById('animalReveal').classList.remove('hidden');
    
    // Psychology trick: Elephant is the #1 most thought-of animal in studies
    // Followed by: Dog, Cat, Lion, Tiger, Bear, Monkey
    const animals = [
        { name: '🐘 Elephant', weight: 40 },
        { name: '🐕 Dog', weight: 20 },
        { name: '🐈 Cat', weight: 15 },
        { name: '🦁 Lion', weight: 10 },
        { name: '🐯 Tiger', weight: 8 },
        { name: '🐻 Bear', weight: 5 },
        { name: '🐵 Monkey', weight: 2 }
    ];
    
    const weights = {};
    animals.forEach((animal, idx) => {
        weights[idx] = animal.weight;
    });
    
    const guessIdx = weightedRandomChoice(weights);
    const guess = animals[guessIdx].name;
    
    setTimeout(() => {
        document.getElementById('animalGuess').textContent = guess;
    }, 2500);
}

function animalReaction() {
    document.getElementById('animalReveal').classList.add('hidden');
    document.getElementById('animalExplain').classList.remove('hidden');
    document.getElementById('animalExplainText').innerHTML = `
        <strong>The Secret:</strong> In a famous psychology experiment, when asked to "think of an animal," 
        40% of people choose an elephant! This is because elephants are iconic, memorable, and easy to visualize. 
        Dogs and cats follow. Your brain didn't choose randomly—it chose what was easiest to imagine. 
        The lazy mind always takes the path of least resistance! 🧠✨
    `;
}

function animalMissed() {
    document.getElementById('animalReveal').classList.add('hidden');
    document.getElementById('animalExplain').classList.remove('hidden');
    document.getElementById('animalExplainText').innerHTML = `
        <strong>You're a rebel!</strong> While most people predictably choose elephants or dogs, 
        you went off the beaten path. That's either genuinely random, or it says something about your personality. 
        The beauty of psychology is that even the exceptions follow patterns. You just proved the rule by breaking it! 🎭🔮
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧠 Mind Reader loaded. Your secrets are not safe...');
});
