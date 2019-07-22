var videoElement;
var toggleMuteButton;
var resultElement;
var resultElementForCanAutoplay;

var result = {
    allow: 'allow',
    onlyMuted: 'only muted',
    disallow: 'disallow',
};

function init() {
  videoElement = document.getElementById('videoElement');
  toggleMuteButton = document.getElementById('toggleMuteButton');
  resultElement = document.getElementById('result');
  resultElementForCanAutoplay = document.getElementById('result-for-can-autoplay');
  checkAutoPlaySupport();
  checkAutoPlaySupportByCanAutoplay();
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

function onResolveCheckAutoplay(txt, element) {
    var result = '';
    result += 'allow autoplay? ' + txt + ";\n";
    element.innerText = result;
}

function onAutoplayWithSoundFail() {
    checkMutedAutoplaySupport();
}

function onAutoplayWithSoundSuccess() {
    onResolveCheckAutoplay(result.allow, resultElement);
}

function onMutedAutoplaySuccess() {
    onResolveCheckAutoplay(result.onlyMuted, resultElement);
}

function onMutedAutoplayFail() {
    onResolveCheckAutoplay(result.disallow, resultElement);
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

function checkAutoPlaySupportByCanAutoplay() {
    // timeoutがデフォルトだとエラーになりがち
    canAutoplay.video({timeout: 1000, inline: true}).then(function(r) {
        console.log(r);
        if (r.result === true) {
            // Can autoplay
            console.log('allow');
            onResolveCheckAutoplay(result.allow, resultElementForCanAutoplay);
        } else {
            // muted でならいけるか判定
            canAutoplay.video({ muted: true, timeout: 1000, inline: true }).then(function(r) {
                if (r.result === true) {
                    // Can autoplay
                    onResolveCheckAutoplay(result.onlyMuted, resultElementForCanAutoplay);
                    console.log('only muted');
                } else {
                    // Can not autoplay
                    onResolveCheckAutoplay(result.disallow, resultElementForCanAutoplay);
                    console.log('disallow');
                }
            })
        }
    });
}

init();
