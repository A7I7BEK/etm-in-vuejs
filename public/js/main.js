// Material button effect starts here

/* Add the class effect on button */
$(document).on('click', '.button-effect', function (e) {
	const self = $(this),
		wave = '.effect-wave',
		/* Get the width of button (if different buttons types) */
		btnWidth = self.outerWidth(),
		x = e.offsetX,
		y = e.offsetY;

	self.prepend('<span class="effect-wave"></span>');

	$(wave)
		.css({
			'top': y,
			'left': x
		})
		.animate({
			opacity: '0',
			width: btnWidth * 2,
			height: btnWidth * 2
		}, 500, function () {
			self.find(wave).remove();
		});
});




$(document).on('click', '.js-accordionTrigger', function () {
	$(this).toggleClass('isActive');
	$(this).siblings('.js-accordionTrigger_bd').slideToggle();
});





$(document).on('click', '.modal-accordion-header', function () {
	$(this).toggleClass('active').siblings('.modal-accordion-body').slideToggle();
});






$(document).on('click', '.toggle-password', function () {

	$(this).toggleClass("fa-eye fa-eye-slash");
	const input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	}
	else {
		input.attr("type", "password");
	}
});






$(document).on('click', function (e) {
	if (!$(e.target).is(".icon-click, .icon-click *, .progress-bar__edit, .progress-bar__edit *, .teams-name a, .teams-name a *, .progress-bar__edit, .progress-bar__edit *")) {
		$(".progress-bar__edit").removeClass("active");
	}
});
$(document).on('click', '.progress-bar__main .icon-click', function (e) {
	e.preventDefault();
	$(".progress-bar__edit").removeClass("active");
	$(this).parent('.progress-bar__main').find(".progress-bar__edit").addClass("active");
});
$(document).on('click', '.user-date .icon-click', function (e) {
	e.preventDefault();
	$(".progress-bar__edit").removeClass("active");
	$(this).parent('.progress-bar__main').find(".progress-bar__edit").addClass("active");
});

$(document).on('click', '.teams-name a', function () {
	$(".progress-bar__edit").removeClass("active");
	$(this).siblings(".progress-bar__edit").addClass("active");
});




$(document).on('click', '.user-date span', function () {
	$(this).parent(".user-date").find(".progress-bar__edit").toggleClass("active");
});





$(".main-content__left .icon-click").click(function () {
  $(this).parent('.task-table__ex').find(".progress-bar__edit").toggleClass("active");
});


// User photo upload block ends here

