angular.module('whiskeyApp').controller('DrinkCtrl'
,['$scope','UserList','$cookies', '$mdDialog','$filter','dataService','NoteRating','$mdToast','$timeout','$filter',
function($scope,UserList, $cookies, $mdDialog,$filter,dataService,NoteRating,$mdToast,$timeout,$filter) 
{
    $scope.user = null;
    $scope.uid = null;
    $scope.selectedTab = 0;
    $scope.adminUser = 0;
    $scope.drinkList = [
        {id:0
            ,wh_name:'Suntory Chita'
            ,current:true
            ,finished:false
            ,locked:false
            ,reveal:false
            ,rating:3
            ,wh_notes_types:[
                 {note_type:"Colour"    ,rating:3, note_label:"Bright gold"}
                ,{note_type:"Aroma"     ,rating:2, note_label:"Crème brûlée, cardamom, acacia honey, blossoming rose Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, neque. Vitae voluptates fuga corrupti est error accusamus ex dolore dolor placeat officiis, pariatur necessitatibus repudiandae blanditiis provident maxime eaque eveniet recusandae perspiciatis adipisci id consequuntur ipsa quis, iste similique! Sequi tempora nisi magni esse ad officiis repellendus ducimus earum nihil.",
                note_ratings:[
                    {note:'Currents'       ,ratingId:100,rating:0,neutral:7,also:['Mark','Kate']}
                   ,{note:'Cedar'          ,ratingId:101,rating:0,neutral:9,also:[]}
                   ,{note:'Mocha Expresso' ,ratingId:102,rating:0,neutral:8,also:[]}
               ]
                }
                ,{note_type:"Taste"     ,rating:1, note_label:"Mild and smooth, hint of mint, deep honey"}
                ,{note_type:"Finish"    ,rating:4, note_label:"Clean and clear, spiced oak with subtle bittersweet notes"}




            ]
            ,wh_brought_by:"Kate"

    },{id:1
        ,wh_name:'Suntory Chita'
        ,current:false
        ,finished:false
        ,locked:true
        ,reveal:false
        ,rating:-1
        ,wh_notes_types:[
             {note_type:"Colour"    , note_label:"Bright gold"}
            ,{note_type:"Aroma"     , note_label:"Crème brûlée, cardamom, acacia honey, blossoming rose Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, neque. Vitae voluptates fuga corrupti est error accusamus ex dolore dolor placeat officiis, pariatur necessitatibus repudiandae blanditiis provident maxime eaque eveniet recusandae perspiciatis adipisci id consequuntur ipsa quis, iste similique! Sequi tempora nisi magni esse ad officiis repellendus ducimus earum nihil.",
            note_ratings:[
                {note:'Currents'       ,ratingId:100,rating:0,neutral:7,also:['Mark','Kate']}
               ,{note:'Cedar'          ,ratingId:101,rating:0,neutral:9,also:[]}
               ,{note:'Mocha Expresso' ,ratingId:102,rating:0,neutral:8,also:[]}
           ]
            }
            ,{note_type:"Taste"     , note_label:"Mild and smooth, hint of mint, deep honey"}
            ,{note_type:"Finish"    , note_label:"Clean and clear, spiced oak with subtle bittersweet notes"}

        ]
        ,wh_brought_by:"Kate"
},
    {id:2
        ,wh_name:'Suntory Chita'
        ,current:false
        ,finished:false
        ,locked:true
        ,reveal:false
        ,rating:-1
        ,wh_notes_types:[
             {note_type:"Colour"    , note_label:"Bright gold"}
            ,{note_type:"Aroma"     , note_label:"Crème brûlée, cardamom, acacia honey, blossoming rose",
            note_ratings:[
                {note:'Currents'       ,ratingId:100,rating:0,neutral:7,also:['Mark','Kate']}
               ,{note:'Cedar'          ,ratingId:101,rating:0,neutral:9,also:[]}
               ,{note:'Mocha Expresso' ,ratingId:102,rating:0,neutral:8,also:[]}
           ]
            }
            ,{note_type:"Taste"     , note_label:"Mild and smooth, hint of mint, deep honey"}
            ,{note_type:"Finish"    , note_label:"Clean and clear, spiced oak with subtle bittersweet notes"}




        ]
        ,wh_brought_by:"Kate"
},
{id:3
    ,wh_name:'Suntory Chita'
    ,current:false
    ,finished:false
    ,locked:true
    ,reveal:false
    ,rating:-1
    ,wh_notes_types:[
         {note_type:"Colour"    , note_label:"Bright gold"}
        ,{note_type:"Aroma"     , note_label:"Crème brûlée, cardamom, acacia honey, blossoming rose",
        note_ratings:[
            {note:'Currents'       ,ratingId:100,rating:0,neutral:7,also:['Mark','Kate']}
           ,{note:'Cedar'          ,ratingId:101,rating:0,neutral:9,also:[]}
           ,{note:'Mocha Expresso' ,ratingId:102,rating:0,neutral:8,also:[]}
       ]
        }
        ,{note_type:"Taste"     , note_label:"Mild and smooth, hint of mint, deep honey"}
        ,{note_type:"Finish"    , note_label:"Clean and clear, spiced oak with subtle bittersweet notes"}




    ]
    ,wh_brought_by:"Kate"
}

    ];

    // $scope.moveToDrinkTimeout = null;
    $scope.moveToDrinkTimeoutCancel = function(){
        if ( !angular.isDefined($scope.moveToDrinkTimeout ) ) return;

        $timeout.cancel($scope.moveToDrinkTimeout);

    }
    $scope.moveToDrinkTimeoutStart = function(data){
        if ( angular.isDefined($scope.moveToDrinkTimeout ) ) return;

        var arr = $filter('filter')($scope.drinkList,{id:parseInt(data.toDrinkId)},true);
            
        if(arr.length){
            // $scope.selectedTab = $scope.drinkList.indexOf(arr[0]);
            // arr[0].current=true;
            arr[0].locked=false;
        }

        $scope.moveToDrinkTimeout = $timeout(function(data) { 


            var arr = $filter('filter')($scope.drinkList,{current:true},true);
            
            angular.forEach(arr,function(obj){
                obj.current=false;
            });


            var arr = $filter('filter')($scope.drinkList,{id:parseInt(data.toDrinkId)},true);
            
            if(arr.length){
                $scope.selectedTab = $scope.drinkList.indexOf(arr[0]);
                arr[0].current=true;
                // arr[0].locked=false;
            }

            $scope.moveToDrinkTimeout = undefined;
        }, 5000,true,data);
    }
    
    $scope.cycleRating = function(noteType,val){
        
        switch(noteType.rating - val){
            case 0:
            case -0.5:
                noteType.rating -= .5;
                break;
            default:
            noteType.rating = val;
        }

        if(noteType.rating==0){
            noteType.rating=-1;
        }

    }

    $scope.updateRating = function(note){
        var tmp = NoteRating.query({cookie:dataService.activeUser.cookie,noteId: note.ratingId, rating: note.rating},function() {
            console.log(tmp);
          });    
    }
    $scope.adminRevealDrink = function(id){
        // console.log(dataService.activeUser);

        if(dataService.activeUser.admin){
            $scope.socket.emit('admin_reveal_drink', id);
        }
    }
    $scope.toggleNoteRating = function(note){
        switch(note.rating){
            case -1:
            case 0:
                note.rating++;
                break;
            default:
                note.rating=-1;
        }
    }

    $scope.activeUser = null;
    $scope.init = function(){
        // $scope.activeUserWatcher();
        // $scope.getUserList();
        // $scope.getCookieUser();
        if(dataService.activeUser != undefined){
            $scope.activeUser = dataService.activeUser;
        }
        $scope.socketWatchers();
    }

    $scope.socketWatchers = function(){

        // if(!angular.isUndefined($scope.socket)){
        //     return;   
            
        // };
        // $scope.socket = io.connect('192.168.2.2:5000');


        $scope.socket.on('reveal_drink',function(data){

            // $scope.moveToDrinkTimeoutStart(socket);
            arr = $filter('filter')($scope.drinkList,{id:parseInt(data.revealDrinkId)},true);

            if(arr.length){
                arr[0].reveal=true;
            }

            $mdToast.show(
                $mdToast.simple()
                  .textContent("Revealing drink " + data.revealDrinkId)
                  .hideDelay(2000)
              );
        });

        $scope.socket.on('finish_drink',function(data){

            // $scope.moveToDrinkTimeoutStart(socket);
            arr = $filter('filter')($scope.drinkList,{id:parseInt(data.finishDrinkId)},true);

            if(arr.length){
                arr[0].finished=true;
            }

            $mdToast.show(
                $mdToast.simple()
                  .textContent("Finishing drink " + data.finishDrinkId)
                  .hideDelay(2000)
              );
        });

        $scope.socket.on('move_to_drink',function(data){

            console.log(data)

            $scope.moveToDrinkTimeoutStart(data);

            msg =                 $mdToast.simple()
            .textContent("Moving to drink " + data.toDrinkId)
          //   .position(pinTo )
            .hideDelay(5000)
            .action('Stop');



            $mdToast.show(msg).then(function(response) {
                if ( response == 'ok' ) {

                  $scope.moveToDrinkTimeoutCancel();
                }
              });
        });
    }

     $scope.init();

} ] );