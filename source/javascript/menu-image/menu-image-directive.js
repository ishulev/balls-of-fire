(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('menuImageDirective', menuImageDirectiveFunction);


	function menuImageDirectiveFunction() {
		var directive = {
			restict: 'EA',
			link: linkFunction,
			template: '<span>{{label}}</span>'
		};
		return directive;
	}

	function linkFunction(scope, el, attrs) {
		console.log('init');
		scope.label = attrs.popoverLabel;
		$(el).popover({
			trigger: 'click',
			html: true,
			content: attrs.popoverHtml,
			placement: attrs.popoverPlacement
		});
	}
})();