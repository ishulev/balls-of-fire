(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#factories
	angular
		.module('app')
		.factory('contentFactory', contentFactoryFunction);
	contentFactoryFunction.$inject = ['$http'];

	function contentFactoryFunction($http){
		var service = {
			getData: getData
		};

		return service;

		function getData() {
			return $http
				.get('/data/content.json')
				.then(getDataComplete)
				.catch(getDataFailed);

			function getDataComplete(response) {
				return response.data.subcontent;
			}

			function getDataFailed(error) {
				console.log('XHR Failed for getAvengers.' + error.data);
			}
		}
	}
})();