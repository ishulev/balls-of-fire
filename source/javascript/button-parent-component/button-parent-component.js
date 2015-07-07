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

		function toggleStructureClasses(element) {
			element.toggleClass('col-sm-2');
			element.toggleClass('col-sm-4');
			wrapElement(element.children()[0]).toggleClass('active');
			wrapElement(element.children()[0]).toggleClass('btn-success');
			wrapElement(element.children()[0]).toggleClass('btn-info');
		}

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				var currentlyActiveElement = wrapElement(el.children()[newValue - 1]);
				var previouslyActiveElement = wrapElement(el.children()[oldValue - 1]);
				
				toggleStructureClasses(currentlyActiveElement);
				toggleStructureClasses(previouslyActiveElement);
			});
		}
	}
	controller.$inject = ['$scope'];

	function controller($scope) {
		$scope.bpc.active = 2;
	}
})();