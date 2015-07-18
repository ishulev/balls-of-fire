(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('buttonDirective', buttonDirectiveFunction);
	buttonDirectiveFunction.$inject = ['$rootScope'];

	function buttonDirectiveFunction($rootScope) {
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
				if(attrs.contentToBeDisplayed)
				{
					var contentVariables = {};
					contentVariables.contentToBeDisplayed = attrs.contentToBeDisplayed;
					contentVariables.contentCategory = attrs.contentCategory;
					$rootScope.$emit('contentToBeDisplayed', contentVariables);
				}
				//Needed to let the parent scope know of the change and trigger the $watch
				//Documentation: http://www.sitepoint.com/understanding-angulars-apply-digest/
				scope.$apply();
			});
		}
	}
})();