angular.module('whiskeyApp',['ngRoute', 'ngMaterial','ngResource', 'ngCookies'])
.config(
function($interpolateProvider){

    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
}
)
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when('/userlist', {
        templateUrl: 'templates/userlist.html',
        controller: 'UserListCtrl'
      }).when('/drink', {
        templateUrl: 'templates/drink.html',
        controller: 'DrinkCtrl'
      }).otherwise({
        templateUrl: 'templates/default.html',
        controller: 'MainCtrl'
      });




      //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    }
  ])
  .factory('NoteRating', function($resource) {
    return $resource('/notesrating/:cookie/:ratingId/:rating'); // Note the full endpoint address
  })
  .factory('UserList', function($resource) {
    return $resource('/users/:action/:id/:cookie'); // Note the full endpoint address
  })
  .factory('dataService', function() {  
    return {
      activeUser : null
    };




  })

  /*
  .factory('socket', function ($rootScope) {
    var socket = io.connect('localhost:5000');
    // socket.track('static/messages')
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  })*/
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue')
      .accentPalette('teal')
      .warnPalette('red')
      .backgroundPalette('grey');
  })  .config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider
      .icon('locked', 'static/angular-icons/baseline-lock-24px.svg', 24)
      .icon('star', 'static/angular-icons/baseline-star-24px.svg', 24)
      .icon('current', 'static/angular-icons/baseline-offline_bolt-24px.svg', 24)
      .icon('alert', 'static/angular-icons/baseline-report_problem-24px.svg', 24)
      .icon('done', 'static/angular-icons/baseline-done_outline-24px.svg', 24)
      .icon('starempty', 'static/angular-icons/round-star_border-24px.svg', 24)
      .icon('starhalf', 'static/angular-icons/round-star_half-24px.svg', 24)
      .icon('starfull', 'static/angular-icons/round-star-24px.svg', 24)
  }]);