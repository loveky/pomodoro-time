angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", "$timeout", "$modal", "$window", function($scope, $timeout, $modal, $window) {
    mp3Source = document.createElement('source');
    mp3Source.setAttribute('src', '/audios/alert.mp3');
    oggSource = document.createElement('source');
    oggSource.setAttribute('src', '/audios/alert.ogg');
    alertAudio = document.createElement('audio');
    alertAudio.appendChild(mp3Source);
    alertAudio.appendChild(oggSource);
    alertAudio.load()

    $scope.alertAudio = alertAudio;

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

    $scope.config = {
      desktopNotification: false
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

    $scope.requestNotificationPermission = function() {
      $scope.config.desktopNotification = ! $scope.config.desktopNotification;
      if ($window.Notification.permission !== 'denied' || $window.Notification.permission !== 'granted') {
        $window.Notification.requestPermission(function (permission) {
          if(!(permission in $window.Notification)) {
            $window.Notification.permission = permission;
          }
        });
      }
    }

    $scope.showDesktopNotification = function() {
      if(window.chrome) {
        new $window.Notification("恭喜你,又完成了一个番茄钟!", {icon: "./image/notification-icon.jpg"});
      }
      else {
        $window.Notification.requestPermission(function (permission){
          if(permission == 'granted') {
            new $window.Notification("恭喜你,又完成了一个番茄钟!", {icon: "./image/notification-icon.jpg"});
          }
        });
      }
    };

    $scope.onTimeout = function(){
        $scope.timerStatus.count++;
        $scope.timerStatus.percentage = $scope.timerStatus.count / (25 * 60);
        $scope.timerStatus.label = $scope.secondsToMMSS(25 * 60 - $scope.timerStatus.count);
        if ($scope.timerStatus.percentage >= 1) {
          $scope.askForFinishStatus();
          $scope.alertAudio.play();
          if ($scope.config.desktopNotification) {
            $scope.showDesktopNotification();
          }
        }
        else {
          mytimeout = $timeout($scope.onTimeout,1000);
        }
        $window.Piecon.setProgress(Math.floor($scope.timerStatus.percentage * 100));
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
      $window.Piecon.reset();
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
  controller('askForFinishStatusController', ["$scope", "$modalInstance", "$window", function($scope, $modalInstance, $window) {
    $scope.close = function(status) {
      $modalInstance.close(status);
      $window.Piecon.reset();
    };
  }]);
