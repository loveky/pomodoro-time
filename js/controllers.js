angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", "$timeout", "$modal", function($scope, $timeout, $modal) {
    $scope.allTasks = { finished: [],
                        unfinished: [
                          {title: "吃饭", description: "使用 CoffeeScript 和 Sass 来写 Javascript 和 Css 提高开发效率", today: false, used_pomodoro: 0},
                          {title: "睡觉", description: "一切都需要从先上传一个头像开始", today: false, used_pomodoro: 0},
                          {title: "打豆豆", description: "Matz 曾说过“你应该升级到 Ruby 2.0 了”", today: false, used_pomodoro: 0}
                        ]};

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

    $scope.getTimes = function(n) {
      return new Array(n);
    };

    $scope.askForFinishStatus = function () {

      var modalInstance = $modal.open({
        templateUrl: 'askForFinishStatus.html',
        keyboard: false,
        controller: 'askForFinishStatusController'
      });

      modalInstance.result.then(function(status) {
        $scope.activeTask.used_pomodoro += 1;
        if(status === true) {
          $scope.allTasks.finished.push($scope.activeTask);
          $scope.removeTask($scope.activeTask);
        }

        $scope.timerStatus.reset();
        $scope.activeTask = null;
      });
    };

    $scope.onTimeout = function(){
        $scope.timerStatus.count++;
        $scope.timerStatus.percentage = $scope.timerStatus.count / (25 * 60);
        $scope.timerStatus.label = $scope.secondsToMMSS(25 * 60 - $scope.timerStatus.count);
        if ($scope.timerStatus.percentage >= 1) {
          $scope.askForFinishStatus();
        }
        else {
          mytimeout = $timeout($scope.onTimeout,1000);
        }
    };

    $scope.startTimer = function() {
      if(typeof mytimeout !== "undefined") {
        $timeout.cancel(mytimeout);
        $scope.timerStatus.reset();
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    };

    $scope.stopTimer = function() {
      $timeout.cancel(mytimeout);
      $scope.timerStatus.reset();
    };

    $scope.removeTask = function(task) {
      for(index in $scope.allTasks.unfinished) {
        if($scope.allTasks.unfinished[index] === task) {
          $scope.allTasks.unfinished.splice(index, 1);
        }
      }
    };

    $scope.startTask = function(task) {
      $scope.activeTask = task;
      $scope.startTimer();
    };

    $scope.breakActiveTask = function() {
      $scope.activeTask = null;
      $scope.stopTimer();
    }

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
  }]).
  controller('pomodoroTasksController', ["$scope", function($scope) {
    $scope.addTask = function(today) {
      if (typeof $scope.newTask === "undefined") {
        return false;
      }
      task = $scope.newTask;
      task.used_pomodoro = 0;
      task.today = today;
      $scope.allTasks.unfinished.push(task);
      $scope.newTask = {};
      $scope.openNewTaskForm = false;
    };
  }]).
  controller('askForFinishStatusController', ["$scope", "$modalInstance", function($scope, $modalInstance) {
    $scope.close = function(status) {
      $modalInstance.close(status);
    };
  }]);
