var $portfolio = $('#portfolio')

$('body').on('click', '#portfolio:not(.closed) .portfolio-toggle, #portfolio.closed', function() {
	if ($portfolio.hasClass('closed')) {
		$portfolio.removeClass('closed');
		window.history.pushState("portfolioOpen", "Noah Lafferty - Portfolio", "/");
		document.title = "Noah Lafferty - Portfolio";
	} else {
		$portfolio.addClass('closed');
		window.history.pushState("portfolioClosed", "Noah Lafferty", "/");
		document.title = "Noah Lafferty";
	}
});

$('.portfolio-link').mouseenter(function() {
	$portfolio.addClass('hover');
}).mouseleave(function() {
	$portfolio.removeClass('hover');
}).click(function() {
	$('.portfolio-toggle').click();
});

window.onpopstate = function(e){
    if (e.state === "portfolioOpen") {
    	$portfolio.removeClass('closed');
    	document.title = "Noah Lafferty - Portfolio";
    } else if (e.state === "portfolioClosed") {
    	$portfolio.addClass('closed');
    	document.title = "Noah Lafferty";
    }
};