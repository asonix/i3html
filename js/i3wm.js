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
function Time() {
    var h,m,s,Y,M,D;
    var recurring = setInterval(function(){
        var current = new Date();
        h = this.addzero(current.getHours());
        m = this.addzero(current.getMinutes());
        s = this.addzero(current.getSeconds());
        Y = this.addzero(current.getFullYear());
        M = this.addzero(current.getMonth()+1);
        D = this.addzero(current.getDate());
        $(".time").html(h+":"+m+":"+s+" "+D+"."+M+"."+Y);
    },1000);
    this.addzero = function(arg) {
        if (arg < 10) {
            arg = "0"+arg;
        }
        return(arg);
    }
}
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
function SearchParentDirections(currentwindow,expanddir) {
    this.search = function(x) {
        var returned = [x,x.parent];
        var type = currentwindow.parent.type;
        if ((x.direction == expanddir && type == "window") || type == "workspace") {
            return(returned);
        }
        else {
            return(this.search(x.parent));
        }
    }
    if (currentwindow.child.length != 0) {
        return(this.search(currentwindow.child[0]));
    }
    else {
        return(this.search(currentwindow));
    }
}
function NewWindowSize(newwindow) { 
    var q = newwindow.parent.child.length+1;

    if (newwindow.parent.type == "workspace") {
        q -= 1;
    }
    
    //console.log("Number of Windows to be resized: "+q);
    
    var totalx = 0;
    var totaly = 0;

    for (var i = 0; i < newwindow.parent.child.length; i++) {
        if (newwindow.parent.child[i] != newwindow) {
            totalx += newwindow.parent.child[i].width;
            totaly += newwindow.parent.child[i].height;
        }
    }

    if (newwindow.parent.type == "window") {
        totalx += newwindow.parent.width;
        totaly += newwindow.parent.height;
    }
    else if (newwindow.parent.type == "workspace" && newwindow.parent.child.length == 1) {
        totalx = newwindow.parent.width;
        totaly = newwindow.parent.height;
    }

    if (newwindow.parent.next == "right") {
        newwindow.width = totalx/q;
        newwindow.height = newwindow.parent.height;
    }
    else {
        newwindow.height = totaly/q;
        newwindow.width = newwindow.parent.width;
    }
    
    for (var i = 0; i < newwindow.parent.child.length; i++) {
        if (newwindow.parent.next == "right" && newwindow.parent.child[i] != newwindow) {
            newwindow.parent.child[i].width = newwindow.parent.child[i].width-newwindow.width/(q-1);
        }
        else if (newwindow.parent.child[i] != newwindow && newwindow.parent.next !="right") {
            newwindow.parent.child[i].height = newwindow.parent.child[i].height-newwindow.height/(q-1);
        }
    }
    if (newwindow.parent.type != "workspace") {
        if (newwindow.parent.next == "right") {
            newwindow.parent.width = newwindow.parent.width-newwindow.width/(q-1);
        }
        else {
            newwindow.parent.height = newwindow.parent.height-newwindow.height/(q-1); 
        }
    }
}
function RepositionAll(outer,totalx,totaly) {
    var ichild;
    for (var i = 0; i < outer.child.length; i++) {
        ichild = outer.child[i];
        
        if (ichild.next == "right") {
            RepositionAll(ichild,totalx+ichild.width,totaly);
        }
        else if (ichild.next == "down") {
            RepositionAll(ichild,totalx,totaly+ichild.height);
        }
        
        if (ichild.direction == "right") {
            ichild.ypos = totaly;
            ichild.xpos = totalx;
            totalx += ichild.width;
        }
        else {
            ichild.xpos = totalx;
            ichild.ypos = totaly;
            totaly += ichild.height;
        }
        ichild.html.css("top",ichild.ypos+"px").css("left",ichild.xpos+"px");
    }
}
function ResizeAll() {
    for (var i = 0; i < site.child.length; i++) {
        for (var j = 0; j < site.child[i].windows.length; j++) {
            var ref = site.child[i].windows[j];
            $("#"+ref.id+ref.type).css('height',ref.height-2+'px').css('width',ref.width-2+'px');
        }
    }
}
function AssignParent(newwindow) {
     
    if (site.focus.next == "right" || site.focus.next == "down") {
        newwindow.parent = site.focus;
    }
    else if (site.focus.next == "none") {
        newwindow.parent = site.focus.parent;
    }
    else {
        newwindow.parent = site.focusws;
    }
}
function Window() {
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
        ResizeAll();
        RepositionAll(site.focusws,0,$(".bar").height());
    }
    
    AssignParent(this);
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
    NewWindowSize(this);
    this.id = site.child[0].windows.length;
    this.workspace = this.parent.workspace;
    this.xpos = 0;
    this.ypos = 0;
    
    this.create();
    RepositionAll(site.focusws,0,$(".bar").height());
    this.focus();

    var currentwindow = this;
    $("#"+this.id+this.type).mouseover(function() {
        currentwindow.focus();
    }); 
}
Time();
var site = new Site();
new Workspace("1");