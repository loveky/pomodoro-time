angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", function($scope) {
    $scope.allTasks = [
      {title: "吃饭", today: false},
      {title: "睡觉", today: false},
      {title: "打豆豆", today: false}
    ];

    $scope.addTask = function() {
      $scope.allTasks.push($scope.newTask);
      $scope.newTask = {};
    };
  }]);