var videoElement;
var toggleMuteButton;
var resultElement;
var allowAutoplayWithSound = false;
var allowAutoplayOnlyMuted = false;

function init() {
  videoElement = document.getElementById('videoElement');
  toggleMuteButton = document.getElementById('toggleMuteButton');
  resultElement = document.getElementById('result');
  checkAutoPlaySupport();
  setMuteButton();
}

function checkAutoplay(onSuccess, onFail) {
    var playPromise = videoElement.play();

    if (playPromise !== undefined) {
        playPromise
            .then(onSuccess)
            .catch(onFail);
    }
}

function checkAutoPlaySupport() {
    checkAutoplay(onAutoplayWithSoundSuccess, onAutoplayWithSoundFail);
}

function checkMutedAutoplaySupport() {
    volMin();
    checkAutoplay(onMutedAutoplaySuccess, onMutedAutoplayFail);
}

function onResolveCheckAutoplay() {
    var result = '';
    result += 'allow autoplay? ' + allowAutoplayWithSound + ";\n";
    result += 'allow muted autoplay? ' + allowAutoplayOnlyMuted + ";\n";
    resultElement.innerText = result;
}

function onAutoplayWithSoundSuccess() {
    allowAutoplayWithSound = true;
    allowAutoplayOnlyMuted = false;
    onResolveCheckAutoplay();
}

function onAutoplayWithSoundFail() {
    allowAutoplayWithSound = false;
    checkMutedAutoplaySupport();
}

function onMutedAutoplaySuccess() {
    allowAutoplayOnlyMuted = true;
    onResolveCheckAutoplay();
}

function onMutedAutoplayFail() {
    allowAutoplayOnlyMuted = false;
    volMax();
    onResolveCheckAutoplay();
}

function setMuteButton() {
    toggleMuteButton.addEventListener('click', onClickToggleMuteButton);
}

function onClickToggleMuteButton() {
    var muted = videoElement.muted;

    if (muted) {
        volMin();
    } else {
        volMax();
    }
}

function volMin() {
    videoElement.volume = 0;
    videoElement.muted = true;
}
function volMax() {
    videoElement.volume = 1;
    videoElement.muted = false;
}

init();
