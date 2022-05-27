let timer = document.getElementById('timer');
let maxTime = 1000*15;
let startTime = null;
function formatTime(time) {
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor(time / 1000 % 60);
    return minutes + ':' + seconds;
}

function modal(id) {
	document.getElementById(id).classList.toggle('modal_active');
    var modal_obj = document.getElementById(id);
	var close = document.querySelectorAll('[data-close="true"]');
	for (var i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			modal_obj.classList.remove('modal_active');
		}
	}
}

let timerId = setInterval(function() {
    if (startTime === null) {
        startTime = Date.now()
    }
    let now = Date.now();
    if (now - startTime >= maxTime) {
        clearInterval(timerId);
        modal('about');
        setTimeout(function() {
            if (window.location.pathname == '/levels/level1.html'){
                localStorage.setItem('score1', 0);
            }
            else if (window.location.pathname == '/levels/level2.html'){
                localStorage.setItem('score2', 0);
            }
            else if (window.location.pathname == '/levels/level3.html'){
                localStorage.setItem('score3', 0);
            }
            document.location.href = window.location.pathname;
        }, (2 * 1000));
    }
    timer.innerText = formatTime(maxTime - (Date.now() - startTime));
}, 100);