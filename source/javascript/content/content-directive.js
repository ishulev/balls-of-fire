(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('contentDirective', contentDirectiveFunction);


	function contentDirectiveFunction() {
		var directive = {
			restict: 'EA',
			controller: Controller,
			controllerAs: 'vm',
			template: '<span ng-bind-html="vm.data"></span>',
			scope: {
				itemIdentifier: '@'
			}
		};
		return directive;
	}

	Controller.$inject = ['$scope', 'contentFactory'];

	function Controller($scope, contentFactory) {
		var vm = this;
		vm.data = {};

		getData();

		function getData()
		{
			return contentFactory
				.getData()
				.then(function(data) {
					var itemIdentifier = $scope.itemIdentifier;
					vm.data = data.interests[itemIdentifier];
				});
		}
	}
})();