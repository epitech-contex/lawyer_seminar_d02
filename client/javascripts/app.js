// This file contains all the code used in the view index.html. This is CLIENT code

// Boilerplate from the framework
angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {


  // We'll use that to store data
  $scope.todoData = {};

  // This is the http GET action defined in routes/index.js
  $http.get('/api/v1/todos')
  .success((data) => {

    // We store the data we got from the server
    $scope.todoData = data;
  })

 
});
