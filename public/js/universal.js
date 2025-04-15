/*________________________ Drop Down +++ ________________________*/
$(document).on('click', '[data-custom-drop-btn]', function (e) {
	e.preventDefault();
	let activeClassContainer = $(this).closest('[data-custom-drop]').find('[data-custom-drop-body]');


	$('[data-custom-drop-body]').not(activeClassContainer).removeClass('active');

	activeClassContainer.toggleClass('active');
});

$(document).on('mousedown', document, function (e) {
	if ($(e.target).closest('[data-custom-drop]').length === 0) {
		$('[data-custom-drop-body]').removeClass('active');
	}
});
/*________________________ Drop Down --- ________________________*/



/*________________________ Accordion +++ ________________________*/
$(document).on('click', '[data-custom-accordion-btn]', function (e) {
	e.preventDefault();

	$(this).toggleClass('active').closest('[data-custom-accordion]').find('[data-custom-accordion-body]').slideToggle();
});
/*________________________ Accordion --- ________________________*/



/*________________________ Switch +++ ________________________*/
$(document).on('click', '[data-custom-switch-btn]', function (e) {
	e.preventDefault();
	let bodyId = $(this).attr('data-custom-switch-btn');


	$('[data-custom-switch-body]:not(' + bodyId + ')').removeClass('active');

	$(bodyId).toggleClass('active');
});

$(document).on('mousedown', document, function (e) {
	if ($(e.target).closest('[data-custom-switch-body]').length === 0
		&& $(e.target).closest('[data-custom-switch-btn]').length === 0
		&& $(e.target).closest('body.modal-open').length === 0) {
		$('[data-custom-switch-body]').removeClass('active');
	}
});
/*________________________ Switch --- ________________________*/



/*________________________ Menu Toggle +++ ________________________*/
$(document).on('click', '.menu_toggle_btn', function (e) {
	e.preventDefault();
	$('.sidebar-menu').toggleClass('active');
	$('.main-content').toggleClass('active');
});
/*________________________ Menu Toggle --- ________________________*/



// document.onpaste = (e) => {
//
// 	if (!e.clipboardData.files[0])
// 	{
// 		return;
// 	}
//
//
// 	let reader = new FileReader();
// 	reader.onload = (evt) => {
// 		console.log('FileReader', evt.target.result);
// 	};
//
//
// 	reader.readAsDataURL(e.clipboardData.files[0]);
// };

