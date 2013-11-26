describe('controllers', function(){
  beforeEach(module('pomodoroApp.controllers'));
  beforeEach(module('ui.bootstrap.modal'));

  describe('pomodoroTasksController', function() {
    var scope, ctrl;
    beforeEach(inject(function($rootScope, $controller) {
      parentScope = $rootScope.$new();
      $controller('pomodoroController', {$scope: parentScope});
      $scope = parentScope.$new();
      ctrl = $controller('pomodoroTasksController', {$scope: $scope});
    }));

    describe('#addTask', function() {
      it("should add newTask to allTask if newTask's title not blank", function() {
        $scope.newTask = {title: "test task"};
        $scope.addTask()
        expect($scope.allTasks.unfinished.length).toEqual(4);
      });

      it("should not add newTask to allTask if newTask's title is blank", function() {
        $scope.addTask()
        expect($scope.allTasks.unfinished.length).toEqual(3);
      });
    });
  });
});