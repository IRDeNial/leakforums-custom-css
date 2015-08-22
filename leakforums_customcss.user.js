// ==UserScript==
// @name           LeakForums Custom CSS
// @version        1.0.0
// @description    Allow users to apply custom CSS rules to LeakForums
// @downloadURL    https://bitbucket.org/notmike101/leakforums-custom-css/raw/master/leakforums_customcss.user.js
// @updateURL      https://bitbucket.org/notmike101/leakforums-custom-css/raw/master/leakforums_customcss.meta.js
//
// @author         Mike Orozco / IRDeNial
// @namespace      leakforums/irdenial/customcss
//
// @include        *://leakforums.net*
// @include        *://www.leakforums.net*
// @include        *://*.leakforums.net*
//
// @grant          metadata
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Use jQuery when in safe mode
(function ($) {
	// If does not support localstorage, kill script
	if (typeof Storage != "undefined") {
		// Add custom CSS style attribute into head element
		$('head').append('<style type="text/css" id="customCSS" class="customCSS"></style>');

		// Add the menu option to open CSS customizer
		$('.dd ul').append('<li class="customCSSButton" id="customCSSButton"><a href="#">Custom CSS</a></li>');

		// CSS customizer
		$('body').append('<div style="position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);background-color:rgba(250,250,250,0.9);display:block;width:80%;min-height:150px;z-index:500;margin:0 auto;color:#333333;box-shadow:-3px 3px 15px #000000;display:none;" id="cssCustomizer"><div class="header" style="text-align:center;display:block;width:100%;position:relative;top:0;font-size:30px;background-color:#333333;color:#fefefe;padding:15px 0;">CSS Customizer</div><div class="content" style="height:350px;"><textarea id="customCSSInput" class="customCSSInput" style="width:calc(100% - 20px);height:calc(100% - 20px);padding:10px;margin:0;border:0;"></textarea></div><button id="saveCustomCSS" class="saveCustomCSS" style="display:block;width:100%;padding-top:10px;padding-bottom:10px;font-size:20px;">Save Custom CSS</button></div>');

		// Allow tabs in textarea
		$('#customCSSInput').on('keydown', function(e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				e.preventDefault();
				$(this).val($(this).val() + '\t');
			}
		});

		// Apply custom CSS on page load
		$('#customCSS').text(localStorage.getItem('leakforums_customCSS'));
		$('#customCSSInput').val(localStorage.getItem('leakforums_customCSS'));

		// Show the CSS customizer when menu button is clicked
		$('#customCSSButton').click(function (event) {
			event.preventDefault();
			$('#cssCustomizer').show('fast');
		});

		// Save and apply custom CSS when save button is clicked.
		$('#saveCustomCSS').click(function () {
			// Save custom CSS to local storage
			localStorage.setItem('leakforums_customCSS', $('#customCSSInput').val());
			// Apply custom CSS
			$('#customCSS').text($('#customCSSInput').val());
			// Hide CSS customizer
			$('#cssCustomizer').hide('fast');
		});
	} else {
		console.log("Please update your browser.");
	}
})(jQuery);