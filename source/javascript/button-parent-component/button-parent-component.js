(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('buttonParentDirective', buttonParentDirectiveFunction);

	function buttonParentDirectiveFunction() {
		var directive = {
			restict: 'EA',
			scope: {},
			link: linkFunc,
			controller: controller,
			controllerAs: 'bpc'
		};
		return directive;

		function wrapElement(element){
			//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
			//Documentation: http://stackoverflow.com/a/22144182
			//Hint: jqLite does not recognize the element as easy as jQuery would /Still needs research/
			return angular.element(element);
		}

		function toggleAestheticClasses(element) {
			element.toggleClass('active');
			element.toggleClass('btn-success');
			element.toggleClass('btn-info');
		}

		function toggleVisibilityClasses(element) {
			element.toggleClass('hidden');
		}

		function toggleStructureClasses(element) {
			element.toggleClass('col-xs-3');
			element.toggleClass('col-xs-6');
		}

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				//These are the main button parent elements
				var currentlySelectedButtonParent = wrapElement(el.children()[newValue - 1]);
				var previouslySelectedButtonParent = wrapElement(el.children()[oldValue - 1]);

				//Actual buttons
				var currentActiveButton = wrapElement(currentlySelectedButtonParent.children()[0]);
				var previousActiveButton = wrapElement(previouslySelectedButtonParent.children()[0]);

				//Content below buttons, which is a sibling to the button in DOM language
				var contentToBeDisplayed = wrapElement(currentlySelectedButtonParent.children()[1]);
				var contentToBeHidden = wrapElement(previouslySelectedButtonParent.children()[1]);
				
				//Call functions for each of the assigned elements
				toggleStructureClasses(currentlySelectedButtonParent);
				toggleStructureClasses(previouslySelectedButtonParent);

				toggleAestheticClasses(currentActiveButton);
				toggleAestheticClasses(previousActiveButton);

				toggleVisibilityClasses(contentToBeDisplayed);
				toggleVisibilityClasses(contentToBeHidden);
			});
		}
	}
	controller.$inject = ['$scope'];

	function controller($scope) {
		$scope.bpc.active = 2;
	}
})();