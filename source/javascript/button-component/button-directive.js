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

		function wrapElement(element){
			//Needs to be wrapped in angular.element(), because the element would not have the hasClass method
			//Documentation: http://stackoverflow.com/a/22144182
			//Hint: jqLite does not recognize the element as easy as jQuery would /Still needs research/
			return angular.element(element);
		}

		function addClassPrefix(structureClasses, classPrefix)
		{
			structureClasses.initialStructureClassToToggle = classPrefix.concat(structureClasses.initialStructureClassToToggle.toString());
			structureClasses.defaultStructureClassToToggle = classPrefix.concat(structureClasses.defaultStructureClassToToggle.toString());
			structureClasses.activeStructureClassToToggle = classPrefix.concat(structureClasses.activeStructureClassToToggle.toString());

			return structureClasses;
		}

		function calculateStructureClasses(numberOfStructureElements)
		{
			var structureClassesToToggle = {};
			switch(numberOfStructureElements){
				case 2:
					structureClassesToToggle.initialStructureClassToToggle = 6;
					structureClassesToToggle.defaultStructureClassToToggle = 4;
					structureClassesToToggle.activeStructureClassToToggle = 8;
					break;
				case 3:
					structureClassesToToggle.initialStructureClassToToggle = 4;
					structureClassesToToggle.defaultStructureClassToToggle = 3;
					structureClassesToToggle.activeStructureClassToToggle = 6;
					break;
				case 4:
					structureClassesToToggle.initialStructureClassToToggle = 3;
					structureClassesToToggle.defaultStructureClassToToggle = 2;
					structureClassesToToggle.activeStructureClassToToggle = 6;
					break;
				default: 
					console.log('Messy HTML!');
			}

			return structureClassesToToggle;
		}

		function toggleStructureClasses(elements, structureClassesToToggle) {
			elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.initialStructureClassToToggle);
			elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.activeStructureClassToToggle);

			for(var i=0; i < elements.buttonParentElements.length; i++)
			{
				var element = wrapElement(elements.buttonParentElements[i]);
				if(!element.hasClass('added-margin'))
				{
					element.toggleClass(structureClassesToToggle.initialStructureClassToToggle);
					element.toggleClass(structureClassesToToggle.defaultStructureClassToToggle);
				}
			}
			elements.currentlySelectedButtonParent.toggleClass('added-margin');
		}

		function link(scope, element, attrs, buttParentController) {
			element.on('click', function() {
				if(attrs.contentToBeDisplayed)
				{
					var contentVariables = {};
					contentVariables.contentToBeDisplayed = attrs.contentToBeDisplayed;
					contentVariables.contentCategory = attrs.contentCategory;
					$rootScope.$emit('contentToBeDisplayed', contentVariables);
				}
				else{
					var childrenButtons = element.next().children().children();
					for(var i = 0; i < childrenButtons.length; i++)
					{
						var currentElement = wrapElement(childrenButtons[i]);
						if(currentElement.hasClass('active'))
						{
							buttParentController.buttonClose = currentElement;
							scope.$apply();
						}
					}
				}

				if(buttParentController.active === element)
				{
					if(buttParentController.buttonClose === buttParentController.active)
					{
						buttParentController.active = null;
						scope.$apply();
						buttParentController.active = element;
					}
					else
						buttParentController.buttonClose = element;
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