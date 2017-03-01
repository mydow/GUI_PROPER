/**
 * Created by BegZ on 2017-03-01.
 */

var items = [];

function item(beer_id,beer_name,price,number_of_beers){
    this.beer_id = beer_id;
    this.beer_name = beer_name;
    this.price = price;
    this.number_of_beers = number_of_beers;
}

// we add an item to the list
function addItem(item){
    var i = 0;
    var new_item = true;
    var length = items.length;
    var beer_id = item.beer_id;

    for(i; i < length; i++){
        var temp_beer_id = items[i].beer_id;
        if(temp_beer_id == beer_id){
            items[i].number_of_beers = items[i].number_of_beers + 1;
            new_item = false;
        }
    }

    if(new_item){
        items.push(item);
    }

}

// we decrease the number of beers given a specific item
function removeItem(item){
    var beer_id = item.beer_id;
    var number_of_beers = item.number_of_beers;

    var i = 0;
    var length = items.length;

    for(i; i < length; i++){
        if(number_of_beers == 1){
            removeAllItem(item);
        }else{
            var temp_beer_id = items[i].beer_id;
            if(temp_beer_id == beer_id){
                items[i].number_of_beers = items[i].number_of_beers - 1;
            }
        }

    }
}

// we remove all items matching a specific beer_id
function removeAllItem(item){
    var beer_id = item.beer_id;

    items = items.filter(function(obj){
        return obj.beer_id !== beer_id;
    })
}

function calculateTotalSum(items){
    var i = 0;
    var sum = 0.0;
    var length = items.length;

    for(i; i < length; i++){
        sum = sum + (parseFloat(items[i].price) * parseFloat(items[i].number_of_beers))
    }

    return sum.toFixed(2);
}
