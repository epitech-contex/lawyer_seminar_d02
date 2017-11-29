// This file contains all the code used in the view index.html. This is CLIENT code

// Boilerplate from the framework
angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {


  // We'll use that to store data
  $scope.formData = {};
  $scope.todoData = {};

  // This is the http GET action defined in routes/index.js
  $http.get('/api/v1/todos')
  .success((data) => {

    // We store the data we got from the server
    $scope.todoData = data;
  })

  // This code is called when a button is clicked in index.html.
  $scope.createTodo = () => {

    // This is the http POST action defined in routes/index.js. $scope.formData comes from the web page (index.html) form data
    $http.post('/api/v1/todos', $scope.formData)
    .success((data) => {

      // We empty the form
      $scope.formData = {};

      // We get the new data
      $scope.todoData = data;
    })
  };

  // This code is called when the checkbox is clicked in index.html
  $scope.deleteTodo = (todoID) => {

    // This is the http DELETE action defined in routes/index.js. todoId comes from index.html
    $http.delete('/api/v1/todos/' + todoID)
    .success((data) => {

      // We display the new data
      $scope.todoData = data;
    })
  };
});
