(function () {
    var controllerModule = angular.module('todoApp.controller',['ngRoute','todoApp.service','todoApp.directive']);
    controllerModule.controller('MainCtrl',['$scope','$location','$routeParams','mainService',function ($scope,$location,$routeParams,mainService) {
        $scope.text="";

        //所有信息的列表数据
        $scope.todos = mainService.getTodos();

        $scope.saveTodos = function(){
            mainService.save();
        }

        //	添加数据
        $scope.addTodo = function (event) {

            //判断输入框是否为空 如果是空 就直接返回 不执行
            if($scope.text ==0){return};
            mainService.addTodo($scope.text);

            //	清空输入框
            $scope.text = '';
        };

        //删除数据
        $scope.removeTodo=function(index){
            mainService.removeTodo(index);
        };

        //	编辑数据
        $scope.editIndex = -1;
        $scope.editTodo = function (index) {
            $scope.editIndex = index;
        };
        //	保存编辑的数据
        $scope.saveTodo = function(){
            //if(event.keyCode == 13){
                $scope.editIndex = -1;
            //}
        };

        //	获取未完成的数据条数

        $scope.leftCount = function (){

            var count = mainService.leftCount();
            //是否全选
            //if(count == 0){
            //	$scope.allChecked = true;
            //}else{
            //	$scope.allChecked = false;
            //};

            $scope.allChecked = !count;

            return count;
        };

        //点击按钮 全选
        $scope.toggleAll = function () {
            mainService.toggleAll($scope.allChecked);
        };
        //显示清除已完成的按钮
        $scope.existCompleted = function(){

            return  mainService.existCompleted();
        };

        //	删除已完成的事件 即显示所有未完成的事件
        $scope.clearCompleted = function(){
            mainService.clearCompleted();
        };

        //	底部切换状态
        //	第一种方式
        //	$scope.all = function(){
        //		$scope.search = '';
        //	};
        //
        //	$scope.active = function(){
        //		$scope.search = {completed:false};
        //	};
        //
        //	$scope.completed = function(){
        //		$scope.search = {completed:true};
        //	};
        //$scope.location
        //console.log($location);
        //console.log($location.$$path);
        //console.log($location.path());

        //	第二种方式
        //$scope.location = $location;
        //$scope.$watch('location.path()',function(){
        //	switch ($location.path()){
        //		case '/active':
        //			$scope.search = {completed:false};
        //			break;
        //		case '/completed':
        //			$scope.search = {completed:true};
        //			break;
        //		default:
        //			$scope.search = '';
        //			break;
        //	}
        //})
        // 	第三种方式(路由)
        $scope.status = $routeParams.status ||'';
        //console.log(status);
        switch ($routeParams.status){
            case 'active':
                $scope.search = {completed:false};
                break;
            case 'completed':
                $scope.search = {completed:true};
                break;
            default:
                $scope.search = '';
                break;
        }
    }]);
})();