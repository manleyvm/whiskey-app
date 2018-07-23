angular.module('whiskeyApp').controller('MainCtrl',
['$scope','$location','dataService'/*,'socket'*/,'$mdToast',
function($scope,$location,dataService/*,socket*/, $mdToast) {
  $scope.hello = "helloasd";
  $scope.what = 'what??';
  $scope.activeUser = dataService.activeUser;
    $scope.testFn = function(){
        alert('testing');
    }
    $scope.gotoLocation = function($page){
        $location.path("/" + $page);
    }
    $scope.requestFullScreen = function(){
        // alert(document.fullscreenEnabled);
        // document.documentElement.requestFullscreen();
        // alert('testing');
    }

    $scope.testSocket = function(){
        var msg = 'test message';
        //  alert('Testing it');
        // return;
        // $scope.sendMessage = function () {
            $scope.socket.emit('test_message', {
              message: msg
            });
        
    }

    $scope.activeUserWatcher = function(){
        $scope.$watch(function () { return dataService.activeUser; },
        function (value) {
            $scope.activeUser = value;
        }  );
    }
    $scope.init = function(){
        // alert('a test');
        $scope.activeUserWatcher();
        $scope.socket = io.connect('192.168.2.2:5000');
        // $scope.socket = io.connect('localhost:5000');
        // alert('a test');


        // test thissad

        
        //more

         $scope.socket.on('test_message_response', function(socket){
            // console.log('Test message recieved:' + socket);
            //console.log(socket);
            // alert(socket[0].got.message);

            $mdToast.show(
                $mdToast.simple()
                  .textContent(socket[0].got.message)
                //   .position(pinTo )
                  .hideDelay(3000)
                  .action('Stop')
              ).then(function(response) {
                if ( response == 'ok' ) {
                  console.log('ok');
                }
              });

          });

    }
    $scope.init();

} ] );