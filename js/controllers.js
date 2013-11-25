angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", "$timeout", function($scope, $timeout) {
    $scope.allTasks = { finished: [],
                        unfinished: [
                          {title: "吃饭", description: "使用 CoffeeScript 和 Sass 来写 Javascript 和 Css 提高开发效率", today: false},
                          {title: "睡觉", description: "一切都需要从先上传一个头像开始", today: false},
                          {title: "打豆豆", description: "Matz 曾说过“你应该升级到 Ruby 2.0 了”", today: false}
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

    $scope.notifyMe = function() {
      if (!("Notification" in window)) {
        return false;
      }
      else if (Notification.permission === "granted") {
        var notification = new Notification("恭喜你！", {body: "又完成了一个番茄钟!", icon: "/image/notification-icon.jpg"});
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === "granted") {
            var notification = new Notification("恭喜你！", {body: "又完成了一个番茄钟!", icon: "/image/notification-icon.jpg"});
          }
        });
      }
    };

    $scope.onTimeout = function(){
        $scope.timerStatus.count++;
        $scope.timerStatus.percentage = $scope.timerStatus.count / (25 * 60);
        $scope.timerStatus.label = $scope.secondsToMMSS(25 * 60 - $scope.timerStatus.count);
        if ($scope.timerStatus.percentage >= 1) {

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
      task.today = today;
      $scope.allTasks.unfinished.push(task);
      $scope.newTask = {};
      $scope.openNewTaskForm = false;
    };
  }]);
