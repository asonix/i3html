$(document).ready(function(){
    $(".bashContainer").css("font-size",BashSettings.fontsize+"px");
    $(".input").css("font-size",BashSettings.fontsize+"px");
    $(".bashContainer").css("padding",BashSettings.padding+"px");
    $(".plug").css("font-size",Preferences.name+"px");
    $(".attributes").css("font-size",Preferences.fontsize+"px");
    $(".ctitle").css("font-size",Preferences.title+"px");
    $(".bar").css("font-size",WmSettings.fontsize+"px");
    $(".wintitle").css("font-size",WmSettings.fontsize+"px");
    
    site.child[0].create();
    $("#github").mouseenter(function(){
        $("#github").animate({bottom: "0"});
        $("#github").mouseleave(function(){
            $("#github").animate({bottom: "-100"});
        });
    });
    
    $(".instructions").click(function(){
        site.focusws.windows.push(new Window(function(){
            return(new BashWindow("help"));
        }));
        resizeAll(site.focusws);
    });
    $(".dmenuBtn").click(function(){
        dmenu();
    });

    $('body').keydown(function(e){
        if (e.altKey) {
            e.preventDefault();
            if (e.keyCode == "13") {
                site.focusws.windows.push(new Window(function(){
                    return(new BashWindow());
                }));
                resizeAll(site.focusws);
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
            else if (e.keyCode == "68") {
                dmenu();
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

