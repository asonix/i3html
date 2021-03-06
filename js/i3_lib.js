function time() {
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

function searchParentDirections(currentwindow,expanddir) {
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

function newWindowSize(newwindow) { 
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

function repositionAll(outer,totalx,totaly,workspace) {
    var ichild;
    for (var i = 0; i < outer.child.length; i++) {
        if (outer.workspace == workspace) {
            ichild = outer.child[i];
            
            if (ichild.next == "right") {
                repositionAll(ichild,totalx+ichild.width,totaly,workspace);
            }
            else if (ichild.next == "down") {
                repositionAll(ichild,totalx,totaly+ichild.height,workspace);
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
}

function resizeAll(workspace) {
        for (var j = 0; j < workspace.windows.length; j++) {
            var ref = workspace.windows[j];
            $("#"+ref.id+ref.type+workspace.name).css('height',ref.height+'px').css('width',ref.width+'px');
            $("#"+ref.id+ref.type+workspace.name).find(".appholder").css('height',ref.height-2*WmSettings.border-2*WmSettings.inset+'px').css('width',ref.width-2*WmSettings.border-2*WmSettings.inset+'px').css("margin-top",WmSettings.inset+"px").css("margin-left",WmSettings.inset+"px");
            $(".appholder").css("border-width",WmSettings.border+"px");
        }
}

function assignParent(newwindow) {
    if (site.focus.workspace == site.focusws) { 
        if (site.focus.next == "right" || site.focus.next == "down") {
            newwindow.parent = site.focus;
        }
        else if (site.focus.next == "none") {
            newwindow.parent = site.focus.parent;
        }
    }
    else {
        newwindow.parent = site.focusws;
    }
}

