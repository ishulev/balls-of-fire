(function() {
	'use strict';

	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('buttonDirective', buttonDirectiveFunction);
	buttonDirectiveFunction.$inject = ['$rootScope'];

	function Controller() {
		this.showContent = true;
	}

	function buttonDirectiveFunction($rootScope) {
		var directive = {
			restict: 'EA',
			link: link,
			scope: true,
			controller: Controller,
			require: '^buttonParentDirective'
		};
		return directive;

		function wrapElement(element){
			//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
			//Documentation: http://stackoverflow.com/a/22144182
			//Hint: jqLite does not recognize the element as easy as jQuery would /Still needs research/
			return angular.element(element);
		}

		function link(scope, element, attrs, buttParentController) {
			var closed = true;
			element.on('click', function() {
				if(attrs.contentToBeDisplayed)
				{
					var contentVariables = {};
					contentVariables.contentToBeDisplayed = attrs.contentToBeDisplayed;
					contentVariables.contentCategory = attrs.contentCategory;
					if(element.hasClass('active'))
					{
						$rootScope.$emit('contentToBeDisplayed', null);
					}
					else
						$rootScope.$emit('contentToBeDisplayed', contentVariables);
				}
				else{
					var childrenButtons = element.next().children().children();
					for(var i = 0; i < childrenButtons.length; i++)
					{
						var currentElement = wrapElement(childrenButtons[i]);
						if(currentElement.hasClass('active'))
						{
							$rootScope.$emit('contentToBeDisplayed', null);
							buttParentController.buttonClose = currentElement;
							scope.$apply();
						}
					}
					$rootScope.$emit('contentToBeDisplayed', null);
				}

				if(buttParentController.active === element)
				{	
					//Button has been opened, closed and now being opened again
					//this occurs every time after the below "else" is fired
					if(buttParentController.buttonClose === buttParentController.active)
					{
						buttParentController.active = null;
						scope.$apply();
						buttParentController.active = element;
					}
					//this occurs after the first time content has been hidden, after closing
					else
					{
						// $rootScope.$emit('contentToBeDisplayed', null);
						buttParentController.buttonClose = element;
					}
				}
				else
				{
					buttParentController.active = element;
				}
				scope.$apply();
				//Needed to let the parent scope know of the change and trigger the $watch
				//Documentation: http://www.sitepoint.com/understanding-angulars-apply-digest/
			});
		}
	}
})();