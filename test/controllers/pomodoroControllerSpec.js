describe('controllers', function(){
  beforeEach(module('pomodoroApp.controllers'));

  describe('pomodoroController', function() {
    var scope, ctrl;
    beforeEach(inject(function($rootScope, $controller, $injector) {
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();
      ctrl = $controller('pomodoroController', {$scope: $scope, $timeout: $timeout});
    }));

    afterEach(function() {
      if(typeof mytimeout !== "undefined") {
        $timeout.cancel(mytimeout);
      }
    });

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

    describe('timerStatus#reset', function() {
      it("should reset status to default value", function () {
        $scope.timerStatus.count = 100;
        $scope.timerStatus.label = '100';
        $scope.timerStatus.percentage = 1;
        $scope.timerStatus.reset();
        expect($scope.timerStatus.count).toEqual(0);
        expect($scope.timerStatus.percentage).toEqual(0);
        expect($scope.timerStatus.label).toEqual("25:00");
      });
    });

    describe('#startTimer', function() {
      it("should create mytimeout", function() {
        mytimeout = undefined;
        $scope.startTimer();
        expect(mytimeout).toBeDefined();
      });

      it("should cancel previous timer before start", function() {
        mytimeout = $timeout($scope.onTimeout,1000);
        $scope.timerStatus.count = 1;
        $scope.startTimer();
        expect($scope.timerStatus.count).toEqual(0);
      })
    });

    describe('#onTimeout', function() {
      it("should increase timerStatus.count by 1", function() {
        $scope.onTimeout();
        expect($scope.timerStatus.count).toEqual(1);
      });

      it("should create the next mytimeout", function() {
        $scope.onTimeout();
        expect(mytimeout).toBeDefined();
      });
    });

    describe('#secondsToMMSS', function() {
      it("should convert seconds to MM:SS format", function() {
        expect($scope.secondsToMMSS(100)).toEqual("01:40");
        expect($scope.secondsToMMSS(66)).toEqual("01:06");
        expect($scope.secondsToMMSS(671)).toEqual("11:11");
      });
    });
  });
});