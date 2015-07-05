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

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				if(newValue == 1)
				{
					//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
					//Documentation: http://stackoverflow.com/a/22144182
					if(oldValue == 2)
					{
						angular.element(el.children()[1]).toggleClass('col-sm-4');
						angular.element(el.children()[1]).toggleClass('col-sm-2');
						angular.element(el.children()[0]).toggleClass('col-sm-4');
						angular.element(el.children()[0]).toggleClass('col-sm-2');
					}
					else if(oldValue == 3)
					{
						angular.element(el.children()[0]).toggleClass('col-sm-4');
						angular.element(el.children()[0]).toggleClass('col-sm-2');
						angular.element(el.children()[2]).toggleClass('col-sm-4');
						angular.element(el.children()[2]).toggleClass('col-sm-2');	
					}
				}
				else if(newValue == 2)
				{
					//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
					//Documentation: http://stackoverflow.com/a/22144182
					if(oldValue == 1)
					{
						angular.element(el.children()[1]).toggleClass('col-sm-4');
						angular.element(el.children()[1]).toggleClass('col-sm-2');
						angular.element(el.children()[0]).toggleClass('col-sm-4');
						angular.element(el.children()[0]).toggleClass('col-sm-2');
					}
					else if(oldValue == 3)
					{
						angular.element(el.children()[1]).toggleClass('col-sm-4');
						angular.element(el.children()[1]).toggleClass('col-sm-2');
						angular.element(el.children()[2]).toggleClass('col-sm-4');
						angular.element(el.children()[2]).toggleClass('col-sm-2');	
					}
				}
				else if(newValue == 3)
				{
					//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
					//Documentation: http://stackoverflow.com/a/22144182
					if(oldValue == 1)
					{
						angular.element(el.children()[2]).toggleClass('col-sm-4');
						angular.element(el.children()[2]).toggleClass('col-sm-2');
						angular.element(el.children()[0]).toggleClass('col-sm-4');
						angular.element(el.children()[0]).toggleClass('col-sm-2');
					}
					else if(oldValue == 2)
					{
						angular.element(el.children()[1]).toggleClass('col-sm-4');
						angular.element(el.children()[1]).toggleClass('col-sm-2');
						angular.element(el.children()[2]).toggleClass('col-sm-4');
						angular.element(el.children()[2]).toggleClass('col-sm-2');	
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