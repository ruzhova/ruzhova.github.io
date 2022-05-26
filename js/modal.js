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