angular.module('pomodoroApp.controllers', []).
  controller('pomodoroController', ["$scope", function($scope) {
    $scope.allScheduledItems = [
      {title: "吃饭", todayItem: false},
      {title: "睡觉", todayItem: false},
      {title: "打豆豆", todayItem: false}
    ];

    $scope.addItemToList = function() {
      $scope.allScheduledItems.push($scope.newScheduledItem);
      $scope.newScheduledItem = {};
    };
  }]);