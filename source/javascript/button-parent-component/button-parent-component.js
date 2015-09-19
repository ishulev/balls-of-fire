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
		}

		function toggleVisibilityClasses(element) {
			element.toggleClass('hidden');
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

		function toggleStructureClasses(elements, structureClassesToToggle, firstClick) {
			if(firstClick)
			{
				var once = false;
				elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.initialStructureClassToToggle);
				elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.activeStructureClassToToggle);
				if(!elements.currentlySelectedButtonParent.hasClass('added-margin'))
				{
					once = true;
					elements.currentlySelectedButtonParent.toggleClass('added-margin');
				}

				for(var i=0; i < elements.buttonParentElements.length; i++)
				{
					var element = wrapElement(elements.buttonParentElements[i]);
					if(!element.hasClass('added-margin'))
					{
						element.toggleClass(structureClassesToToggle.initialStructureClassToToggle);
						element.toggleClass(structureClassesToToggle.defaultStructureClassToToggle);
					}
				}
				if(elements.currentlySelectedButtonParent.hasClass('added-margin') && !once)
					elements.currentlySelectedButtonParent.toggleClass('added-margin');
			}
			else
			{
				elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.activeStructureClassToToggle);
				elements.currentlySelectedButtonParent.toggleClass(structureClassesToToggle.defaultStructureClassToToggle);
				elements.currentlySelectedButtonParent.toggleClass('added-margin');
				elements.previouslySelectedButtonParent.toggleClass(structureClassesToToggle.activeStructureClassToToggle);
				elements.previouslySelectedButtonParent.toggleClass(structureClassesToToggle.defaultStructureClassToToggle);
				elements.previouslySelectedButtonParent.toggleClass('added-margin');
			}
		}

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				//The two values are equal on directive init
				if(newValue !== oldValue && newValue)
				{
					var elements = {};
					//These are the main button parent elements
					var currentlySelectedButtonParent = newValue.parent();
					if(oldValue)
					{
						var previouslySelectedButtonParent = oldValue.parent();
						elements.previouslySelectedButtonParent = previouslySelectedButtonParent;
						var previousActiveButton = wrapElement(previouslySelectedButtonParent.children()[0]);
						var contentToBeHidden = wrapElement(previouslySelectedButtonParent.children()[1]);
					}
					
					var classPrefix = "col-xs-";
					elements.currentlySelectedButtonParent = currentlySelectedButtonParent;
					elements.buttonParentElements = wrapElement(currentlySelectedButtonParent.parent()).children();

					//Determine the number of children in order to estimate the structure toggle class
					var numberOfStructureElements = elements.buttonParentElements.length;
					var structureClassesToToggle = calculateStructureClasses(numberOfStructureElements);
					structureClassesToToggle = addClassPrefix(structureClassesToToggle, classPrefix);

					//Determine whether this is the first time an element from that group has been clicked
					var firstClick = false;
					var classToCheckIfFirst = classPrefix.concat((12/numberOfStructureElements).toString());
					//oldValue is null only if the button is being reopened after being closed
					if(currentlySelectedButtonParent.hasClass(classToCheckIfFirst) || oldValue === null)
						firstClick = true;

					//Actual buttons
					var currentActiveButton = wrapElement(currentlySelectedButtonParent.children()[0]);

					//Content below buttons, which is a sibling to the button in DOM language
					var contentToBeDisplayed = wrapElement(currentlySelectedButtonParent.children()[1]);
					
					//Call functions for each of the assigned elements
					toggleStructureClasses(elements, structureClassesToToggle, firstClick);
					
					if(firstClick)
					{
						
						toggleAestheticClasses(currentActiveButton);
						toggleVisibilityClasses(contentToBeDisplayed);

					}
					else
					{
						toggleAestheticClasses(currentActiveButton);
						toggleAestheticClasses(previousActiveButton);
						toggleVisibilityClasses(contentToBeHidden);
						toggleVisibilityClasses(contentToBeDisplayed);
						
					}
				}
			});
			scope.$watch('bpc.buttonClose', function(element, oldValue){
				if(element !== oldValue)
				{
					//These are the main button parent elements
					var currentlySelectedButtonParent = element.parent();
					
					var classPrefix = "col-xs-";
					var elements = {};
					elements.currentlySelectedButtonParent = currentlySelectedButtonParent;
					elements.buttonParentElements = wrapElement(currentlySelectedButtonParent.parent()).children();

					//Determine the number of children in order to estimate the structure toggle class
					var numberOfStructureElements = elements.buttonParentElements.length;
					var structureClassesToToggle = calculateStructureClasses(numberOfStructureElements);
					structureClassesToToggle = addClassPrefix(structureClassesToToggle, classPrefix);
					toggleStructureClasses(elements, structureClassesToToggle, true);
					toggleAestheticClasses(element);
					toggleVisibilityClasses(element.next());
				}
			});
		}
	}
	controller.$inject = ['$scope'];

	function controller($scope) {
	}
})();