(function () {
    var serviceModule = angular.module('todoApp.service',[]);

    serviceModule.service('mainService',['$window',function ($window) {
        //var todos=[
        //    {name:'写作业',completed:true,id:1},//true 不加引号
        //    {name:'洗衣服',completed:false,id:2},
        //    {name:'敲代码',completed:true,id:3}
        //];

        var todos = $window.localStorage['todo']?angular.fromJson($window.localStorage['todo']):[];
        this.save = function () {
            $window.localStorage['todo']=angular.toJson(todos);
        };

        this.getTodos = function () {
            return todos;
        };
        //	添加数据
        this.addTodo = function (text) {
            var id = new Date().getTime();
            todos.push({name:text,completed:false,id:id});
            this.save();
        };

        //删除数据
        this.removeTodo = function (index) {
            todos.splice(index,1);
            this.save();
        };

        //	获取未完成的数据条数
        this.leftCount = function(){
            var count = 0;
            for(var i = 0; i<todos.length; i++){
                if(todos[i].completed != true){
                    count++;
                }
            }
            return count;
        };

        //点击按钮 全选
        this.toggleAll = function (status) {
            for (var i = 0; i<todos.length;i++){
                todos[i].completed = !status;
            }
            this.save();
        };

        //显示清除已完成的按钮
        this.existCompleted = function(){
            for(var i = 0; i<todos.length; i++) {
                if (todos[i].completed){
                    return true;
                }
            }
            return false;
        };

        //	删除已完成的事件 即显示所有未完成的事件
        this.clearCompleted = function () {
            //var temp = []; 这里如果使用中间变量 todos就指向了中间变量 而不是原始的数组，所以删除的时候 其实是操作了中间变量，原始数组还是不变的
            for(var i = 0;i<todos.length;i++){
                //拿到已完成的 将它从todos中删除即可
                if(todos[i].completed){
                    //temp.push(todos[i]);
                   todos.splice(i,1);
                    //更新变量
                    i--;
                }
            }
           // //将所有未完成的事件再赋给temp
           //todos = temp;
            this.save();
        }
    }]);

})();