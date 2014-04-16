$(document).ready(function(){
    
    site.child[0].create();
    
    $('body').keydown(function(e){
        if (e.altKey) {
            e.preventDefault();
            if (e.keyCode == "13") {
                site.focusws.windows.push(new Window(function(){
                    return(new BashWindow());
                }));
                resizeAll();
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
            else if (Number(e.keyCode) >= 48 && Number(e.keyCode) <= 57) {
                var name = "missing";
                var ws;
                if (e.keyCode == "49") {
                    name = "1";
                }
                else if (e.keyCode == "50") {
                    name = "2";
                }
                else if (e.keyCode == "51") {
                    name = "3";
                }
                else if (e.keyCode == "52") {
                    name = "4";
                }
                else if (e.keyCode == "53") {
                    name = "5";
                }
                else if (e.keyCode == "54") {
                    name = "6";
                }
                else if (e.keyCode == "55") {
                    name = "7";
                }
                else if (e.keyCode == "56") {
                    name = "8";
                }
                else if (e.keyCode == "57") {
                    name = "9";
                }
                else if (e.keyCode == "48") {
                    name = "10";
                }
                for (var i = 0; i < site.child.length; i++) {
                    if (site.child[i].name == name) {
                        ws = site.child[i];
                    }
                }
                if (typeof(ws) != "undefined" && name != "missing") {
                    site.changews(ws);
                }
                else if (typeof(ws) == "undefined" && name != "missing") {
                    new Workspace(name);
                    for (var i = 0; i < site.child.length; i++) {
                        if (site.child[i].name == name) {
                            ws = site.child[i];
                        }
                    }
                }
                if (typeof(ws) != "undefined" && name != "missing") {
                    site.changews(ws);
                }
            }
        }
    });
});

