var $portfolio = $('#portfolio');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// fake out the browser to check if you redirected from noahlafferty.me/portfolio
if (document.referrer.endsWith("/portfolio/")) {
	$portfolio.removeClass('closed');
	window.history.pushState("portfolioOpen", "Noah Lafferty - Portfolio", "/portfolio/");
	document.title = "Noah Lafferty - Portfolio";
}

// toggle the portfolio open or closed on mouse click 
$('body').on('click', '#portfolio:not(.closed) .portfolio-toggle, #portfolio.closed', function() {
	if ($portfolio.hasClass('closed')) {
		$portfolio.removeClass('closed');
		window.history.pushState("portfolioOpen", "Noah Lafferty - Portfolio", "/portfolio");
		document.title = "Noah Lafferty - Portfolio";
	} else {
		$portfolio.addClass('closed');
		window.history.pushState("portfolioClosed", "Noah Lafferty", "/");
		document.title = "Noah Lafferty";
	}
});

// do the fancy hover animation when you mouse over a link in my text
$('.portfolio-link').mouseenter(function() {
	$portfolio.addClass('hover');
}).mouseleave(function() {
	$portfolio.removeClass('hover');
}).click(function() {
	$('.portfolio-toggle').click();
});

// capture the browser's back button so you can open and close the portfolio
window.onpopstate = function(e){
    if (e.state === "portfolioOpen") {
    	$portfolio.removeClass('closed');
    	document.title = "Noah Lafferty - Portfolio";
    } else if (e.state === "portfolioClosed") {
    	$portfolio.addClass('closed');
    	document.title = "Noah Lafferty";
    }
};

