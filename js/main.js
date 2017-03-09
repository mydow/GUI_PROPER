$(document).ready(function(){

    /* API WRAPPER FUNCTIONS */

    var URL = "http://pub.jamaica-inn.net/fpdb/api.php";
    var adminUser = "jorass";
    var adminPass = "jorass";
    var adminLogin = "user_get_all";
    var adminInventory = "inventory_get";

    var userId = "123456";
    var userName = "";
    var passWord = "";
    var action = "";
    var firstName = "";
    var lastName = "";

    var GB = "";
    var SE = "";

    var d = new Date();

    document.getElementById("today").innerHTML = d;

    //$("#cart_input").val(0);

    $("#store").click(function(){
        $(this).addClass('active').siblings().removeClass('active');

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
                        var PRICE = parseFloat(data.payload[i].pub_price).toFixed(2);
                        var AVAILABLE = data.payload[i].count;

                        //console.log(data.payload[i].beer_id);
                        //console.log(length)

                        if(ID != "" && NAME != "" && AVAILABLE > 0){
                            html = html + "<tr'>" +
                                "<td>"+ ID +"</td>" +
                                "<td>"+ NAME +"</td>" +
                                "<td>"+ PRICE +"</td>" +
                                "<td>"+ AVAILABLE +"</td>" +
                                "<td>" +
                                "<span class='beer-info icon-margin fa fa-info'>&nbsp</span>" +
                                "<button class='buy-btn btn btn-success btn-sm'>Buy</button>" +
                                "</td>" +
                                "</tr>"
                        }
                    }

                    if(GB){
                        var table_title = "Store";

                        var table_head = "<tr>"+
                            "<th><span id='store-id' class='text'>Art. Nr</span></th>" +
                            "<th><span id='store-name' class='text'>Name</span></th>" +
                            "<th><span id='store-price' class='text'>Price</span></th>" +
                            "<th><span id='store-available' class='text'>Available</span></th>" +
                            "<th></th>" +
                            "</tr>"
                    } else {
                        var table_title = "Shop";

                        var table_head = "<tr>"+
                            "<th><span id='store-id' class='text'>Art. Nr</span></th>" +
                            "<th><span id='store-name' class='text'>Namn</span></th>" +
                            "<th><span id='store-price' class='text'>Pris</span></th>" +
                            "<th><span id='store-available' class='text'>Antal</span></th>" +
                            "<th></th>" +
                            "</tr>"
                    }

                    $("#main_data").load("Partial_View/main_table.html", function(){
                        document.getElementById("pre_table_header").innerHTML = table_title;
                        document.getElementById("header_table").innerHTML = table_head;
                        document.getElementById("insert_table").innerHTML = html;
                    });


                };
            })

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

                        if(GB){
                            var table_title = "Your purchases";

                            var table_head = "<tr>"+
                                "<th><span id='purchaces_get_time' class='text'>Time</span></th>" +
                                "<th><span id='purchaces_get_name' class='text'>Name</span></th>" +
                                "<th><span id='purchaces_get_price' class='text'>Price</span></th>" +
                                "</tr>"

                            var data = "<p id='purchase-total'>"+ "Total: "+ "</p>" + "<p>" + SUM.toFixed(2) +"</p>"
                        } else {
                            var table_title = "Dina inköp";

                            var table_head = "<tr>"+
                                "<th><span id='purchaces_get_time' class='text'>Tid</span></th>" +
                                "<th><span id='purchaces_get_name' class='text'>Namn</span></th>" +
                                "<th><span id='purchaces_get_price' class='text'>Pris</span></th>" +
                                "</tr>"

                            var data = "<p id='purchase-total'>"+ "Summa: "+ SUM.toFixed(2) +"</p>"
                        }



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

                        if(GB){
                            var table_title = "Your payments.";

                            var table_head = "<tr>"+
                                "<th><span id='payments_get_time' class='text'>Time</span></th>" +
                                "<th><span id='payments_get_amount' class='text'>Amount</span></th>" +
                                "</tr>"

                            var data = "<p id='payments_get_total'>"+ "Total: "+ "</p><p>" + SUM.toFixed(2) +"</p>"
                        } else {
                            var table_title = "Dina Betalningar";

                            var table_head = "<tr>"+
                                "<th><span id='payments_get_time' class='text'>Tid</span></th>" +
                                "<th><span id='payments_get_amount' class='text'>Summa</span></th>" +
                                "</tr>"

                            var data = "<p id='payments_get_total'>"+ "Summa: "+ "</p><p>" + SUM.toFixed(2) +"</p>"
                        }


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

                        if(GB){
                            var DATA = "<div class='row'>" +
                                "<p>"+ "Your debt is: "+ ASSETS +"</p>"
                                + "</div>"
                        } else {
                            var DATA = "<div class='row'>" +
                                "<p>"+ "Din skuld är: "+ ASSETS +"</p>"
                                + "</div>"
                        }

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
        action = "inventory_get";

        if(userName == "" && passWord == ""){
            alert("Please login!");
        } else {
            $.get(URL,
                {username: userName, password: passWord, action: action},
                function(data,status) {
                    if (status != 'success') {
                        alert("Status: " + status);
                    } else {

                        var html = "";
                        var i = 0;
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

                        if(GB){
                            var table_title = "Inventory";

                            var table_head = "<tr>"+
                                "<th><span id='inventory_get_id' class='text'>Id</span></th>" +
                                "<th><span id='inventory_get_name' class='text'>Name</span></th>" +
                                "<th><span id='inventory_get_sbl_price' class='text'>sbl_Price</span></th>" +
                                "<th><span id='inventory_get_pub_price' class='text'>pub_Price</span></th>" +
                                "<th><span id='inventory_get_price' class='text'>Price</span></th>" +
                                "<th><span id='inventory_get_available' class='text'>Available</span></th>" +
                                "<th></th>" +
                                "</tr>";
                        } else {
                            var table_title = "Inventarie";

                            var table_head = "<tr>"+
                                "<th><span id='inventory_get_id' class='text'>Id</span></th>" +
                                "<th><span id='inventory_get_name' class='text'>Namn</span></th>" +
                                "<th><span id='inventory_get_sbl_price' class='text'>sbl_Pris</span></th>" +
                                "<th><span id='inventory_get_pub_price' class='text'>pub_Pris</span></th>" +
                                "<th><span id='inventory_get_price' class='text'>Pris</span></th>" +
                                "<th><span id='inventory_get_available' class='text'>Antal</span></th>" +
                                "<th></th>" +
                                "</tr>";
                        }

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
                            var TIME = data.payload[i].timestamp;
                            var USER = data.payload[i].username;
                            var FIRST = data.payload[i].first_name;
                            var LAST = data.payload[i].last_name;
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

                        if(GB){
                            var table_title = "Purchases made by customers";

                            var table_head = "<tr>"+
                                "<th><span id='purchases_get_all_time' class='text'>Time</span></th>" +
                                "<th><span id='purchases_get_all_name' class='text'>Name</span></th>" +
                                "<th><span id='purchases_get_all_price' class='text'>Price</span></th>" +
                                "<th><span id='purchases_get_all_username' class='text'>Username</span></th>" +
                                "<th><span id='purchases_get_all_fullname' class='text'>Fullname</span></th>" +
                                "</tr>"
                        } else {
                            var table_title = "Kund underlag";

                            var table_head = "<tr>"+
                                "<th><span id='purchases_get_all_time' class='text'>Tid</span></th>" +
                                "<th><span id='purchases_get_all_name' class='text'>Namn</span></th>" +
                                "<th><span id='purchases_get_all_price' class='text'>Pris</span></th>" +
                                "<th><span id='purchases_get_all_username' class='text'>Användarnamn</span></th>" +
                                "<th><span id='purchases_get_all_fullname' class='text'>Namn</span></th>" +
                                "</tr>"
                        }

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

                        if(GB){
                            var table_title = "Payments by customers";

                            var table_head = "<tr>"+
                                "<th><span id='payments_get_all_time' class='text'>Time</span></th>" +
                                "<th><span id='payments_get_all_amount' class='text'>Amount</span></th>" +
                                "<th><span id='payments_get_all_username' class='text'>Username</span></th>" +
                                "<th><span id='payments_get_all_name' class='text'>Name</span></th>" +
                                "</tr>"
                        } else {
                            var table_title = "Inbetalningar";

                            var table_head = "<tr>"+
                                "<th><span id='payments_get_all_time' class='text'>Tid</span></th>" +
                                "<th><span id='payments_get_all_amount' class='text'>Summa</span></th>" +
                                "<th><span id='payments_get_all_username' class='text'>Andvändarnamn</span></th>" +
                                "<th><span id='payments_get_all_name' class='text'>Namn</span></th>" +
                                "</tr>"
                        }


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

                        if(GB){
                            var table_title = "Customers in debt.";

                            var table_head = "<tr>"+
                                "<th><span id='iou_get_all_username' class='text'>Username</span></th>" +
                                "<th><span id='iou_get_all_firstname' class='text'>First name</span></th>" +
                                "<th><span id='iou_get_all_lastname' class='text'>Last name</span></th>" +
                                "<th><span id='iou_get_all_amount' class='text'>Amount</span></th>" +
                                "</tr>"
                        } else {
                            var table_title = "Skulder";

                            var table_head = "<tr>"+
                                "<th><span id='iou_get_all_username' class='text'>Användar</span></th>" +
                                "<th><span id='iou_get_all_firstname' class='text'>Förnamn</span></th>" +
                                "<th><span id='iou_get_all_lastname' class='text'>Efernamn</span></th>" +
                                "<th><span id='iou_get_all_amount' class='text'>Summa</span></th>" +
                                "</tr>"
                        }

                        $("#main_data").load("Partial_View/main_table.html", function(){
                            document.getElementById("pre_table_header").innerHTML = table_title;
                            document.getElementById("header_table").innerHTML = table_head;
                            document.getElementById("insert_table").innerHTML = html;
                        });

                    };
                })
        }
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
                        //console.log(data.type);
                        //console.log(data.payload[27].username);

                        var i = 0;
                        var html = "";
                        var length = data.payload.length;

                        for(i; i < length; i++){
                            var USERNAME = data.payload[i].username;
                            var FIRST_NAME = data.payload[i].first_name;
                            var LAST_NAME = data.payload[i].last_name;
                            var EMAIL = data.payload[i].email;
                            var PHONE = data.payload[i].phone;

                            if(USERNAME != ""){
                                html = html + "<tr>" +
                                    "<td>"+ USERNAME +"</td>" +
                                    "<td>"+ FIRST_NAME +"</td>" +
                                    "<td>"+ LAST_NAME +"</td>" +
                                    "<td>"+ EMAIL +"</td>" +
                                    "<td>"+ PHONE +"</td>" +
                                    "<td><span class='fa fa-pencil' title='Edit'></span></td>" +
                                    "</tr>"
                            }
                        }

                        if(GB){
                            var table_title = "All members";

                            var table_head = "<tr>"+
                                "<th><span id='user_get_all_usernamn' class='text'>Username</span></th>" +
                                "<th><span id='user_get_all_firstname' class='text'>First name</span></th>" +
                                "<th><span id='user_get_all_lastname' class='text'>Last name</span></th>" +
                                "<th><span id='user_get_all_email' class='text'>Email</span></th>" +
                                "<th><span id='user_get_all_phone' class='text'>Phone</span></th>" +
                                "<th></th>" +
                                "</tr>"
                        } else {
                            var table_title = "Alla medlemmar";

                            var table_head = "<tr>"+
                                "<th><span id='user_get_all_usernamn' class='text'>Användarnamn</span></th>" +
                                "<th><span id='user_get_all_firstname' class='text'>Förnamn</span></th>" +
                                "<th><span id='user_get_all_lastname' class='text'>Efternamn</span></th>" +
                                "<th><span id='user_get_all_email' class='text'>Email</span></th>" +
                                "<th><span id='user_get_all_phone' class='text'>Telefon</span></th>" +
                                "<th></th>" +
                                "</tr>"
                        }


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

    $("#checkout").hide();

    $("#main_data").load("Partial_View/index2.html");

    $("#login").click(function(){
        alert("You actually cant login proper. The API does not support it."+
            "\nWe just store the what the user enters in the input fields and"+
            "\nchecks if the user is valid on each call to the DB.");
        userName = $("#user").val();
        passWord = $("#pass").val();

        $('#myModal').modal('hide')
    })

    $("#home").click(function(){
        var html = "";
        //$("#main_data").load("Partial_View/index2.html");
        $(this).addClass('active').siblings().removeClass('active');

        if(GB){
            html = "<h1>User Interface Programming!</h1>";
        }else{
            html = "<h1>Gränssnitts Programmering!</h1>";
        }

        html = html +
            "<p>" +
            "<a class='btn btn-primary btn-lg' href='http://www.uu.se/en/admissions/master/selma/kursplan/?kpid=30749&type=1' role='button'>Learn more</a>" +
            "</p>";

        $("#main_data").load("Partial_View/index2.html", function(){
            document.getElementById("jumbotron").innerHTML = html;
        });

    })

    $("#about").click(function(){
        $("#main_data").load("404.html");
        $(this).addClass('active').siblings().removeClass('active');
    })

    $("#contact").click(function(){
        $("#main_data").load("404.html");
        $(this).addClass('active').siblings().removeClass('active');
    })

    $(".flag-icon-gb").click(function(){
        GB = true;
        SE = false;

        //left part of navbar
        document.getElementById("home").innerHTML = "<a>Home</a>";
        document.getElementById("store").innerHTML = "<a>Store</a>";
        document.getElementById("about").innerHTML = "<a>About</a>";
        document.getElementById("contact").innerHTML = "<a>Contact</a>";

        //dropdown
        document.getElementById("customer").innerHTML = "<a>Customer</a>";
        document.getElementById("purchaces_get").innerHTML = "<a>My Purchases</a>";
        document.getElementById("payments_get").innerHTML = "<a>My Payments</a>";
        document.getElementById("iou_get").innerHTML = "<a>My Iou's</a>";
        document.getElementById("admin").innerHTML = "<a>Admin</a>";
        document.getElementById("user_get_all").innerHTML = "<a>Members</a>";
        document.getElementById("inventory_get").innerHTML = "<a>Inventory</a>";
        document.getElementById("purchaces_get_all").innerHTML = "<a>All Purchases</a>";
        document.getElementById("payments_get_all").innerHTML = "<a>All Payments</a>";
        document.getElementById("iou_get_all").innerHTML = "<a>All Iou's</a>";

        //right part of navbar
        document.getElementById("shopping-cart").innerHTML =
            "<span class='fa fa-shopping-cart'></span>" + " Items:" +
            "<span id='cart_items' class='badge'>0</span>";
        document.getElementById("shopping-cart-items").innerHTML = " Total Sum:" +
            "<span id='cart_input'>0</span>";

        var cartLength = items.length;
        var totalSum = calculateTotalSum(items)

        document.getElementById("cart_items").innerHTML = cartLength;
        document.getElementById("cart_input").innerHTML = totalSum;

        $("#login-credentials").html('Login Credentials');

        //the rest
        var str = location.href;
        var arr = str.split("#");

        // we know this
        var loc = arr[1];
        console.log(loc)
        switch(loc){
            case "purchases_get":
                document.getElementById("pre_table_header").innerHTML = "My purchases";
                document.getElementById('purchaces_get_time').innerHTML = "Time";
                document.getElementById('purchaces_get_name').innerHTML = "Name";
                document.getElementById('purchaces_get_price').innerHTML = "Price";
                document.getElementById('purchase-total').innerHTML = "Total:"
                break;
            case "payments_get":
                document.getElementById("pre_table_header").innerHTML = "My payments";
                document.getElementById('payments_get_time').innerHTML = "Time";
                document.getElementById('payments_get_amount').innerHTML = "Amount";
                document.getElementById('payments_get_total').innerHTML = "Total:"
                break;
            case "inventory_get":
                document.getElementById("pre_table_header").innerHTML = "Inventory";
                document.getElementById('inventory_get_id').innerHTML = "Id";
                document.getElementById('inventory_get_name').innerHTML = "Name";
                document.getElementById('inventory_get_sbl_price').innerHTML = "Sbl price";
                document.getElementById('inventory_get_pub_price').innerHTML = "Pub price";
                document.getElementById('inventory_get_price').innerHTML = "price";
                document.getElementById('inventory_get_available').innerHTML = "Available";
                break;
            case "user_get_all":
                document.getElementById("pre_table_header").innerHTML = "All members";
                document.getElementById('user_get_all_usernamn').innerHTML = "Username";
                document.getElementById('user_get_all_firstname').innerHTML = "Firstname";
                document.getElementById('user_get_all_lastname').innerHTML = "Lastname";
                document.getElementById('user_get_all_email').innerHTML = "Email";
                document.getElementById('user_get_all_phone').innerHTML = "Phone";
                break;
            case "purchaces_get_all":
                document.getElementById("pre_table_header").innerHTML = "All purchases";
                document.getElementById('purchases_get_all_time').innerHTML = "Time";
                document.getElementById('purchases_get_all_name').innerHTML = "Item";
                document.getElementById('purchases_get_all_price').innerHTML = "Price";
                document.getElementById('purchases_get_all_username').innerHTML = "Username";
                document.getElementById('purchases_get_all_fullname').innerHTML = "Fullname";
                break;
            case "payments_get_all":
                document.getElementById("pre_table_header").innerHTML = "All payments";
                document.getElementById('payments_get_all_time').innerHTML = "Time";
                document.getElementById('payments_get_all_amount').innerHTML = "Amount";
                document.getElementById('payments_get_all_username').innerHTML = "Username";
                document.getElementById('payments_get_all_name').innerHTML = "Name";
                break;
            case "iou_get_all":
                document.getElementById("pre_table_header").innerHTML = "All debts";
                document.getElementById('iou_get_all_username').innerHTML = "Username";
                document.getElementById('iou_get_all_firstname').innerHTML = "Firstname";
                document.getElementById('iou_get_all_lastname').innerHTML = "Lastname";
                document.getElementById('iou_get_all_amount').innerHTML = "Amount";
                break;
            default: alert("Why are we here.")
        }

        $(".buy-btn").html('Buy');

        //location.reload();

        /*var path = window.location.pathname;
         $("#main_data").load(path);

         console.log("GB: " + GB);
         console.log("SE: " + SE);*/
    });

    $(".flag-icon-se").click(function(){
        GB = false;
        SE = true;

        //left part of navbar
        document.getElementById("home").innerHTML = "<a>Hem</a>";
        document.getElementById("store").innerHTML = "<a>Shop</a>";
        document.getElementById("about").innerHTML = "<a>Om</a>";
        document.getElementById("contact").innerHTML = "<a>Kontakta oss</a>";

        //dropdown
        document.getElementById("customer").innerHTML = "<a>Kunder</a>";
        document.getElementById("purchaces_get").innerHTML = "<a>Mina inköp</a>";
        document.getElementById("payments_get").innerHTML = "<a>Mina inbetalningar</a>";
        document.getElementById("iou_get").innerHTML = "<a>Mina skulder</a>";
        document.getElementById("admin").innerHTML = "<a>Administratör</a>";
        document.getElementById("user_get_all").innerHTML = "<a>Medlemmar</a>";
        document.getElementById("inventory_get").innerHTML = "<a>Inventarie</a>";
        document.getElementById("purchaces_get_all").innerHTML = "<a>Alla inköp</a>";
        document.getElementById("payments_get_all").innerHTML = "<a>Alla betalningar</a>";
        document.getElementById("iou_get_all").innerHTML = "<a>Alla skulder</a>";

        //right part of navbar
        document.getElementById("shopping-cart").innerHTML =
            "<span class='fa fa-shopping-cart'></span>" + " Artiklar:" +
            "<span id='cart_items' class='badge'>0</span>";
        document.getElementById("shopping-cart-items").innerHTML = " Summa:" +
            "<span id='cart_input'>0</span>";

        var cartLength = items.length;
        var totalSum = calculateTotalSum(items)

        document.getElementById("cart_items").innerHTML = cartLength;
        document.getElementById("cart_input").innerHTML = totalSum;

        $("#login-credentials").html('Logga in');

        //the rest
        var str = location.href;
        var arr = str.split("#");

        // we know this
        var loc = arr[1];
        //console.log(loc)
        switch(loc){
            case "purchases_get":
                document.getElementById("pre_table_header").innerHTML = "Mina inköp";
                document.getElementById('purchaces_get_time').innerHTML = "Tid";
                document.getElementById('purchaces_get_name').innerHTML = "Namn";
                document.getElementById('purchaces_get_price').innerHTML = "Pris";
                document.getElementById('purchase-total').innerHTML = "Summa:"
                break;
            case "payments_get":
                document.getElementById("pre_table_header").innerHTML = "Mina betalningar";
                document.getElementById('payments_get_time').innerHTML = "Tid";
                document.getElementById('payments_get_amount').innerHTML = "Summa";
                document.getElementById('payments_get_total').innerHTML = "Summa:"
                break;
            case "inventory_get":
                document.getElementById("pre_table_header").innerHTML = "Inventarie";
                document.getElementById('inventory_get_id').innerHTML = "Id";
                document.getElementById('inventory_get_name').innerHTML = "Namn";
                document.getElementById('inventory_get_sbl_price').innerHTML = "Sbl pris";
                document.getElementById('inventory_get_pub_price').innerHTML = "Pub pris";
                document.getElementById('inventory_get_price').innerHTML = "pris";
                document.getElementById('inventory_get_available').innerHTML = "Antal";
                break;
            case "user_get_all":
                document.getElementById("pre_table_header").innerHTML = "Alla medlemmar";
                document.getElementById('user_get_all_usernamn').innerHTML = "Användarnamn";
                document.getElementById('user_get_all_firstname').innerHTML = "Förnamn";
                document.getElementById('user_get_all_lastname').innerHTML = "Efternamn";
                document.getElementById('user_get_all_email').innerHTML = "Email";
                document.getElementById('user_get_all_phone').innerHTML = "Telefon";
                break;
            case "purchaces_get_all":
                document.getElementById("pre_table_header").innerHTML = "Kund underlag";
                document.getElementById('purchases_get_all_time').innerHTML = "Tid";
                document.getElementById('purchases_get_all_name').innerHTML = "Artikel";
                document.getElementById('purchases_get_all_price').innerHTML = "Pris";
                document.getElementById('purchases_get_all_username').innerHTML = "Användarnamn";
                document.getElementById('purchases_get_all_fullname').innerHTML = "Namn";
                break;
            case "payments_get_all":
                document.getElementById("pre_table_header").innerHTML = "Inbetalningar";
                document.getElementById('payments_get_all_time').innerHTML = "Tid";
                document.getElementById('payments_get_all_amount').innerHTML = "Summa";
                document.getElementById('payments_get_all_username').innerHTML = "Användarnamn";
                document.getElementById('payments_get_all_name').innerHTML = "Namn";
                break;
            case "iou_get_all":
                document.getElementById("pre_table_header").innerHTML = "Skulder";
                document.getElementById('iou_get_all_username').innerHTML = "Användarnamn";
                document.getElementById('iou_get_all_firstname').innerHTML = "Förnamn";
                document.getElementById('iou_get_all_lastname').innerHTML = "Efternamn";
                document.getElementById('iou_get_all_amount').innerHTML = "Summa";
                break;
            default: alert("Why are we here.")
        }

        document.getElementById("jumbotron").innerHTML =
            "<h1>Gränssnitts Programmering!</h1><p>" +
            "<a class='btn btn-primary btn-lg' href='http://www.uu.se/en/admissions/master/selma/kursplan/?kpid=30749&type=1' role='button'>Lär mer</a>" +
            "</p>";

        document.getElementById("store-name").innerHTML = "Namn";
        document.getElementById("store-price").innerHTML = "Pris";
        document.getElementById("store-available").innerHTML = "Antal";

        $(".buy-btn").html('Köp');

    });

    $("#nav-cart").click(function(){
        var i = 0;

        var length = items.length;
        var html = "";

        if(GB){
            var tableHeader = "Checkout";

            html ="<div class='row'>" +
                "<div class='col-xs-4'><label class='control-label'></label>Item</div>" +
                "<div class='col-xs-4'><label class='control-label'></label>price</div>" +
                "<div class='col-xs-4'><label class='control-label'></label>Quantity</div>" +
                "</div>";
        } else {
            var tableHeader = "Kundvagn";

            html ="<div class='row'>" +
                "<div class='col-xs-4'><label class='control-label'></label>Artikel</div>" +
                "<div class='col-xs-4'><label class='control-label'></label>pris</div>" +
                "<div class='col-xs-4'><label class='control-label'></label>Antal</div>" +
                "</div>";
        }


        for(i; i < length; i++){

            var ITEM = items[i].beer_name;
            var PRICE = items[i].price;
            var NUMBER = items[i].number_of_beers;

            html = html + "<div class='row'>" +
                "<div class='col-xs-4'>" + ITEM + "</div>" +
                "<div class='col-xs-4'>" + (parseFloat(PRICE) * parseFloat(NUMBER)).toFixed(2) + "</div>" +
                "<div class='col-xs-4'>" + NUMBER + "</div>" +
                "</div>"
        }

        $('#myModal').modal('show')
        $("#login").hide();
        $("#checkout").show();

        document.getElementById("myModalLabel").innerHTML = tableHeader;
        document.getElementById("modal-body").innerHTML = html;

    })

    $(document).on('click','.buy-btn', function(){
        var row = $(this).closest("tr") // get current row

        var beer_id=row.find("td:eq(0)").text(); // get current row 1st TD value
        var beer_name=row.find("td:eq(1)").text(); // get current row 2st TD value
        var beer_price=row.find("td:eq(2)").text(); // get current row 3st TD value

        var cart_item = new item(beer_id,beer_name,beer_price,1);

        addItem(cart_item);

        var cartLength = items.length;
        var totalSum = calculateTotalSum(items)

        document.getElementById("cart_items").innerHTML = cartLength;
        document.getElementById("cart_input").innerHTML = totalSum;
        //$("#cart_input").val(totalSum);

    })

    $(document).on('click','.beer-info', function(event){
        var row = $(this).closest("tr") // get current row

        var beer_id=row.find("td:eq(0)").text(); // get current row 1st TD value

        console.log(beer_id);
    })

    var html = "";

    if(GB == "" && SE == ""){
        GB = true;
        SE = false;
    }

    if(GB){
        html = "<h1>User Interface Programming!</h1>";
    }else{
        html = "<h1>Gränssnitts Programmering!</h1>";
    }

    html = html +
        "<p>" +
        "<a class='btn btn-primary btn-lg' href='http://www.uu.se/en/admissions/master/selma/kursplan/?kpid=30749&type=1' role='button'>Learn more</a>" +
        "</p>"

    $("#main_data").load("Partial_View/index2.html", function(){
        document.getElementById("jumbotron").innerHTML = html;
    });

    /*    $(".buy-btn").draggable({
     helper: clone,
     cancel: false
     });*/

    $("#home").draggable({
        helper: "clone"
    });

    $("#store").draggable({
        helper: "clone"
    });

    $("#about").draggable({
        helper: "clone"
    });

    $("#contact").draggable({
        helper: "clone"
    });

    $("#dropdown-menu").draggable({
        helper: "clone",
        cancel: false
    });

    $("#flag-icon-gb").draggable({
        helper: "clone"
    });

    $("#flag-icon-se").draggable({
        helper: "clone"
    });

    $("#nav-cart").draggable({
        helper: "clone"
    });

    $("#shopping-cart").draggable({
        helper: "clone"
    });

    $("#cart_items").draggable({
        helper: "clone"
    });

    $("#shopping-cart-items").draggable({
        helper: "clone"
    });

    $("#cart_input").draggable({
        helper: "clone"
    });

    $("#login-credentials").draggable({
        helper: "clone",
        cancel: false
    });

    $( "#trashcan" ).droppable({
        drop: function(event, ui) {


            var droppedId = ui.helper.prevObject.prop('id');
            var Element = document.getElementById(droppedId);
            var Data = Element.innerHTML;
            var ParentId = document.getElementById(droppedId).parentNode.id;

            var elem = new element(ParentId,droppedId,Element,Data);

            addUndo(elem);

            var length = undo.length;
            if(length > 0){
                $('#undo').removeClass('disabled');
            }

            /*console.log(ParentId);
             console.log(Data);*/
            //console.log("UNDO: " + undo.length)
            $("#" + droppedId).remove();
        }
    });

    $('#undo').click(function(){
        var length = undo.length;

        if(length > 0){
            var elem = popUndo();
            addRedo(elem);
            $('#redo').removeClass('disabled');
            if(undo.length == 0){
                $('#undo').addClass('disabled');
            }
        }

        var parentId = elem.ParentId;
        var undoElement = elem.Current;

        document.getElementById(parentId).appendChild(undoElement);

        //console.log("undo Undo: " + undo.length);
        //console.log("undo Redo: " + redo.length);
    });

    $('#redo').click(function(){
        var length = redo.length;

        if(length > 0){
            var elem = popRedo();
            addUndo(elem);
            $('#undo').removeClass('disabled');

            $("#" + elem.CurrentId).remove();

            if(redo.length == 0){
                $('#redo').addClass('disabled');
            }
        }
        //console.log("redo Redo: " + redo.length);
        //console.log("redo Undo: " + undo.length);
    })

    $(window).resize(function(){
        var Width = $(window).width();

        //the rest
        var str = location.href;
        var arr = str.split("#");
        // we know this
        var loc = arr[1];
        if (Width < 700) {
            switch(loc){
                case "Store": $('#myTable').find('tr :nth-child(1)').hide();
                    break;
                case "user_get_all": $('#myTable').find('tr :nth-child(5)').hide();
                    break;
                case "inventory_get": $('#myTable').find('tr :nth-child(3)').hide();
                    break;
                case "purchaces_get_all": $('#myTable').find('tr :nth-child(5)').hide();
                    break;
                case "payments_get_all": $('#myTable').find('tr :nth-child(4)').hide();
                    break;
                case "iou_get_all": $('#myTable').find('tr :nth-child(2)').hide();
                    $('#myTable').find('tr :nth-child(3)').hide();
                    break;
            };
        } else if(Width > 700) {
            switch(loc){
                case "Store": $('#myTable').find('tr :nth-child(1)').show();
                    break;
                case "user_get_all": $('#myTable').find('tr :nth-child(5)').show();
                    break;
                case "inventory_get": $('#myTable').find('tr :nth-child(3)').show();
                    break;
                case "purchaces_get_all": $('#myTable').find('tr :nth-child(5)').show();
                    break;
                case "payments_get_all": $('#myTable').find('tr :nth-child(4)').show();
                    break;
                case "iou_get_all": $('#myTable').find('tr :nth-child(2)').show();
                    $('#myTable').find('tr :nth-child(3)').show();
                    break;
            };
        };

        if(Width < 500){
            switch(loc){
                case "Store": $('#myTable').find('tr :nth-child(4)').hide();
                    break;
                case "user_get_all": $('#myTable').find('tr :nth-child(4)').hide();
                    break;
                case "inventory_get": $('#myTable').find('tr :nth-child(4)').hide();
                    break;
                case "purchaces_get_all": $('#myTable').find('tr :nth-child(3)').hide();
                    break;
            };
        } else if(Width > 500){
            switch(loc){
                case "Store": $('#myTable').find('tr :nth-child(4)').show();
                    break;
                case "user_get_all": $('#myTable').find('tr :nth-child(4)').show();
                    break;
                case "inventory_get": $('#myTable').find('tr :nth-child(4)').show();
                    break;
                case "purchaces_get_all": $('#myTable').find('tr :nth-child(3)').show();
                    break;
            };
        }
    });

    $("#width").click(function(){
        var width = $(window).width();
        alert(width);
    })

    /*$('#insert_table tr.selectedItem').draggable({
     helper: function(){
     // var selected = $('#insert_table tr.selectedItem');
     var selected = $(this).closest("tr") // get current row
     console.log(selected);
     var container = $('<div/>').attr('id', 'draggingContainer');
     container.append(selected.clone())
     return container;
     }
     });*/

//$('#myTable tbody#insert_table').draggable();

// this function works but i'm not gonna use it.
    /*$(document).on('click', '#insert_table tr', function(){
     var row = $(this).closest("tr") // get current row
     console.log("click: " + row)
     row.addClass('selectedItem').siblings().removeClass('selectedItem');
     });*/

//$(document).on('draggable', '.buy-btn', {'cancel': false})

    /*$('#insert_table').on('click','.clickable', function(event) {
     $(this).addClass('selected').siblings().removeClass('selected');
     });*/

})
