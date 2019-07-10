var videoElement;
var toggleMuteButton;
var allowAutoplayWithSound = false;
var allowAutoplayOnlyMuted = false;

function init() {
  videoElement = document.getElementById('videoElement');
  toggleMuteButton = document.getElementById('toggleMuteButton');
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
    videoElement.volume = 0;
    videoElement.muted = true;
    checkAutoplay(onMutedAutoplaySuccess, onMutedAutoplayFail);
}

function onResolveCheckAutoplay() {
    console.log('allow autoplay? ' + allowAutoplayWithSound + ';');
    console.log('allow muted autoplay? ' + allowAutoplayOnlyMuted + ';');
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
    onResolveCheckAutoplay();
}

function setMuteButton() {
    toggleMuteButton.addEventListener('click', onClickToggleMuteButton);
}

function onClickToggleMuteButton() {
    var muted = videoElement.muted;

    if (muted) {
        videoElement.volume = 1;
        videoElement.muted = false;
    } else {
        videoElement.volume = 0;
        videoElement.muted = true;
    }
}

init();
