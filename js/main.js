$(document).ready(function(){

    $("#main_data").load("Partial_View/index2.html");

    var d = new Date();

    document.getElementById("today").innerHTML = d;

    /*$('#insert_table').on('click','.clickable', function(event) {
        $(this).addClass('selected').siblings().removeClass('selected');
    });*/

})
