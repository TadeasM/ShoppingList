var myApp = angular.module('myApp', ['firebase'])
  .constant('FIREBASE_URL', 'https://nakupniseznam.firebaseio.com/');
 
myApp.controller('myCtrl',
  ['$scope', '$rootScope', '$firebaseArray', 'FIREBASE_URL',
  function
  ($scope, $rootScope, $firebaseArray, FIREBASE_URL) {

    var nakupRef = new Firebase(FIREBASE_URL + '/nakup');
    var nakupInfo = $firebaseArray(nakupRef);
    $scope.products = nakupInfo;
    $scope.addItem = function () {
        console.log('a jedem...');
        nakupInfo.$add({
            polozka: $scope.addMe,
            date: Firebase.ServerValue.TIMESTAMP,
            mark: "no"
            
          }).then(function() {
            $scope.addMe = '';
          }); //promise
        }; // addmItem
    $scope.deleteItem = function(key) {
          nakupInfo.$remove(key);
        }; //delete costs

    $scope.inCart = function(cart) {
      var id = cart.$id;
      var mojeRef = nakupRef.child(id);
      mojeRef.update({
          mark: "yes"
      });
    };
    $scope.setColor = function (x) {
      if (x.mark = "yes") {
        return '{color: green}'
      }
    }
}]); 