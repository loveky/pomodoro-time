describe('controllers', function(){
  beforeEach(module('pomodoroApp.controllers'));

  describe('pomodoroController', function() {
    var scope, ctrl;
    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      ctrl = $controller('pomodoroController', {$scope: $scope});
    }));

    it('should set 3 default tasks in allTask', function() {
      expect($scope.allTasks.length).toEqual(3);
    });

    describe('#addTask', function() {
      it("should add newTask to allTask if newTask's title not blank", function() {
        $scope.newTask = {title: "test task"};
        $scope.addTask()
        expect($scope.allTasks.length).toEqual(4);
      });

      it("should not add newTask to allTask if newTask's title is blank", function() {
        $scope.addTask()
        expect($scope.allTasks.length).toEqual(3);
      });
    });

    describe('#removeTask', function() {
      it("should remove task", function() {
        $scope.removeTask($scope.allTasks[0]);
        expect($scope.allTasks.length).toEqual(2);
      });
    });

    describe('#startTask', function() {
      it("should set task as activeTask", function() {
        $scope.startTask($scope.allTasks[0]);
        expect($scope.activeTask).toBe($scope.allTasks[0]);
      });
    });
  });
});