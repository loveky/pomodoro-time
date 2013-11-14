var pomodoroController = function($scope) {
  $scope.allScheduledItems = [
    {name: "吃饭"},
    {name: "睡觉"},
    {name: "打豆豆"}
  ];

  $scope.addItemToList = function() {
    $scope.allScheduledItems.push({name: $scope.newScheduledItem});
    $scope.newScheduledItem = '';
  };
}