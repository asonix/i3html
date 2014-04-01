Time();
var site = new Site();
new Workspace("1");

$(document).ready(function(){
    
    site.child[0].create();
    
    $('body').keydown(function(e){
        if (e.altKey) {
            e.preventDefault();
            if (e.keyCode == "13") {
                site.focusws.windows.push(new Window());
                ResizeAll();
            }
            else if (e.keyCode == "81") {
                site.focus.kill();
            }
            else if (e.keyCode == "72") {
                site.focus.next = "right";
            }
            else if (e.keyCode == "86") {
                site.focus.next = "down";
            }
            else if (e.keyCode == "69") {
            }
        }
    });
});
