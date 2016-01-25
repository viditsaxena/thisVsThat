  console.log('app.js is loaded');


angular.module('thisVsThat', ['ngCookies']);

angular.module('thisVsThat').controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.welcomeMessage = 'Hello from Angular';
  $scope.users = [];
  $scope.searchQuery = "";
  $scope.orderByField = 'name';
  $scope.newUser = {};
  $scope.logInUser = {};
  $scope.comparisions = [];
  $scope.newComparision = {name: '', items:[{}]};
  $scope.isDisabled = false;


  // ============== Users ================

  $scope.getUsers = function(){
    $http.get('/api/users').then(function(response){
      $scope.users = response.data;
    });
  };
  $scope.getUsers();

  $scope.createUser = function(){
    $http.post('/api/users', $scope.newUser).then(function(response){
      $scope.users.push(response.data);
      $scope.newUser = {};
    });
  };

  $scope.obtainToken = function(){
    $http.post("/api/users/authentication_token", $scope.logInUser).then(function(reponse){
      $scope.token = reponse.data.token;
      $cookies.put('token', $scope.token);

    });
  };

  $scope.logOut = function(){
    $cookies.remove('token');
    $scope.token = $cookies.get('token');
    $scope.logInUser = {};
  };

  $scope.token = $cookies.get('token');


// angular.module('thisVsThat').controller('ComparisionsController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
//   $scope.token = $cookies.get('token');

  $scope.getComparisions = function(){
    $http.get('/api/comparisions').then(function(response){
      $scope.comparisions = response.data;
      });
  };
  $scope.getComparisions();


  $scope.addComparision = function(){
    $http({
      url: '/api/comparisions',
      method: 'post',
      data: $scope.newComparision
    }).then(function(response){
      $scope.getComparisions();
      $scope.newComparision = {name: '', items:[{}]};
    });
  };

  $scope.addItem = function(){
    $scope.newComparision.items.push({});
  };

  $scope.removeComparision = function(comparision){
        var url = '/api/comparisions/' + comparision._id;
        $http.delete(url).then(function(){
        $scope.getComparisions();
        });
    };

  $scope.updateComparision = function(comparision){
      // var comparision = $scope.comparisions[$index];
      var url = '/api/comparisions/' + comparision._id;
      $http.patch(url, comparision).then(function(response){
        console.log(response.data);
          comparision = response.data;
      });
  };


  $scope.disableButton = function(comparision, item) {
           $scope.isDisabled = true;
           item.votes = parseInt(item.votes) + 1;
           $scope.updateComparision(comparision);
       };

}]);
