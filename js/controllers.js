angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", "$timeout", function($scope, $timeout) {
    $scope.allTasks = [
      {title: "吃饭", today: false},
      {title: "睡觉", today: false},
      {title: "打豆豆", today: false}
    ];

    $scope.timerStatus = {
      label: '25:00',
      percentage: 0,
      count: 0,
      reset: function() {
        this.count = 0;
        this.percentage = 0;
        this.label = "25:00";
      }
    };

    $scope.onTimeout = function(){
        $scope.timerStatus.count++;
        $scope.timerStatus.percentage = $scope.timerStatus.count / (25 * 60);
        $scope.timerStatus.label = $scope.secondsToMMSS(25 * 60 - $scope.timerStatus.count);
        mytimeout = $timeout($scope.onTimeout,1000);
    };

    $scope.startTimer = function() {
      if(typeof mytimeout !== "undefined") {
        $timeout.cancel(mytimeout);
        $scope.timerStatus.reset();
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    };
    // $scope.stop = function(){
    //     $timeout.cancel(mytimeout);
    // }

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
      $scope.startTimer();
    };

    $scope.secondsToMMSS =  function(timeInSeconds) {
      var minutes = Math.floor(timeInSeconds / 60);
      var seconds = timeInSeconds - minutes * 60;
      if(minutes < 10) {
        minutes = "0" + minutes;
      }
      if(seconds < 10) {
        seconds = "0" + seconds
      }
      return minutes + ":" + seconds;
    };
  }]);