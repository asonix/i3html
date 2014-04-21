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
        $(".bar .left").append("<span id=\""+this.name+"bar\">"+this.name+"</span>");
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
        }
    }

    this.kill = function() {
        if (this.child.length != 0) {
            for (var i = 0; i < this.child.length; i++) {
                if (i == 0) {
                    this.child[i].parent = this.parent;
                    this.parent.child.push(this.child[i]);
                }
                else {
                    this.child[0].child.push(this.child[i]);
                    this.child[i].parent = this.child[0];
                }
            }
        }
        else {
            var includeparent = -1;
            if (this.parent.type == "window") {
                includeparent = 0;
                if (this.direction == "right") {
                    this.parent.width += this.width/this.parent.child.length;
                }
                else {
                    this.parent.height += this.height/this.parent.child.length;
                }
            }
            for (var i = 0; i < this.parent.child.length; i++) {
                if (this.direction == "right") {
                    this.parent.child[i].width += this.width/(this.parent.child.length+includeparent);
                }
                else {
                    this.parent.child[i].height += this.height/(this.parent.child.length+includeparent);
                }
            }
        }
        for (var i = 0; i < this.parent.child.length; i++) {
            if (this.parent.child[i] == this) {
                this.parent.child.splice(i,1);
            }
        }
        for (var i = 0; i < this.workspace.windows.length; i++) {
            if (this.workspace.windows[i] == this) {
                this.workspace.windows.splice(i,1);
            }
        }
        this.html.remove();
        if (this.child.length != 0) {
            this.child[0].focus();
        }
        else if (this.child.length == 0) {
            if (this.parent.child.length != 0) {
                if (this.parent.child.length >= this.id) {
                    this.parent.child[this.id-1].focus();
                }
                else {
                    this.parent.child[this.parent.child.length-1].focus();
                }
            }
            else if (this.parent.type != "workspace") {
                this.parent.focus();
            }
        }
        resizeAll(this.workspace);
        repositionAll(site.focusws,0,$(".bar").height(),this.workspace);
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
    
    this.create();
    repositionAll(site.focusws,0,$(".bar").height(),this.workspace);
    this.app = application();
    this.app.html = this.appholder;
    this.app.create();
    this.focus();

    var currentwindow = this;
    this.appholder.mouseover(function() {
        currentwindow.focus();
    }); 
}
