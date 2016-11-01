angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


/*.controller('PlaylistsCtrl', function($scope, $stateParams) {
})
.controller('MyController', function(NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
})*/

.controller('PlaylistsCtrl', function($scope) {
     'use strict';
   
   
   var getPosition = function(position){
         
               $scope.$apply(function(){
                   $scope.long = position.coords.longitude;
                   $scope.lat = position.coords.latitude;
                   $scope.currentCoords = [$scope.lat, $scope.long];
                   console.log("cen" + $scope.currentCoords);
              });
              $scope.$apply(function(){
                   $scope.positions = $scope.generateMarkers($scope.lat, $scope.long);
                   console.log($scope.positions);     
              });
              
    };
     
    
    //GET CURRENT COORDS AND BIND THEM TO SCOPE     
    $scope.getCurrentCoords = function(){
         
         navigator.geolocation.getCurrentPosition(getPosition);
              
         
         //end getCurrentPosition
    };//end currentCoords function
    
    
    
         
    //CREATE RANDOM COORDS WITHIN A RADIUS FROM A CERTAIN POINT
    $scope.randomGeo = function(center, radius) {
         
         var y0 = center.latitude;
         var x0 = center.longitude;
         var rd = radius / 111300; 
     
         var u = Math.random();
         var v = Math.random();
     
         var w = rd * Math.sqrt(u);
         var t = 2 * Math.PI * v;
         var x = w * Math.cos(t);
         var y = w * Math.sin(t);
     
         //Adjust the x-coordinate for the shrinking of the east-west distances
         var xp = x / Math.cos(y0);
     
         var newlat = y + y0;
         var newlon = x + x0;
         
         
     //rethink how this gets returned
         return {
             latitude: newlat.toFixed(5),
             longitude: newlon.toFixed(5)
        };
    
     };

        
    $scope.generateMarkers = function(lat, long){
          var center = {'latitude': lat, 'longitude': long}; 
          var positions = {};
               for(var i=0; i<5; i++){
                    var randomCoordsObj = ($scope.randomGeo(center, 1000));
                     //return position then save it to scope
                     
                          positions[i] = [
                               randomCoordsObj.latitude, 
                               randomCoordsObj.longitude
                          ];
                           
               }
               console.log(positions[0] + "before the pass");
               return positions;  
               
    };//end generate markers
    //assign this to scope if conditions is met eg if !empty(positions)
           
            
    
    
    
   
    if(navigator.geolocation){
     $scope.getCurrentCoords(); //should be a master coords funtion
     
    }
    
              
        
});
    
          
     
     
     
     
      /*restaurants.positions = [
      {pos:[53.3468743, -6.2554566]},
      {pos:[53.3475933, -6.2597448]},
      {pos:[53.3498216, -6.2490655]},
      {pos:[53.360712, -6.25121]},
      {pos:[53.3474964, -6.2285078]},
      {pos:[53.3516977, -6.2606782]}
      
    ]; console.log(restaurants.positions + "2");
    
    
  });*/


