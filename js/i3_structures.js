/*
Implement window in-place resize for kills
    Fill open space when window is removed
    On kill, if window has children, expand children to fill space
Create i3status
Implement multiple workspaces
    During animation of workspace slide
        let x = distance from current ws to destination ws
        let y = current distance
        if (y < x/2) {
            pxvalue = y*Math.pow(2y/x,2);
        }
        else {
            pxvalue = y*Math.sqrt(2y/x);
        }
Implement window floating
    Resize should build array of windows with this.float = false && only affect those windows
*/
function Site() {
    this.child = [];
    this.direction = "right";
    this.focus = "none";
    this.focusws = "none";
    this.changews = function(ws) {
        if (typeof(this.focusws.html) != "undefined") {
            this.focusws.html.hide();
            this.focusws.indicator.css("color","#e5e5e5");
            this.focusws.focus = false;
        }
        this.focus = "";
        this.focusws = ws;
        this.focusws.indicator.css("color","#d64937");
        this.focusws.html.show();
        if (this.focusws.windows.length != 0) {
            for (var i = 0; i < this.focusws.windows.length; i++) {
                if (this.focusws.windows[i].isfocused == true) {
                    site.focus = this.focusws.windows[i];
                    site.focusws.windows[i].focus();
                    break;
                }
            }
        }
        this.focusws.focus = true;
        for (var i = 0; i < this.child.length; i++) {
            if (this.child.length != 1 && this.focusws != this.child[i]) {
                this.child[i].check();
            }
        }
    }
}

function Workspace(name) {
    this.child = [];
    this.parent = site;
    this.parent.child.push(this);
    this.name = name;
    this.type = "workspace"
    this.windows = [];
    this.workspace = this;

    this.create = function() {
        this.width = $(window).width();
        this.height = $(window).height()-$(".bar").height();
        $("body").append("<div class=\"workspace\" id=\""+this.name+"\"></div>");
        this.html = $("#"+this.name);
        this.html.height(this.height);
        this.html.width(this.width);
        $(".bar .left").append("<span class=\"indicator\" id=\""+this.name+"bar\">"+this.name+"</span>");
        this.indicator = $("#"+this.name+"bar");
        this.focus = true;
        site.changews(this);
    }

    this.check = function() {
        if (this.focus == false && this.windows.length == 0) {
            $("#"+this.name).remove();
            $("#"+this.name+"bar").remove();
            for (var i = 0; i < site.child.length; i++) {
                if (site.child[i] == this) {
                    site.child.splice(i,1);
                    break;
                }
            }
        }
    }
    this.create();
}

function Window(application) {
    this.create = function() {
        if (this.workspace.windows.length == 0) {
            this.workspace.html.append("<div class=\"window\" id=\""+this.id+this.type+this.workspace.name+"\"></div>");
        }
        else {
            site.focus.html.after("<div class=\"window\" id=\""+this.id+this.type+this.workspace.name+"\"></div>");
        }
        this.html = $("#"+this.id+this.type+this.workspace.name);
        this.html.append("<div class=\"appholder\"></div>");
        this.appholder = this.html.find(".appholder");
        this.appholder.css("border-color","#d64937");
    }
    
    this.focus = function() {
        for (var i = 0; i < this.workspace.windows.length; i++) {
            if (this.workspace.windows[i] != this) {
                this.workspace.windows[i].unfocus();
            }
        }
        site.focus = this;
        this.isfocused = true;
        site.focus = this;
        this.appholder.css("border-color","#d64937");
        this.app.focus();
    }

    this.unfocus = function() {
        if (site.focusws == this.workspace) {
            this.isfocused = false;
            this.appholder.css("border-color","#2d2d2d");
            this.app.unfocus();
        }
    }

    this.kill = function() {
        var inter = setInterval(function() {
            currentwindow.app.kill();
            if (currentwindow.app.done == true) {
                if (currentwindow.child.length != 0) {
                    for (var i = 0; i < currentwindow.child.length; i++) {
                        if (i == 0) {
                            currentwindow.child[i].parent = currentwindow.parent;
                            currentwindow.parent.child.push(currentwindow.child[i]);
                        }
                        else {
                            currentwindow.child[0].child.push(currentwindow.child[i]);
                            currentwindow.child[i].parent = currentwindow.child[0];
                        }
                    }
                }
                else {
                    var includeparent = -1;
                    if (currentwindow.parent.type == "window") {
                        includeparent = 0;
                        if (currentwindow.direction == "right") {
                            currentwindow.parent.width += currentwindow.width/currentwindow.parent.child.length;
                        }
                        else {
                            currentwindow.parent.height += currentwindow.height/currentwindow.parent.child.length;
                        }
                    }
                    for (var i = 0; i < currentwindow.parent.child.length; i++) {
                        if (currentwindow.direction == "right") {
                            currentwindow.parent.child[i].width += currentwindow.width/(currentwindow.parent.child.length+includeparent);
                        }
                        else {
                            currentwindow.parent.child[i].height += currentwindow.height/(currentwindow.parent.child.length+includeparent);
                        }
                    }
                }
                for (var i = 0; i < currentwindow.parent.child.length; i++) {
                    if (currentwindow.parent.child[i] == currentwindow) {
                        currentwindow.parent.child.splice(i,1);
                    }
                }
                for (var i = 0; i < currentwindow.workspace.windows.length; i++) {
                    if (currentwindow.workspace.windows[i] == currentwindow) {
                        currentwindow.workspace.windows.splice(i,1);
                    }
                }
                currentwindow.html.remove();
                if (currentwindow.child.length != 0) {
                    currentwindow.child[0].focus();
                }
                else if (currentwindow.child.length == 0) {
                    if (currentwindow.parent.child.length != 0) {
                        if (currentwindow.parent.child.length >= currentwindow.id) {
                            currentwindow.parent.child[currentwindow.id-1].focus();
                        }
                        else {
                            currentwindow.parent.child[currentwindow.parent.child.length-1].focus();
                        }
                    }
                    else if (currentwindow.parent.type != "workspace") {
                        currentwindow.parent.focus();
                    }
                }
                resizeAll(currentwindow.workspace);
                repositionAll(site.focusws,0,$(".bar").height(),currentwindow.workspace);
                if (site.focus == currentwindow) {
                    site.focus = "none";
                }
                clearInterval(inter);
            }
        },25);
    }
    
    assignParent(this);
    var index = 0;
    for (var i = 0; i < this.parent.child.length; i++) {
        if (this.parent.child[i] == site.focus) {
            index = i;
        }
    }
    this.parent.child.splice(index+1,0,this);
    this.child = [];
    this.type = "window";
    this.float = false;
    this.direction = this.parent.next;
    this.next = "none";
    newWindowSize(this);
    this.workspace = this.parent.workspace;
    this.id = this.workspace.windows.length;
    this.xpos = 0;
    this.ypos = 0;
    this.fullscreen = false;

    this.create();
    repositionAll(site.focusws,0,$(".bar").height(),this.workspace);
    this.app = application();
    this.app.conwin = this;
    this.app.done = false;
    this.app.html = this.appholder;
    this.app.id = this.id+this.workspace.name+"app";
    this.app.create();
    this.focus();

    var currentwindow = this;
    var border;
    var size = function() {
        this.width = 0;
        this.height = 0;
    }
    var zindex;
    var margins = function() {
        this.left = 0;
        this.height = 0;
    }
    this.appholder.mouseover(function() {
        currentwindow.focus();
    });
    $(window).keydown(function(key) {
        if (currentwindow.isfocused) {
            if (key.altKey && key.keyCode == "70") {
                if (currentwindow.fullscreen == false) {
                    currentwindow.fullscreen = true;
                    zindex = currentwindow.appholder.css("z-index");
                    border = currentwindow.appholder.css("border");
                    size.width = currentwindow.appholder.css("width");
                    size.height = currentwindow.appholder.css("height");
                    margins.left = currentwindow.appholder.css("margin-left");
                    margins.top = currentwindow.appholder.css("margin-top");
                    currentwindow.appholder.css("border","0px").css("position","fixed").css("top","0px").css("left","0px").css("width","100%").css("height","100%").css("margin","0px").css("z-index","5");
                }
                else {
                    currentwindow.fullscreen = false;
                    currentwindow.appholder.css("border",border).css("position","relative").css("top","0px").css("left","0px").css("width",size.width).css("height",size.height).css("margin-top",margins.top).css("margin-left",margins.left).css("z-index",zindex);
                }
            }
        }
    });
}
