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
			element.toggleClass('btn-success');
			element.toggleClass('btn-info');
		}

		function toggleVisibilityClasses(element) {
			element.toggleClass('hidden');
		}

		function toggleStructureClasses(element) {
			element.toggleClass('col-xs-3');
			element.toggleClass('col-xs-6');
			element.toggleClass('added-margin');
		}

		function linkFunc(scope, el, attr, ctrl) {
			scope.$watch('bpc.active', function(newValue, oldValue){
				//The two values are equal on directive init
				if(newValue !== oldValue)
				{
					//These are the main button parent elements
					var currentlySelectedButtonParent = wrapElement(el.children()[newValue - 1]);
					var previouslySelectedButtonParent = wrapElement(el.children()[oldValue - 1]);
					

					//Determine the number of children in order to estimate the structure toggle class
					var numberOfStructureElements = wrapElement(currentlySelectedButtonParent.parent()).children().length;
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

					//Determine whether this is the first time an element from that group has been clicked
					var firstClick = false;
					var classPrefix = "col-xs-";
					var classToCheckIfFirst = classPrefix.concat((12/numberOfStructureElements).toString());
					if(currentlySelectedButtonParent.hasClass(classToCheckIfFirst))
						firstClick = true;

					//Actual buttons
					var currentActiveButton = wrapElement(currentlySelectedButtonParent.children()[0]);
					var previousActiveButton = wrapElement(previouslySelectedButtonParent.children()[0]);

					//Content below buttons, which is a sibling to the button in DOM language
					var contentToBeDisplayed = wrapElement(currentlySelectedButtonParent.children()[1]);
					var contentToBeHidden = wrapElement(previouslySelectedButtonParent.children()[1]);
					
					//Call functions for each of the assigned elements
					if(firstClick)
					{
						currentlySelectedButtonParent.toggleClass(classPrefix.concat(structureClassesToToggle.initialStructureClassToToggle.toString()));
						currentlySelectedButtonParent.toggleClass(classPrefix.concat(structureClassesToToggle.activeStructureClassToToggle.toString()));
						currentlySelectedButtonParent.toggleClass('added-margin');
						
						toggleAestheticClasses(currentActiveButton);
						toggleVisibilityClasses(contentToBeDisplayed);

						var siblingParents = currentlySelectedButtonParent.parent().children();
						for(var i=0; i< siblingParents.length; i++)
						{
							var element = wrapElement(siblingParents[i]);
							if(!element.hasClass('added-margin'))
							{
								element.toggleClass('col-xs-4');
								element.toggleClass('col-xs-3');
							}
						}
					}
					else
					{
						toggleStructureClasses(currentlySelectedButtonParent);
						toggleStructureClasses(previouslySelectedButtonParent);

						toggleAestheticClasses(currentActiveButton);
						toggleAestheticClasses(previousActiveButton);

						toggleVisibilityClasses(contentToBeDisplayed);
						toggleVisibilityClasses(contentToBeHidden);
						
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