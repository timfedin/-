
const loadingScreen = document.getElementById('loadingScreen');
const progressBar = document.getElementById('progressBar');
const gameWrapper = document.getElementById('gameWrapper');
const mainContent = document.getElementById('mainContent');
const mainLogo = document.getElementById('mainLogo');
const spinButton = document.getElementById('spinButton');
const wheelImage = document.getElementById('wheelImage');
const wheelContainer = document.getElementById('wheel');
const winScreen = document.getElementById('winScreen');
const congratulationsText = document.getElementById('congratulationsText');
const winMessage = document.getElementById('winMessage');
const claimBonusButton = document.getElementById('claimBonusButton');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');
const wheelPointerImage = document.querySelector('.wheel-pointer-image');

const explosionContainer = document.getElementById('explosionContainer');
const explosionGif = document.querySelector('.explosion-gif');
const effectLight = document.getElementById('effectLight');

const character1 = document.getElementById('character1');
const character2 = document.getElementById('character2');
const character3 = document.getElementById('character3');

const wheelAround = document.getElementById('wheelAround');


const prizeSectors = [
    { name: '50 ФРИ СПИНОВ', angle: 22.5 }, // 360 / 8 = 45. Центр первого сектора: 45 / 2 = 22.5
    { name: '100% БОНУС НА ДЕПОЗИТ', angle: 67.5 }, // 22.5 + 45 = 67.5
    { name: '150 БЕСПЛАТНЫХ ВРАЩЕНИЙ', angle: 112.5 }, // 67.5 + 45 = 112.5
    { name: '50 БЕСПЛАТНЫХ ВРАЩЕНИЙ', angle: 157.5 },
    { name: 'VIP СТАТУС', angle: 202.5 },
    { name: '300% БОНУС', angle: 247.5 },
    { name: 'СЕКРЕТНЫЙ ПРИЗ', angle: 292.5 },
    { name: '5 ФРИ СПИНОВ', angle: 337.5 }
];

let isSpinning = false;

document.addEventListener('DOMContentLoaded', () => {
const imagesToLoad = [
mainLogo.src,
spinButton.src,
wheelImage.src,
claimBonusButton.src,
wheelPointerImage.src,
explosionGif.src,
effectLight.src,
character1.src,
character2.src,
character3.src,
wheelAround.src // НОВАЯ СТРОКА: Предзагрузка обвода колеса
].filter(Boolean);

const soundsToLoad = [
spinSound.src,
winSound.src
].filter(Boolean);

let loadedCount = 0;
const totalAssets = imagesToLoad.length + soundsToLoad.length;

if (totalAssets === 0) {
setTimeout(() => {
loadingScreen.classList.add('hidden');
gameWrapper.classList.remove('hidden');
mainContent.classList.remove('hidden');
}, 500);
return;
}

function assetLoaded() {
loadedCount++;
const progress = (loadedCount / totalAssets) * 100;
progressBar.style.width = progress + '%';

if (loadedCount === totalAssets) {
setTimeout(() => {
loadingScreen.classList.add('hidden');
gameWrapper.classList.remove('hidden');
mainContent.classList.remove('hidden');
}, 2000);
}
}

imagesToLoad.forEach(src => {
const img = new Image();
img.onload = assetLoaded;
img.onerror = assetLoaded;
img.src = src;
});

soundsToLoad.forEach(src => {
const audio = new Audio();
audio.oncanplaythrough = assetLoaded;
audio.onerror = assetLoaded;
audio.src = src;
audio.load();
});
});

spinButton.addEventListener('click', () => {
if (isSpinning) {
return;
}
isSpinning = true;
spinButton.classList.add('no-animation');
spinButton.style.cursor = 'default';

wheelContainer.classList.add('no-animation');

spinSound.currentTime = 0;
spinSound.play().catch(e => console.error("Ошибка при воспроизведении звука вращения:", e));

const winningPrizeIndex = Math.floor(Math.random() * 2) + 2;
const winningPrize = prizeSectors[winningPrizeIndex];

const randomOffset = Math.random() * 40;
const totalRotations = 5;
const finalAngle = (totalRotations * 360) + (360 - winningPrize.angle + randomOffset);

wheelImage.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
wheelImage.style.transform = `rotate(-${finalAngle}deg)`;

setTimeout(() => {
spinSound.pause();
spinSound.currentTime = 0;

winSound.currentTime = 0;
winSound.play().catch(e => console.error("Ошибка при воспроизведении звука победы:", e));

const delayToShowWinScreen = 0;

setTimeout(() => {
isSpinning = false;
spinButton.classList.remove('no-animation');
spinButton.style.cursor = 'pointer';

mainContent.classList.add('hidden');
winScreen.classList.remove('hidden');
winMessage.textContent = `ВЫ ВЫИГРАЛИ ${winningPrize.name}!`;

congratulationsText.classList.remove('no-animation');
claimBonusButton.classList.remove('no-animation');

explosionContainer.classList.remove('hidden');
explosionGif.classList.add('show');

setTimeout(() => {
explosionGif.classList.remove('show');
explosionContainer.classList.add('hidden');
}, 5000);

wheelImage.style.transition = 'none';
wheelImage.style.transform = `rotate(${finalAngle % 360}deg)`;
wheelContainer.classList.remove('no-animation');
}, delayToShowWinScreen);
}, 5500);
});


claimBonusButton.addEventListener('click', () => {
winSound.pause();
winSound.currentTime = 0;
window.location.href = 'https://your.affiliate.link/bonus';
console.log('Кнопка "Забрать бонус" нажата. Перенаправление...');
});