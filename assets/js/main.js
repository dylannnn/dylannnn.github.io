$(function () {
	"use strict";
	var html = $('html').html();
	$(".typed").typed({
		strings: [html],
		contentType: 'text',
		typeSpeed: 0,
		startDelay: 0,
		// backspacing speed
		backSpeed: 0,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// show cursor
		showCursor: false,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// call when done callback function
		callback: function () {},
		// starting callback function before each string
		preStringTyped: function () {},
		//callback for every typed string
		onStringTyped: function () {},
		// callback for reset
		resetCallback: function () {}
	});
});

var competencyGraph = d3.select("#competency").append("svg").attr("width", "100%").attr("height", 400).append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", 400).style("fill", "lightgray");
