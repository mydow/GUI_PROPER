/**
 * Created by BegZ on 2017-02-20.
 */
/** A wrapper class for the api **/

$(document).ready(function(){

    var URL = "http://pub.jamaica-inn.net/fpdb/api.php";
    var adminUser = "jorass";
    var adminPass = "jorass";
    var adminAction = "user_get_all";

    var userName = "";
    var passWord = "";
    var firstName = "";
    var lastName = "";

    /* So we do a query to the DB. we retreve all users. we loop through all of them to see if we find the user */
    $("#login").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();

        $.get(URL,
            {username: adminUser, password: adminPass, action: adminAction},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    //console.log(data.type);
                    //console.log(data.payload[27].username);

                    var length = data.payload.length;
                    var i = 0;
                    var validUser = false;

                    for(i;i < length; i++) {
                        var tempUser = data.payload[i];

                        if (userName == tempUser.username) {
                            validUser = true;

                            firstName = tempUser.firstname;
                            lastName = tempUser.lastname;
                        }
                        ;
                    };

                    if(validUser){
                        //We close the modal
                        $('#myModal').modal('hide')
                    }
                    else{
                      alert("Username does not match any entry in the database.\nPlease try again.")
                    };
                };
            })

//{"type" : "error", "payload" : [{"code" : "6","msg" : "Wrong number or type of arguments"}]}
    })

   /* $("button").click(function(){
     //alert("U Klicked Da Buttn..!!!!");
     var data = send("jorass","jorass","inventory_get");
     alert("Data: " + data);
     })

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
    }*/
})
