const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 1);

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector('.segment-display');
  const segmentDisplayTop = segmentDisplay.querySelector('.segment-display__top');
  const segmentDisplayBottom = segmentDisplay.querySelector('.segment-display__bottom');

  const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
  const segmentOverlayTop = segmentOverlay.querySelector('.segment-overlay__top');
  const segmentOverlayBottom= segmentOverlay.querySelector('.segment-overlay__bottom');

  return {
    segmentDisplay,
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  }
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if(parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(segmentElements.segmentDisplayTop, segmentElements.segmentOverlayBottom, timeValue);

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');

    updateSegmentValues(segmentElements.segmentDisplayBottom, segmentElements.segmentOverlayTop, timeValue);
    this.removeEventListener('animationend', finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation);
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10);

  const secondNumber = timeValue % 10;

  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll('.time-segment');


  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);

  const complete = nowTime >= targetDateTime;

  if(complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  const hours = Math.floor(secondsRemaining / 60 / 60);
  const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
  const seconds = secondsRemaining % 60;

  return {
    complete,
    seconds,
    minutes,
    hours
  };
}

function updateAllSegments() {
  const targetTimeStamp = new Date(targetDate).getTime();
  const timeRemainingBits = getTimeRemaining(targetTimeStamp);
  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);

  return timeRemainingBits.complete;
}

const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();

  if(isComplete) {
    clearInterval(countdownTimer);
  }

}, 1000)

updateAllSegments();


// Glitch effect
let bg = document.getElementById('glitch');
console.log(bg);
let count = 5;
for (let i = 0; i < count; i++) {
  let glitchBox = document.createElement('div')
  glitchBox.className = 'box';
  bg.appendChild(glitchBox);
}

setInterval(function() {
  let glitch = document.getElementsByClassName('box');
for (let i = 0; i < glitch.length; i++) {
  glitch[i].style.left = Math.floor(Math.random()*250) + 'px';
  glitch[i].style.top = Math.floor(Math.random()*450) + 'px';
  glitch[i].style.width = Math.floor(Math.random()*120) + 'px';
  glitch[i].style.height = Math.floor(Math.random()*100) + 'px';
}
}, 600)

const effect4 = document.querySelector('.effect4__container');
const effect4Video = document.querySelector('.effect4__video');

effect4.addEventListener('mouseover', () => {
  effect4Video.play();
});

effect4.addEventListener('mouseleave', () => {
  effect4Video.pause();
})