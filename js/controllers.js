angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", function($scope) {
    $scope.allTasks = [
      {title: "吃饭", today: false},
      {title: "睡觉", today: false},
      {title: "打豆豆", today: false}
    ];

    $scope.timer = {
      label: '25:00',
      percentage: 0
    }

    $scope.addTask = function(today) {
      if (typeof $scope.newTask === "undefined") {
        return false;
      }
      task = $scope.newTask;
      task.today = today;
      $scope.allTasks.push(task);
      $scope.newTask = {};
    };

    $scope.removeTask = function(task) {
      for(index in $scope.allTasks) {
        if($scope.allTasks[index] === task) {
          $scope.allTasks.splice(index, 1);
        }
      }
    };

    $scope.startTask = function(task) {
      $scope.activeTask = task;
    };
  }]);