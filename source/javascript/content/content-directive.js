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
			template: '<span class="main-content" ng-bind-html="vm.data"></span>'
		};
		return directive;
	}

	Controller.$inject = ['$scope', 'contentFactory'];

	function Controller($scope, contentFactory) {
		var vm = this;
		var allData = {};

		function getAllData(){
			return contentFactory
				.getData()
				.then(function(data) {
					allData = data;
				});
		}

		vm.data;
		vm.hide = true;
		getAllData();

		$scope.$on('contentToBeDisplayed', function(event, data) {
			if(data == null)
			{
				vm.hide = true;
			}
			else
			{
				vm.hide = false;
				vm.data = allData[data.contentCategory][data.contentToBeDisplayed + '.html'];
			}
		});
	}
})();