

var module = angular.module( 'demo', ['ngAdoption'] );


module.directive( 'custdir', [ 'AdoptionAgency', function(AdoptionAgency) {
	return {

		require: 'adopt',
		link: function( scope, element, attrs) {

			var elementHeight = document.getElementById(attrs.id).offsetTop;
			var oldElm = document.getElementById(attrs.id);

			var newElm = document.getElementById(attrs.id + '_discrete');

			angular.element( window ).bind( 'scroll', function() {

//				if( scope.discrete ) {
//					var newElm = document.getElementById(attrs.id + '_discrete');
//
//					newElm.style.width = oldElm.offsetWidth + 'px';
//					newElm.style.left = oldElm.offsetLeft + 'px';
//
//				}

				var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

				if( scrollTop > elementHeight ) {

					scope.$apply( function () {
						scope.adopt = true;
					});

				}

				else {
					scope.$apply( function () {
						scope.adopt = false;
					});
				}


			});

			angular.element( window ).bind( 'resize', function() {


				if( scope.adopt ) {
					var newElm = document.getElementById(attrs.id + '_discrete');

					newElm.style.width = oldElm.offsetWidth + 'px';
					newElm.style.left = oldElm.offsetLeft + 'px';

				}


			});




		}

	}
}]);



module.directive( 'test', [ 'AdoptionAgency', function(AdoptionAgency) {
	return {

		link: function( scope, element, attrs) {

			angular.element( element ).bind( 'click', function() {
				element[0].style.backgroundColor = 'blue';
			});

		}
	}

}]);