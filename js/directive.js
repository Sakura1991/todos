(function(){
    angular.module('todoApp.directive',[]).directive('focus',['$timeout',function ($timeout) {
        return{
            link: function (scope,ele,attr) {

                //console.log(ele[0]);
                //console.log(attr.focus);
                scope.$watch(attr.focus,function(now){
                    if (now){
                        $timeout(function () {
                            ele[0].focus();
                        },0)
                    }

                })
            }
        }
    }])
})();