function BashWindowTest(command) {
    this.processes = [];
    this.taken = false;
    this.name = "term";
    this.currentdirectory = fs.currentdir;
    var q = this;
    this.kill = function() {
        for (var i = 0; i < q.processes.length; i++) {
            clearInterval(q.processes[i]);
        }
        q.done = true;
    }
    var r;
    var t;
    var u;
    this.html;
    var scrollmod = 2;
    var html;
    this.text = "abcdefghijklmnopqrstuvwxyz this is a test of a really long line I hope it works well. I'm really not sure what will happen here. Whoop de doop de doop de doo. long lines of text are my friend and I really like them. Hell yeah.\n    abcdefghijklmnopqrstuvwxyz\n        zyxwvutsrqponmlkjihgfedcba\n\nThis was a triumph\n";
    this.text += "I'm making a note here: HUGE SUCCESS\nIts hard to overstate my satisfaction\n\nAperature Science\nWe do what we must because we can\nFor the good of all of us\nExcept the ones who are dead\n\nBut there's no sense crying over every mistake";
    this.text += "\nYou just keep on trying 'till you run out of cake\nAnd the science gets done\nAnd you make a neat gun\nFor the people who are still alive\nAnother\nFew\nLines\nFor\nTesting\nThings\nPlease\nThanks";
    test = test.split("\n");
    this.focus = function() {
    }
    this.unfocus = function() {
    }
    this.create = function() {
        html = q.html;
        html.html("<div class=\"bashContainer\"></div>")
        html.find(".bashContainer").html("<div class=\"termtest\"></div>");
        var tt = html.find(".termtest").css("font-size",BashSettings.fontsize+"px").css("padding",BashSettings.padding+"px");
        var re1 = new RisingEdge();
        var re2 = new RisingEdge();
        var re3 = new RisingEdge();

        var direction = 0;
        var wheelactive = 0;
        var relativej = 0;
        html.mousewheel(function(event,delta) {
            direction = scrollmod*delta/Math.abs(delta);
            wheelactive++;
        });
        q.processes.push(setInterval(function() {
            for (var i = 0; i < test.length; i++) {
                test[i] = test[i].split("");
                for (var j = 0; j < test[i].length; j++) {
                    if (test[i][j] == " ") {
                        test[i][j] = "&nbsp;";
                    }
                }
            }
            var wheel = re2.check(wheelactive);
            if (re1.check(html.width()+html.height()) || wheel) {
                
                var numspansx = (tt.width() - 2 * BashSettings.padding - (tt.width()  - 2 * BashSettings.padding) %  7) /  7;
                var numspansy = (tt.height()- 2 * BashSettings.padding - (tt.height() - 2 * BashSettings.padding) % 15) / 15;
                if (numspansx == 0) {
                    numspansx = 1;
                }

                var height = 0;
                var value = 0;
                for (var i = test.length-1; i >= 0; i--) {
                    height += 1 + parseInt((1+test[i].length)/numspansx);
                    if (height == numspansy || i == 0) {
                        value = i;
                    }
                }
                
                var write = "";
                var j = value;
                var newcontent = re3.check(j);
                if (wheel && !newcontent) {
                    if ((relativej+j > 0 || direction == -scrollmod) && (relativej+j < test.length-1 || direction == scrollmod)) {
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
        },25));

    }
}
