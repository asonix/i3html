function Editor(args,cur_win_dir,cur_win) {
    var editor = this;
    var htmlcmd;
    var htmlshow;
    var filecontent;
    var state = "bindings";
    var stop = false;
    var old;
    this.create = function() {
        cur_win.app = this;
        cur_win.taken = true;
        old = cur_win.html.find(".append").html();
        cur_win.html.find(".append").html("");
        if (args.length == 0) {
            handleErrors("<div class=\"editor\" id=\""+cur_win.id+"\"></div></br><div class=\"editcmd\"></div>",cur_win);
            filecontent = [[]];
        }
        else {
            editor.file = handleErrors(search(preparePath(args[0]),"","file",cur_win_dir,cur_win),cur_win);
            if (editor.file != false) {
                filecontent = editor.file.contents;
                var filestring = "";
                for (var i = 0; i < editor.file.contents.length; i++) {
                    for (var j = 0; j < editor.file.contents[i].length; j++) {
                        filestring += "<span class=\"editspan\">"+editor.file.contents[i][j]+"</span>";
                    }
                    if (i != editor.file.contents.length-1) {
                        filestring += "</br>";
                    }
                }
                handleErrors("<div class=\"editor\" id=\""+cur_win.id+"\">"+filestring+"</div><div class=\"editcmd\"></div>",cur_win);
            }
        }
        htmlshow = cur_win.html.find(".editor");
        htmlcmd = cur_win.html.find(".editcmd");
    }
    this.run = function() {
        if (editor.file != false) {
            var childx = 0;
            var childy = 0;
            var childxtemp = 0;
            var arr = filecontent;
            arr[childy].push("&nbsp;");

            $(window).keydown(function(key) {
                if (stop == false) {
                    if (state == "cmd") {
                        htmlcmd.append(js2char(key.keyCode,key.shiftKey));
                        if (key.keyCode == "13") {
                            if (htmlcmd.html().indexOf("q") != -1) {
                                htmlcmd.html("");
                                htmlshow.remove();
                                htmlcmd.remove();
                                cur_win.taken = false;
                                cur_win.app = undefined;
                                state = "bindings";
                                stop = true;
                                cur_win.html.find(".append").html(old);
                            }
                            else {
                                htmlcmd.html("");
                                state = "bindings";
                            }
                        }
                    }
                    else if (state == "bindings") {
                        childxtemp = childx;
                        if (arr[childy][arr[childy].length-1] == "&nbsp;") {
                            arr[childy].splice(arr[childy].length-1,1);
                        }
                        if (key.shiftKey && key.keyCode == "186") { //colon
                            state = "cmd";
                        }
                        if (key.keyCode == "73") { //i
                            state = "edit";
                            arr[childy].push("&nbsp;");
                        }
                        else if (key.keyCode == "65") { //a
                            childx++;
                            childxtemp = childx;
                            state = "edit";
                            arr[childy].push("&nbsp;");
                        }
                        else if (key.keyCode == "72") { //h
                            if (childx > 0) {
                                childx--;
                                childxtemp = childx;
                            }
                        }
                        else if (key.keyCode == "74") { //j
                            if (childy < arr.length-1) {
                                childy++;
                            }
                            if (childx > arr[childy].length-1) {
                                childxtemp = arr[childy].length-1;
                            }
                        }
                        else if (key.keyCode == "75") { //k
                            if (childy > 0) {
                                childy--;
                            }
                            if (childx > arr[childy].length-1) {
                                childxtemp = arr[childy].length-1;
                            }
                        }
                        else if (key.keyCode == "76") { //l
                            if (childx < arr[childy].length-1) {
                                childx++;
                                childxtemp = childx;
                            }
                        }
                        editor.redraw(htmlshow,arr,childxtemp,childy);
                    }
                    else if (state == "edit") {
                        if (key.keyCode == "13") { //enter
                            var q = arr[childy].splice(childx,arr[childy].length-1);
                            arr.splice(childy+1,0,q);
                            childy++;
                            childx = 0;
                        }
                        else if (key.keyCode == "27") { //escape
                            key.preventDefault();
                            state = "bindings";
                            if (childx > 0) {
                                childx--;
                            }
                        }
                        else if (key.keyCode == "32") { //space bar
                            arr[childy].splice(childx,0,"&nbsp;");
                            childx++;
                        }
                        else if (key.keyCode == "8") { //backspace
                            if (childx != 0) {
                                arr[childy].splice(childx-1,1);
                                childx--;
                            }
                            else {
                                if (childy != 0) {
                                    while (0 < arr[childy].length) {
                                        arr[childy-1].splice(arr[childy-1].length,1,arr[childy].splice(0,1));
                                    }
                                    arr.splice(childy,1);
                                    childy--;
                                    childx = arr[childy].length-1;
                                }
                            }
                        }
                        else {
                            if (key.shiftKey) {
                                arr[childy].splice(childx,0,js2char(key.keyCode,true));
                            }
                            else {
                                arr[childy].splice(childx,0,js2char(key.keyCode,false));
                            }
                            childx++;
                        }
                        editor.redraw(htmlshow,arr,childx,childy);
                    }
                }
            });
        }
        else {
            cur_win.taken = false;
        }
    }
    this.redraw = function(htmlshow,arr,childx,childy) {
        htmlshow.html("");
        for (var i = 0; i < arr.length; i++) {
            htmlshow.append("<div class=\"line"+i+"\"></div>");
            htmlline = htmlshow.find(".line"+i);
            for (var j = arr[i].length-1; j >= 0; j--) {
                if (arr[i][j] == "") {
                    arr[i].splice(j,1);
                }
                if (i == childy && j == childx) {
                    htmlline.prepend("<span class=\"editspanind\">"+arr[i][j]+"</span>");
                }
                else if (arr[i][j] != undefined) {
                    htmlline.prepend("<span class=\"editspan\">"+arr[i][j]+"</span>");
                }
            }
            if (i != arr.length-1) {
                htmlline.append("</br>");
            }
        }
    }
    this.create();
    this.run();
}

