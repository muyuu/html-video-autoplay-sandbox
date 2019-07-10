var videoElement;
var allowAutoplayWithSound = false;
var allowAutoplayOnlyMuted = false;

function init() {
  videoElement = document.getElementById('videoElement');
  checkAutoPlaySupport();
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

init();
