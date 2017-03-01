$(document).ready(function(){

    /* API WRAPPER FUNCTIONS */

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

    $("#login").click(function(){
        alert("You actually cant login proper. The API does not support it."+
            "\nWe just store the what the user enters in the input fields and"+
            "\nchecks if the user is valid on each call to the DB.");
        userName = $("#user").val();
        passWord = $("#pass").val();

        $('#myModal').modal('hide')
    })

    /* USER SPECIFIC */

    //Purchases_get
    // Role: user
    // Gives a list of all purchases made by the specified user
    $("#purchaces_get").click(function(){
        action = "purchases_get";

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else {
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function (data, status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);
                        var html = "";
                        var i = 0;
                        var length = data.payload.length;
                        var SUM = 0.00;

                        for(i;i < length; i++){

                            var NAME = data.payload[i].namn;
                            var PRICE = data.payload[i].price;
                            var TIME = data.payload[i].timestamp;

                            if(NAME != ""){
                                html = html + "<tr>" +
                                    "<td>"+ TIME +"</td>" +
                                    "<td>"+ NAME +"</td>" +
                                    "<td>"+ PRICE +"</td>" +
                                    "</tr>"
                            }

                            SUM = SUM + parseFloat(PRICE);
                        }

                        var table_title = "Your purchases.";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Time</span></th>" +
                            "<th><span class='text'>Name</span></th>" +
                            "<th><span class='text'>Price</span></th>" +
                            "</tr>"

                        var data = "<p>"+ "Total: "+ SUM.toFixed(2) +"</p>"

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                            document.getElementById("post_table_data").innerHTML = data;
                        });
                    };
                })
        }
    })

    //Payments_get
    // Role: user
    // Returns a list of payments made by the specified user
    $("#payments_get").click(function(){
        action = "payments_get";

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else {
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    }  else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);
                        var html = "";
                        var i = 0;
                        var length = data.payload.length;
                        var SUM = 0.00;

                        for(i;i < length; i++){

                            var USER_ID = data.payload[i].user_id;
                            var ADMIN_ID= data.payload[i].admin_id;

                            var AMOUNT = data.payload[i].amount;
                            var TIME = data.payload[i].timestamp;

                            if(USER_ID != "" && ADMIN_ID != ""){
                                html = html + "<tr>" +
                                    "<td>"+ TIME +"</td>" +
                                    "<td>"+ AMOUNT +"</td>" +
                                    "</tr>"
                            }

                            SUM = SUM + parseFloat(AMOUNT);
                        }

                        var table_title = "Your payments.";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Time</span></th>" +
                            "<th><span class='text'>Amount</span></th>" +
                            "</tr>"

                        var data = "<p>"+ "Total: "+ SUM.toFixed(2) +"</p>"

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                            document.getElementById("post_table_data").innerHTML = data;
                        });
                    };
                })
        };
    })

    //Iou_get
    // Role: user
    // Returns the total amount that the specified user has at his disposal for buying beer. A negative balance
    // means that the user has a debt.
    // {"type" : "iou_get", "payload" : [{"user_id" : "2","first_name" : "Jory","last_name" : "Assies","assets" : "-275"}]}
    $("#iou_get").click(function(){
        action = "iou_get";

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);
                        var FIRSTNAME = data.payload[0].first_name;
                        var LASTNAME = data.payload[0].last_name;
                        var ASSETS = data.payload[0].assets;

                        var FULLNAME = FIRSTNAME + " " + LASTNAME;

                        var DATA = "<div class='row'>" +
                            "<p>"+ "Your debt is: "+ ASSETS +"</p>"
                            + "</div>"

                        $('#myModal').modal('show')
                        $("#login").hide();

                        document.getElementById("myModalLabel").innerHTML = FULLNAME;
                        document.getElementById("modal-body").innerHTML = DATA;
                    };
                })
        }
    })

    //Purchases_append, should be used when an item is purchased, ie no link
    // Role: user
    // Additional parameter: beer_id
    // Adds a purchase of one beer to the system for the specified user. The id of the beer purchased beer is a
    // required additional parameter.
    $("#purchaces_append").click(function(){
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

    //Beer_data_get: should be used when information about beer is needed, ie no link
    // Role: user
    // Additional parameter: beer_id
    // Returns all information available in the system for a specified beer. This includes name, price, alcohol
    // volume, etc. The id of the beer for inquiry is a required additional parameter
    $("#beer_data_get").click(function(){
        action = "beer_data_get";
        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
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
        }
    })

    //Payments_append: should be used when an item is payed for, ie no link
    // Role: user
    // Additional parameter: amount, user_id
    // Adds a payment of specified amount to the system for the specified user. The amount is a required
    // additional parameter.
    $("#payments_append").click(function(){
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

    /* !!!USER SPECIFIC END!!! */

    /* ADMIN SPECIFIC */

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
                                html = html + "<tr class='clickable'>" +
                                    "<td>"+ ID +"</td>" +
                                    "<td>"+ NAME +"</td>" +
                                    "<td>"+ SBL_PRICE +"</td>" +
                                    "<td>"+ PUB_PRICE +"</td>" +
                                    "<td>"+ PRICE +"</td>" +
                                    "<td>"+ AVAILABLE +"</td>" +
                                    "<td><span class='fa fa-pencil'></span></td>" +
                                    "</tr>"
                            }
                        }

                        var table_title = "Inventory";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Id</span></th>" +
                            "<th><span class='text'>Name</span></th>" +
                            "<th><span class='text'>sbl_Price</span></th>" +
                            "<th><span class='text'>pub_Price</span></th>" +
                            "<th><span class='text'>Price</span></th>" +
                            "<th><span class='text'>Available</span></th>" +
                            "<th></th>" +
                            "</tr>";

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                        });
                    };
                })
        }
    })

    //Purchases_get_all
    // Role: admin
    // Gives a list of all purchases made by all users
    $("#purchaces_get_all").click(function(){
        action = "purchases_get_all";
        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);

                        var length = data.payload.length;
                        var html = "";
                        var i = 0;

                        for(i;i<length;i++){
                            var ADMIN = data.payload[i].admin_username;

                            var NAME = data.payload[i].namn;
                            var PRICE = data.payload[i].price;
                            var TIME =   data.payload[i].timestamp;
                            var USER =   data.payload[i].username;
                            var FIRST =  data.payload[i].first_name;
                            var LAST =   data.payload[i].last_name;
                            var FULL = FIRST + " " + LAST;

                            if(ADMIN != ""){
                                html = html + "<tr>" +
                                    "<td>"+ TIME +"</td>" +
                                    "<td>"+ NAME +"</td>" +
                                    "<td>"+ PRICE +"</td>" +
                                    "<td>"+ USER +"</td>" +
                                    "<td>"+ FULL +"</td>" +
                                    "</tr>"
                            }
                        }

                        var table_title = "Purchases made by customers.";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Time</span></th>" +
                            "<th><span class='text'>Name</span></th>" +
                            "<th><span class='text'>Price</span></th>" +
                            "<th><span class='text'>Username</span></th>" +
                            "<th><span class='text'>Fullname</span></th>" +
                            "</tr>"

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                        });

                    };
                })
        }
    })

    //Payments_get_all
    // Role: admin
    // Returns a list of payments made by all users.
    $("#payments_get_all").click(function(){
        action = "payments_get_all";
        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);

                        var i = 0;
                        var length = data.payload.length;
                        var html = "";

                        for(i;i < length; i++){
                            var ADMIN = data.payload[i].admin_username;

                            var TIME = data.payload[i].timestamp;
                            var AMOUNT = data.payload[i].amount;
                            var USER = data.payload[i].username;
                            var FIRST = data.payload[i].first_name;
                            var LAST = data.payload[i].last_name;

                            var FULL = FIRST + " " + LAST;

                            if(ADMIN != ""){
                                html = html + "<tr>" +
                                    "<td>"+ TIME +"</td>" +
                                    "<td>"+ AMOUNT +"</td>" +
                                    "<td>"+ USER +"</td>" +
                                    "<td>"+ FULL +"</td>" +
                                    "</tr>"
                            }
                        }

                        var table_title = "Payments by customers.";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Time</span></th>" +
                            "<th><span class='text'>Amount</span></th>" +
                            "<th><span class='text'>Username</span></th>" +
                            "<th><span class='text'>Name</span></th>" +
                            "</tr>"

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                        });

                    };
                })
        }
    })

    //Iou_get_all
    // Role: admin
    // Returns all users and amounts they have at their disposal. For users with a negative balance it means
    // that they have a debt.
    $("#iou_get_all").click(function(){
        action = "iou_get_all";

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {
                        //console.log(data.type);
                        //console.log(data.payload[27].username);

                        var html = "";
                        var i = 0;
                        var length = data.payload.length;

                        for(i; i < length; i++){
                            var USER = data.payload[i].username;
                            var FIRST = data.payload[i].first_name;
                            var LAST = data.payload[i].last_name;
                            var ASSETS = data.payload[i].assets

                            if(USER != ""){
                                html = html + "<tr>" +
                                    "<td>"+ USER +"</td>" +
                                    "<td>"+ FIRST +"</td>" +
                                    "<td>"+ LAST +"</td>" +
                                    "<td>"+ ASSETS +"</td>" +
                                    "</tr>"
                            }

                        }

                        var table_title = "Customers in debt.";

                        var table_head = "<tr>"+
                            "<th><span class='text'>Username</span></th>" +
                            "<th><span class='text'>First name</span></th>" +
                            "<th><span class='text'>Last name</span></th>" +
                            "<th><span class='text'>Amount</span></th>" +
                            "</tr>"

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                        });

                    };
                })
        }
    })

    //User_edit
    // Role: admin
    // Additional parameters: new_username, new_password, first_name, last_name, email, phone
    // Updates user information. All user information is required as additional parameters.
    $("#user_edit").click(function(){
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
        action = "user_get_all";
        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else{
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
        }
    })

    //Inventory_append
    // Additional parameters: beer_id, amount, price
    // Updates the number of bottles available in stock and the price for a particular beer. The id of the beer
    // to be updated is required along with its price and current amount of available bottles.
    $("#inventory_append").click(function(){
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

    /* !!!ADMIN SPECIFIC END!!! */

    /* !!!API WRAPPER FUNCTIONS END!!! */

    $("#main_data").load("Partial_View/index2.html");

    var d = new Date();

    document.getElementById("today").innerHTML = d;

    /*$('#insert_table').on('click','.clickable', function(event) {
        $(this).addClass('selected').siblings().removeClass('selected');
    });*/



})
