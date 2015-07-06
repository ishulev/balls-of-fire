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
			return angular.element(element);
		}

		function toggleStructureClasses(element) {
			element.toggleClass('col-sm-2');
			element.toggleClass('col-sm-4');
			wrapElement(element.children()[0]).toggleClass('active');
			wrapElement(element.children()[0]).toggleClass('btn-lg');
		}

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				if(newValue == 1)
				{
					//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
					//Documentation: http://stackoverflow.com/a/22144182
					if(oldValue == 2)
					{
						toggleStructureClasses(wrapElement(el.children()[1]));
						toggleStructureClasses(wrapElement(el.children()[0]));
					}
					else if(oldValue == 3)
					{
						toggleStructureClasses(wrapElement(el.children()[2]));
						toggleStructureClasses(wrapElement(el.children()[0]));
					}
				}
				else if(newValue == 2)
				{
					if(oldValue == 1)
					{
						toggleStructureClasses(wrapElement(el.children()[1]));
						toggleStructureClasses(wrapElement(el.children()[0]));
					}
					else if(oldValue == 3)
					{
						toggleStructureClasses(wrapElement(el.children()[1]));
						toggleStructureClasses(wrapElement(el.children()[2]));	
					}
				}
				else if(newValue == 3)
				{
					if(oldValue == 1)
					{
						toggleStructureClasses(wrapElement(el.children()[2]));
						toggleStructureClasses(wrapElement(el.children()[0]));
					}
					else if(oldValue == 2)
					{
						toggleStructureClasses(wrapElement(el.children()[1]));
						toggleStructureClasses(wrapElement(el.children()[2]));	
					}
				}
			});
		}
	}
	controller.$inject = ['$scope'];

	function controller($scope) {
		$scope.bpc.active = 2;
	}
})();