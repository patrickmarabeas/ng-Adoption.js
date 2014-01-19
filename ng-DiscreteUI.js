/* ng-DiscreteUI.js v1.2.0
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
			element.container.appendChild( newElm );

			if((new RegExp('height')).test( element.maintain )) {
				oldElm.style.height = oldElm.offsetHeight + 'px';
			}
			if((new RegExp('width')).test( element.maintain )) {
				newElm.style.width = oldElm.offsetWidth + 'px';
			}
			if((new RegExp('left')).test( element.maintain )) {
				newElm.style.left = oldElm.getBoundingClientRect().left + 'px';
			}

			this.custody( newElm, oldElm );
		},
		destroy: function( id ) {
			var element = this.adopts[id];
			var oldElm = document.getElementById( id );
			var newElm = document.getElementById( element.newElm );
			if ( newElm ) {

				if ( oldElm.style.removeProperty ) {
					oldElm.style.removeProperty( 'height' );
				} else {
					oldElm.style.removeAttribute( 'height' );
				}

				this.custody( oldElm, newElm );
				newElm.parentNode.removeChild( newElm );
			}
		}
	}
});


module.directive( 'adopt', [ 'AdoptionAgency', function( AdoptionAgency ) {

//	This is too stringent. Should pass in old/new elms via the third party directive using scope.
//	The user should be able to define these elements within their code - allowing for more radical
//	adoption proceedures - ie, the elements children can be passed around between more than two
//	elements with ease

	return {

		controller: function( $scope, $element, $attrs ) {
			$scope.condition = false;
		},
		scope: true,
		link: function( scope, element, attrs ) {

			var preset = false;
			(function() {
				if( document.getElementById( attrs.adoptId ) ) {
					preset = true;
				}
			})();

			AdoptionAgency.addAdopts( attrs.id, {
				newElm: attrs.adoptId || attrs.id + '_clone',
				tag: element[0].nodeName,
				container: document.getElementById( attrs.id ).parentNode,
				preset: preset,
				maintain: attrs.adoptMaintain
			});

			scope.$watch('adopt', function( adopt ){
				if( adopt ){

					if( document.getElementById( attrs.adoptId ) ) {
						var oldElm = document.getElementById( attrs.id );
						var newElm = document.getElementById( attrs.adoptId );
						AdoptionAgency.custody( newElm, oldElm );
					}
					else {
						AdoptionAgency.create( attrs.id );
					}
				}
				else{
					if( preset ) {
						var newElm = document.getElementById( attrs.id );
						var oldElm = document.getElementById( attrs.adoptId );
						AdoptionAgency.custody( newElm, oldElm );
					}
					else {
						AdoptionAgency.destroy( attrs.id );
					}
				}
			});
		}
	}
}]);