function Editor(args,cur_win_dir,cur_win) {
    var editor = this;
    var htmlmod;
    var htmlcontent;
    var htmlshow;
    var filecontent;
    var state = "cmd";
    /*
    this.focus = function() {
        if (state == "cmd") {
            $("#"+cur_win.id+"main").focus();
        }
        else if (state == "type") {
            $("#"+cur_win.id+"content").focus();
        }
    }
    */
    this.create = function() {
        cur_win.app = this;
        cur_win.taken = true;
        if (args.length == 0) {
            handleErrors("<input type=\"text\" id=\""+cur_win.id+"content\" style=\"position: fixed; top: 100%; height: 100px;\" /><input type=\"text\" id=\""+cur_win.id+"main\" style=\"position: fixed; top: 100%; height: 100px;\" /><div class=\"editor\" id=\""+cur_win.id+"\"></div>",cur_win);
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
                handleErrors("<input type=\"text\" id=\""+cur_win.id+"content\" style=\"position: fixed; top: 100%; height: 100px;\" /><input type=\"text\" id=\""+cur_win.id+"main\" style=\"position: fixed; top: 100%; height: 100px;\" /><div class=\"editor\" id=\""+cur_win.id+"\">"+filestring+"</div>",cur_win);
            }
        }
        htmlmod = cur_win.html.find("#"+cur_win.id+"main");
        htmlshow = cur_win.html.find(".editor");
        htmlcontent = cur_win.html.find("#"+cur_win.id+"content");
    }
    this.run = function() {
        if (editor.file != false) {
            var childx = 0;
            var childy = 0;
            var arr = filecontent;
            arr[childy].push("&nbsp;");
            $(window).keydown(function(key) {
                console.log(key.keyCode);
                if (state == "cmd") {
                    if (arr[childy][arr[childy].length-1] == "&nbsp;") {
                        arr[childy].splice(arr[childy].length-1,1);
                    }
                    if (key.keyCode == "56") { //colon
                        handleErrors("<input class=\"vimcmd\" id=\""+cur_win.id+"in\" type=\"text\" name=\"vimcmd\" value=\":\" />",cur_win);
                        $("#"+cur_win.id+"in").keypress(function(key) {
                            if (key.keyCode == "13") {
                                if (document.getElementById(cur_win.id+"in").value.indexOf("q") != -1) {
                                    clearInterval(m);
                                    $("#"+cur_win.id).remove();
                                    $("#"+cur_win.id+"in").remove();
                                    cur_win.taken = false;
                                    cur_win.app = undefined;
                                }
                            }
                        });
                    }
                    if (key.keyCode == "73") { //i
                        state = "type";
                        arr[childy].push("&nbsp;");
                    }
                    else if (key.keyCode == "65") { //i
                        childx++;
                        state = "type";
                        arr[childy].push("&nbsp;");
                    }
                    else if (key.keyCode == "72") { //h
                        if (childx > 0) {
                            childx--;
                        }
                    }
                    else if (key.keyCode == "74") { //j
                        if (childy < arr.length-1) {
                            childy++;
                        }
                    }
                    else if (key.keyCode == "75") { //k
                        if (childy > 0) {
                            childy--;
                        }
                    }
                    else if (key.keyCode == "76") { //l
                        if (childx < arr[childy].length-1) {
                            childx++;
                        }
                    }
                    editor.redraw(htmlshow,arr,childx,childy);
                }
                else if (state == "type") {
                    if (key.keyCode == "13") { //enter
                        var q = arr[childy].splice(childx,arr[childy].length-1);
                        arr.splice(childy+1,0,q);
                        childy++;
                        childx = 0;
                    }
                    else if (key.keyCode == "27") { //escape
                        key.preventDefault();
                        state = "cmd";
                        childx--;
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
                            if (typeof(arr[childy-1]) != "undefined") {
                                arr[childy-1].splice(arr[childy].length,1,arr.splice(childy,arr[childy].length));
                                childy--;
                            }
                            else {
                                if (arr[childy].length == 0) {
                                    arr.splice(childy,1);
                                    childy--;
                                }
                            }
                        }
                    }
                    else {
                        if (key.keyCode > 64 && key.keyCode < 92) {
                            if (key.shiftKey) {
                                arr[childy].splice(childx,0,String.fromCharCode(key.keyCode));
                            }
                            else {
                                arr[childy].splice(childx,0,String.fromCharCode(key.keyCode+32));
                            }
                            childx++;
                        }
                    }
                    editor.redraw(htmlshow,arr,childx,childy);
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
                if ((arr[i][j] == "&nbsp;" && j == arr[i].length-1 && i != childy) || (i == childy && arr[i][j] == "&nbsp;" && j > childx)) {
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
}

