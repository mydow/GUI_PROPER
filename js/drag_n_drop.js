/**
 * Created by BegZ on 2017-03-05.
 */

var undo = [];
var redo = [];

// parent : parent id of the element
// current: the selected element
// data: data inside the current elem, if any
function element(parentid,currentid,current,data){
    this.ParentId = parentid;
    this.CurrentId = currentid;
    this.Current = current;
    this.Data = data;
}

// we add a element to the undo array
function addUndo(elem){
    undo.push(elem);
}

// we remove a element from undo array
function popUndo(){
    return undo.pop();
}

// we add a element to the redo array
function addRedo(elem){
    redo.push(elem);
}

// we remove a element from the redo array
function popRedo(){
    return undo.pop();
}

/*function drag(ev) {
 ev.preventDefault();
 //ev.dataTransfer.setData("text", ev.target.classList);
 }*/
