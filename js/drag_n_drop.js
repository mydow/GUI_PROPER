/**
 * Created by BegZ on 2017-03-05.
 */

var undo = [];
var redo = [];

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
