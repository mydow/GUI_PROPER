/**
 * Created by BegZ on 2017-02-20.
 */
/** A wrapper class for the api **/

$(document).ready(function(){

    var URL = "http://pub.jamaica-inn.net/fpdb/api.php";
    var adminUser = "jorass";
    var adminPass = "jorass";
    var adminLogin = "user_get_all";
    var adminInventory = "inventory_get";

    var userName = "";
    var passWord = "";
    var action = "";
    var firstName = "";
    var lastName = "";

    /* So we do a query to the DB. we retreve all users. we loop through all of them to see if we find the user */
    /*$("#login").click(function(){
     userName = $("#user").val();
     passWord = $("#pass").val();

     $.get(URL,
     {username: adminUser, password: adminPass, action: adminLogin},
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
     $("#nav-login").hide();
     $("#nav-user").show();
     }
     else{
     alert("Username does not match any entry in the database.\nPlease try again.")
     };
     };
     })
     })
     */

    // We need to hardcode the login here otherwise we cant show any data.
    $.get(URL,
        {username: adminUser, password: adminPass, action: adminInventory},
        function(data,status) {
            if (status != 'success') {
                alert("Status: " + status);
            } else {
                var length = data.payload.length;
                var i = 0;
                var html = "";

                for(i;i<length;i++){

                    var ID = data.payload[i].beer_id;
                    var NAME = data.payload[i].namn;
                    var PRICE = data.payload[i].pub_price;
                    var AVAILABLE = data.payload[i].count;

                    console.log(data.payload[i].beer_id);
                    console.log(length)

                    if(ID != "" && NAME != "" && AVAILABLE > 0){
                        html = html + "<tr>" +
                            "<td>"+ ID +"</td>" +
                            "<td>"+ NAME +"</td>" +
                            "<td>"+ PRICE +"</td>" +
                            "<td>"+ AVAILABLE +"</td>" +
                            "<td><span class='fa fa-info'></span></td>" +
                            "</tr>"
                    }
                }

                var table_head = "<tr>"+
                    "<th><span class='text'>Id</span></th>" +
                    "<th><span class='text'>Name</span></th>" +
                    "<th><span class='text'>Price</span></th>" +
                    "<th><span class='text'>Available</span></th>" +
                    "<th></th>" +
                    "</tr>"

                document.getElementById("header_table").innerHTML = table_head;
                document.getElementById("insert_table").innerHTML = html;
            };
        })

    $("#login").click(function(){
        alert("You actually cant login proper. The API does not support it."+
            "\nWe just store the what the user enters in the input fields and"+
            "\nchecks if the user is valid on each call to the DB.");
        userName = $("#user").val();
        passWord = $("#pass").val();

        $('#myModal').modal('hide')
    })

    // Inventory_get
    // Role: admin
    // Gives a list of all drinks available in the system.
    // Example: {"namn" : "Anchor Steam Beer","namn2" : "","sbl_price" : "23.90","pub_price" : "25","beer_id" : "157503","count" : "10","price" : "20.60"},
    $("#inventory_get").click(function(){

        //userName = adminUser;
        //passWord = adminPass;

        action = "inventory_get";

        var html = "";
        var i = 0;

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else {
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {

                        var length = data.payload.length;
                        for(i;i<length;i++){

                            var ID = data.payload[i].beer_id;
                            var NAME = data.payload[i].namn;
                            var SBL_PRICE = data.payload[i].sbl_price;
                            var PUB_PRICE = data.payload[i].pub_price;
                            var PRICE = data.payload[i].price;
                            var AVAILABLE = data.payload[i].count;

                            if(ID != "" && NAME != ""){
                                html = html + "<tr>" +
                                    "<td>"+ ID +"</td>" +
                                    "<td>"+ NAME +"</td>" +
                                    "<td>"+ SBL_PRICE +"</td>" +
                                    "<td>"+ PUB_PRICE +"</td>" +
                                    "<td>"+ PRICE +"</td>" +
                                    "<td>"+ AVAILABLE +"</td>" +
                                    "</tr>"
                            }
                        }

                        var table_head = "<tr>"+
                            "<th><span class='text'>Id</span></th>" +
                            "<th><span class='text'>Name</span></th>" +
                            "<th><span class='text'>sbl_Price</span></th>" +
                            "<th><span class='text'>pub_Price</span></th>" +
                            "<th><span class='text'>Price</span></th>" +
                            "<th><span class='text'>Available</span></th>" +
                            "</tr>"

                        document.getElementById("header_table").innerHTML = table_head;

                        document.getElementById("insert_table").innerHTML = html;
                    };
                })
        }
    })

    //Purchases_get
    // Role: user
    // Gives a list of all purchases made by the specified user
    $("#purchaces_get").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "purchases_get";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Purchases_get_all
    // Role: admin
    // Gives a list of all purchases made by all users
    $("#purchaces_get_all").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "purchases_get_all";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Purchases_append, should be used when an item is purchased, ie no link
    // Role: user
    // Additional parameter: beer_id
    // Adds a purchase of one beer to the system for the specified user. The id of the beer purchased beer is a
    // required additional parameter.
    $("#purchaces_append").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "purchases_append";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Payments_get
    // Role: user
    // Returns a list of payments made by the specified user
    $("#payments_get").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "payments_get";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Payments_get_all
    // Role: admin
    // Returns a list of payments made by all users.
    $("#payments_get_all").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "payments_get_all";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Payments_append: should be used when an item is payed for, ie no link
    // Role: user
    // Additional parameter: amount, user_id
    // Adds a payment of specified amount to the system for the specified user. The amount is a required
    // additional parameter.
    $("#payments_append").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "payments_append";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Iou_get
    // Role: user
    // Returns the total amount that the specified user has at his disposal for buying beer. A negative balance
    // means that the user has a debt.
    $("#iou_get").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "iou_get";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Iou_get_all
    // Role: admin
    // Returns all users and amounts they have at their disposal. For users with a negative balance it means
    // that they have a debt.
    $("#iou_get_all").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "iou_get_all";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Beer_data_get: should be used when information about beer is needed, ie no link
    // Role: user
    // Additional parameter: beer_id
    // Returns all information available in the system for a specified beer. This includes name, price, alcohol
    // volume, etc. The id of the beer for inquiry is a required additional parameter
    $("#beer_data_get").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "beer_data_get";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //User_edit
    // Role: admin
    // Additional parameters: new_username, new_password, first_name, last_name, email, phone
    // Updates user information. All user information is required as additional parameters.
    $("#user_edit").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "user_edit";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //User_get_all
    // Role: admin
    // Returns all users in the system.
    $("#user_get_all").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "user_get_all";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //Inventory_append
    // Additional parameters: beer_id, amount, price
    // Updates the number of bottles available in stock and the price for a particular beer. The id of the beer
    // to be updated is required along with its price and current amount of available bottles.
    $("#inventory_append").click(function(){
        userName = $("#user").val();
        passWord = $("#pass").val();
        action = "inventory_append";
        $.get(URL,
            {username: userName, password: passWord, action: action},
            function(data,status) {
                if (status != 'success') {
                    alert("Status: " + status);
                } else {
                    console.log(data.type);
                    //console.log(data.payload[27].username);

                };
            })
    })

    //{"type" : "error", "payload" : [{"code" : "6","msg" : "Wrong number or type of arguments"}]}
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
