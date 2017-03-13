# GUI_PROPER
My own personal GUI project

I made a executive decision to not implement any functionallity
that is not fully supported by the API given to us.

Hence no login, i also did not bother implementing any of the
API functions that change/modify data, so change/modify user,
inventory does not work.

Localization:
I used jquery/javascript to change the languages in my solution.

Undo Redo:
Implemented using two arrays. 

Responsive design:
Made a very simple solution using jquery/javascript, i check when
the screen width changes and then add/remove columns in my tables.
My plan was to override the css in bootstrap but i had to give up,
either i didn't find all the correct css or webstorm loads the css
files out of order.

Drag n Drop:
Added drag n drop to the menu. Each element in the menu is draggable
and you drop them when you hover over the trashcan in lower right
corner. My goal was to have every element in my solotion drag n droppable,
but due to reasons i cant get ahold of the table rows.