/*
Implement window in-place resize for kills
    Fill open space when window is removed
    On kill, if window has children, expand children to fill space
Create i3bar && i3status
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
}

function Workspace(name) {
    this.child = [];
    this.parent = site;
    this.parent.child.push(this);
    this.name = name;
    this.type = "workspace"
    this.focus = true;
    site.focusws = this;
    this.windows = [];
    this.workspace = this;

    this.create = function() {
        this.width = $(window).width();
        this.height = $(window).height()-$(".bar").height();
        $("body").append("<div class=\"workspace\" id=\""+this.name+"\"></div>");
        this.html = $("#"+this.name);
        this.html.height(this.height);
        this.html.width(this.width);
        $(".bar .left").append(this.name);

    }

    if (this.focus == false && this.child.length == 0) {
        for (var i = 0; i < site.child.length; i++) {
            if (site.child[i] == this) {
                site.child.splice(i,1);
                break;
            }
        }
    }
}

function Window(application) {
    this.create = function() {
        if (this.workspace.windows.length == 0) {
            $(".workspace").append("<div class=\"window\" id=\""+this.id+this.type+"\"></div>");
        }
        else {
            site.focus.html.after("<div class=\"window\" id=\""+this.id+this.type+"\"></div>");
        }
        this.html = $("#"+this.id+this.type);
        this.html.css("background-color", "#e5e5e5").css("border-color","#d64937");
    }
    
    this.focus = function() {
        site.focus = this;
        for (var i = 0; i < site.focusws.windows.length; i++) {
            site.focusws.windows[i].unfocus();
        }
        site.focus = this;
        this.html.css("border-color","#d64937");
    }

    this.unfocus = function() {
        this.html.css("border-color","#2d2d2d");
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
        resizeAll();
        repositionAll(site.focusws,0,$(".bar").height());
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
    this.id = site.child[0].windows.length;
    this.workspace = this.parent.workspace;
    this.xpos = 0;
    this.ypos = 0;
    
    this.create();
    repositionAll(site.focusws,0,$(".bar").height());
    this.focus();
    this.app = application();
    this.app.html = this.html;
    this.app.create();

    var currentwindow = this;
    $("#"+this.id+this.type).mouseover(function() {
        currentwindow.focus();
    }); 
}