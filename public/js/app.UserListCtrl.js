angular.module('whiskeyApp').controller('UserListCtrl',[
    '$scope','UserList','$cookies', '$mdDialog','$filter','dataService','$location',
function($scope,UserList, $cookies, $mdDialog,$filter,dataService,$location)
{
    $scope.user = null;
    $scope.uid = null;
    $scope.userList = [];
    $scope.activeUser = null;
    $scope.init = function(){
        $scope.activeUserWatcher();
        $scope.getUserList();
        $scope.getCookieUser();
        
    }

    // alert('tets');
    $scope.getCookieUser = function(){

        cookie =  $cookies.get('uid');
        if(cookie){
            var tmp = UserList.query({action:'who',id: cookie},function() {
            console.log(tmp);


            if(tmp[0].failed){
                dataService.activeUser = null;
                $cookies.remove('uid');
            } else {
                dataService.activeUser = tmp[0];
            }



            // angular.$scope.userList.forEach(element => {
                
            //     element.
            //     if(element.id == $scope.activeUser.id){

            //     }

            // });

            // if(tmp.length==0){
            //     $scope.showInvalidUserAlert(this)
            // } else {
            //     $cookies.put('uid',tmp[0]);
            //     $scope.uid  = $cookies.get('uid');

            //     arr = $filter('filter')($scope.userList, {id: $scope.user.id}, true);
            //     if(arr.length){
            //         $scope.userList[$scope.userList.indexOf(arr[0])].available = 0;
            //     }

            // }
          });
        }
    }
    $scope.getUserList = function(){
        var tmp = UserList.query(function() {
            $scope.userList = tmp;

          });
    }
    $scope.revokeUser = function(){
        var tmp = UserList.query({action:'revoke',id: $scope.user.id},function() {
            console.log(tmp);
            if(tmp.length && tmp[0].revoked){
                arr = $filter('filter')($scope.userList, {id: $scope.user.id}, true);
                if(arr.length){
                    $scope.userList[$scope.userList.indexOf(arr[0])].available = 1;
                }
            }
          });    
        }
    $scope.claimUser = function(){

        uid = $cookies.get('uid')

        var tmp = UserList.query({action:'claim',id: $scope.user.id, cookie:uid},function() {
            console.log(tmp);
            if(tmp.length==0){
                $scope.showInvalidUserAlert(this)
            } else {
                $cookies.put('uid',tmp[0].cookie);
                $scope.uid  = $cookies.get('uid');

                dataService.activeUser = tmp[0];

                // update claimed user in userlist
                arr = $filter('filter')($scope.userList, {id: tmp[0].id}, true);
                if(arr.length){
                    $scope.userList[$scope.userList.indexOf(arr[0])].available = 0;
                }

                // update released user in user list
                if( tmp[0].giveupUser != undefined){
                    arr = $filter('filter')($scope.userList, {id: tmp[0].giveupUser}, true);
                    if(arr.length){
                        $scope.userList[$scope.userList.indexOf(arr[0])].available = 1;
                    }
                }
            }
          });
    }
    $scope.showInvalidUserAlert = function(ev) {
        
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('The user could not be selected.')
            .textContent(`The user '${$scope.user.name}' could not be selected.`)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            // .targetEvent(ev)
        );
      };

    $scope.setUser = function(usr){
        $scope.user= usr;
    }

    $scope.goDrink = function () {
        $location.path('/drink');
    }
    $scope.activeUserWatcher = function(){
        $scope.$watch(function () { return dataService.activeUser; },
        function (value) {


            $scope.activeUser = value;

        }  );
    }
    $scope.init();

} ] );