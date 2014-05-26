function BashWindowTest(command) {
    this.processes = [];
    this.taken = false;
    this.name = "term";
    this.currentdirectory = fs.currentdir;
    this.append;
    this.focused;
    this.html;
    this.text = "";
    this.temp = "";
    this.available = true;
    var q = this;
    var r;
    var t;
    var u;
    var scrollmod = 2;
    var html;
    this.focus = function() {
        q.focused = true;
        if (this.taken == false) {
        }
        else {
            this.app.focus();
        }
    }
    this.unfocus = function() {
        q.focused = false;
        if (this.taken == true) {
            this.app.unfocus();
        }
    }
    this.kill = function() {
        for (var i = 0; i < q.processes.length; i++) {
            clearInterval(q.processes[i]);
        }
        q.done = true;
    }
    this.input = function() {
        var num = 0;
        var cmd = "";
        $(window).keydown(function(key) {
            if (!key.ctrlKey && !key.altKey && q.available == true && q.focused == true) {
                key.preventDefault();
                shift = key.shiftKey;
                if (q.focused) {
                    if (key.keyCode == "13") {  //enter
                        q.available = false;
                        var parsing = cmd.split(" ");
                        for (var i = 0; i < parsing.length; i++) {
                            if (parsing[i] == "" || parsing[i].charCodeAt(0) == 0) {
                                parsing.splice(i,1);
                            }
                        }
                        cmd = "";
                        num = 0;
                        q.text += "\n";
                        var ww = runCommand(parsing,q.currentdirectory,q);
                        if (typeof(ww) != "undefined" || q.taken == true) {
                            var mm = setInterval(function() {
                                if (q.taken != true) {
                                    q.available = true;
                                    q.text += currentline(q.currentdirectory)+" ";
                                    q.temp = q.text;
                                    q.append.html("");
                                    clearInterval(mm);
                                }
                            },25);
                            q.processes.push(mm);
                        }
                    }
                    else if (key.keyCode == "8" && num > -1) { //backspace
                        var cmda = cmd.split("");
                        for (var i = 0; i < cmda.length; i++) {
                            if (cmda[i] == "" || cmda[i].charCodeAt(0) == 0) {
                                cmda.splice(i,1);
                            }
                        }
                        num--;
                        cmda.splice(num,1);
                        cmd = cmda.join("");
                        q.text = q.temp + cmd;
                    }
                    else if (key.keyCode == "37" && num > 0) { //left
                        num--;
                    }
                    else if (key.keyCode == "39" && num < cmd.length) { //right
                        num++;
                    }
                    else {
                        var cmda = cmd.split("");
                        num++;
                        cmda.splice(num,0,js2char(key.keyCode,shift));
                        cmd = cmda.join("");
                        q.text = q.temp + cmd;
                    }
                }
            }
        });
    }
    this.create = function() {
        html = q.html;
        html.html("<div class=\"bashContainer\"></div>");
        html.append("<div class=\"append\" style=\"display: none\"></div>");
        q.append = html.find(".append");
        html.find(".bashContainer").html("<div class=\"termtest\"></div>");
        var tt = html.find(".termtest").css("font-size",BashSettings.fontsize+"px").css("padding",BashSettings.padding+"px");
        var re1 = new RisingEdge();
        var re2 = new RisingEdge();
        var re3 = new RisingEdge();
        var re4 = new RisingEdge();

        var direction = 0;
        var wheelactive = 0;
        var relativej = 0;
        html.mousewheel(function(event,delta) {
            direction = scrollmod*delta/Math.abs(delta);
            wheelactive++;
        });
        q.text = currentline(q.currentdirectory)+" ";
        if (typeof(command) != "undefined" && command != "") {
            var parsing = command.split(" ");
            q.text += command+"\n";
            var ww = runCommand(parsing,q.currentdirectory,q);
            if (typeof(ww) != "undefined") {
                q.text += currentline(q.currentdirectory)+" ";
            }
        }
        q.temp = q.text;
        q.input();
        q.processes.push(setInterval(function() {
            var test = q.text.split("\n");
            for (var i = 0; i < test.length; i++) {
                test[i] = test[i].split("");
                for (var j = 0; j < test[i].length; j++) {
                    if (test[i][j] == " ") {
                        test[i][j] = "&nbsp;";
                    }
                }
            }
            var wheel = re2.check(wheelactive);
            var size = re1.check(html.width()+html.height());
            var content = re4.check(q.text);
            if (size || wheel || content) {
                
                var numspansx = (tt.width() - 2 * BashSettings.padding - (tt.width()  - 2 * BashSettings.padding) %  7) /  7;
                var numspansy = (tt.height()- 2 * BashSettings.padding - (tt.height() - 2 * BashSettings.padding) % 15) / 15;
                if (numspansx == 0) {
                    numspansx = 1;
                }

                var height = 0;
                var value = 0;
                for (var i = test.length-1; i >= 0; i--) {
                    height += 1 + parseInt((1+test[i].length)/numspansx);
                    if (height == numspansy || (i == 0 && height <= numspansy)) {
                        value = i;
                    }
                }
                
                var write = "";
                var j = value;
                var height2 = 0;
                for (var i = j+relativej; i >= 0; i--) {
                    height2 += 1 + parseInt((1+test[i].length)/numspansx);
                }
                var newcontent = re3.check(j);
                if (wheel && !newcontent) {
                    if ((relativej+j > 0 && direction == scrollmod) || (height2 + numspansy < height && direction == -scrollmod)) {
                        relativej -= direction;
                    }
                    j += relativej;
                    if (j < 0) {
                        j = 0;
                    }
                    else if (j > test.length-1) {
                        j = test.length-1;
                    }
                }
                else if(newcontent) {
                    jrelativej = 0;
                }
                var k = 0;
                for (var h = 0; h < numspansy; h++) {
                    var newline = false;
                    for (var i = 0; i < numspansx; i++) {
                        if (j < test.length && k < test[j].length) {
                            write += "<span class=\"charspan\">"+test[j][k]+"</span>";
                            k++;
                        }
                        else if (j < test.length && k == test[j].length) {
                            newline = true;
                            write += "&nbsp;";
                        }
                        else {
                            write += "&nbsp;";
                        }
                    }
                    if (newline == true) {
                        j++;
                        k = 0;
                    }
                    write += "</br>";
                }
                tt.html(write);
            }
        },50));

    }
}
