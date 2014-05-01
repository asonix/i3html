/*
author:
    Tim Down
last edited:
    October 3rd, 2010 at 16:56
source:
    http://www.stackoverflow.com/questions/3850442/how-to-prevent-browsers-default-history-back-action-for-backspace-button-with-j
*/
function suppressBackspace(evt) {
    evt = evt || window.event;
    var target = evt.target || evt.srcElement;

    if (evt.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
        return false;
    }
}

document.onkeydown = suppressBackspace;
document.onkeypress = suppressBackspace;
