(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('buttonDirective', buttonDirectiveFunction);

	function buttonDirectiveFunction() {
		var directive = {
			restict: 'EA',
			link: link,
			scope: {
				itemIdentifier: '@'
			},
			require: '^buttonParentDirective'
		};
		return directive;

		function link(scope, element, attrs, buttParentController) {
			element.on('click', function() {
				buttParentController.active = scope.itemIdentifier;
				
				//Needed to let the parent scope know of the change and trigger the $watch
				//Documentation: http://www.sitepoint.com/understanding-angulars-apply-digest/
				scope.$apply();
			});
		}
	}
})();