/**
 * Created by BegZ on 2017-02-20.
 */
/** A wrapper class for the api **/

$(document).ready(function(){

    var URL = "http://pub.jamaica-inn.net/fpdb/api.php";

    $("#login").click(function(){
        var user = $("#user").val();
        var pass = $("#pass").val();
        var data = send(user,pass,"iou_get");
        //alert(data["type"]);
        //console.log(data.type);

        //{"type" : "error", "payload" : [{"code" : "6","msg" : "Wrong number or type of arguments"}]}
    })

    /*$("button").click(function(){
     //alert("U Klicked Da Buttn..!!!!");
     var data = send("jorass","jorass","inventory_get");
     alert("Data: " + data);
     })*/

    function send(user,pass,action){
        var DATA = {};

        $.get(URL,
            {username: user, password: pass, action: action},
            function(data,status){
                if(status != 'success'){
                    alert("Status: " + status);
                }else{
                    //DATA = data;
                    console.log(data.type);
                    DATA = data;
                    console.log("inner DATA.type: " + DATA.type);
                }
            });

        console.log("outer DATA.type: " + DATA.type);
        //return DATA;
    }
})
