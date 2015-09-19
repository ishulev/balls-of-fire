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

	Controller.$inject = ['$scope', '$sce', 'contentFactory'];

	function Controller($scope, $sce, contentFactory) {
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
				var data = allData[data.contentCategory][data.contentToBeDisplayed + '.html'];
				//Checks whether the loaded data has the following attribute,
				//which is only present for the "facts" section
				if(data.search('name="my-age"') !==-1)
					vm.data = $sce.trustAsHtml(data);
				else
					vm.data = data;
			}
		});
	}
})();