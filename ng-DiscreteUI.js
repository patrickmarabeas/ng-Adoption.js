/* ng-DiscreteUI.js v1.0.0
 * https://github.com/patrickmarabeas/ng-DiscreteUI.js
 *
 * Copyright 2013, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 19/12/2013
 */

var module = angular.module( 'ngDiscreteUI', [] );

module.factory( 'AdoptionAgency', function() {
	return {
		adopts: [],
		addAdopts: function( id, values ) {
			this.adopts[id] = values;
		},
		custody: function( newElm, oldElm ) {
			while (oldElm.hasChildNodes()) {
				newElm.appendChild(oldElm.removeChild(oldElm.firstChild))
			}
		},
		create: function( id ) {
			var element = this.adopts[id];
			var oldElm = document.getElementById( id );
			var newElm = document.createElement( element.tag );
			newElm.setAttribute( 'id', element.newElm );
			newElm.style.width = oldElm.offsetWidth + 'px'; /* would like to move this out and into the users code */
			newElm.style.left = oldElm.offsetLeft + 'px'; /* would like to move this out and into the users code */
			element.container.appendChild( newElm );
			this.custody( newElm, oldElm );
		},
		destroy: function( id ) {
			var element = this.adopts[id];
			var oldElm = document.getElementById( id );
			var newElm = document.getElementById( element.newElm );
			if ( newElm ) {
				this.custody( oldElm, newElm );
				newElm.parentNode.removeChild( newElm );
			}
		}
	}
});


module.directive( 'discrete', [ 'AdoptionAgency', function( AdoptionAgency ) {
	return {

		controller: function( $scope, $element, $attrs ) {
			$scope.condition = false;
		},
		scope: true,
		link: function( scope, element, attrs ) {

			AdoptionAgency.addAdopts( attrs.id, {
				newElm: attrs.id + '_discrete',
				tag: element[0].nodeName,
				container: document.getElementById( attrs.id ).parentNode
			});

			scope.$watch('discrete', function( adopt ){
				if( adopt ){
					AdoptionAgency.create( attrs.id );
				}
				else{
					AdoptionAgency.destroy( attrs.id );
				}
			});

		}
	}
}]);