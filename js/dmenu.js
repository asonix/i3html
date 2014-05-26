function dmenu() {
    $("body").append("<div class=\"dmenu\"></div>");
    $(".dmenu").append("<input id=\"dmenu\" name=\"dmenu\"type=\"text\" value=\"\" />").append("<span id=\"dapp\"></span>");
    $(".dmenu input").focus();
    $(".dmenu").mouseover(function(){
        $(".dmenu input").focus();
    });
    var inc = 0;
    var fo = setInterval(function() {
        if (inc > 1) {
            $(".dmenu input").focus();
            clearInterval(fo);
        }
        inc++;
    },25);
    var prevwindow = site.focus;
    if (prevwindow != "none" && prevwindow != "") {
        prevwindow.unfocus();
    }
    var workingdir = search(preparePath("/usr/bin"),"","folder");
    var q;
    var r;
    var child = 1;
    var lsarr = [];
    var lsstrhigh;
    var lsstrlow;
    var re1 = new RisingEdge();
    var re2 = new RisingEdge();
    var m = setInterval(function() {
        lsstrhigh = "";
        lsstrlow = "";
        lsarr = [];
        if (re1.check(child)) {
            $(".dmapp").css("background-color","transparent");
            $(".dmapp:nth-child("+child+")").css("background-color","#d64937");
        }
        q = document.getElementById("dmenu").value;
        if (re2.check(q)) {
            r = q.length;
            for (var i = 0; i < workingdir.contents.length; i++) {
                if (workingdir.contents[i].name.indexOf(q) != -1) {
                    lsarr.push(workingdir.contents[i].name);
                }
            }
            lsarr.sort();
            for (var i = 0; i < lsarr.length; i++) {
                if (lsarr[i].indexOf(q) == 0) {
                    lsstrhigh += "<span class=\"dmapp\">"+lsarr[i]+"</span>";
                }
                else if (lsarr[i].indexOf(q) != -1) {
                    lsstrlow += "<span class=\"dmapp\">"+lsarr[i]+"</span>";
                }
            }
            $("#dapp").html(lsstrhigh+lsstrlow);
            child = 1;
            $(".dmapp").css("background-color","transparent");
            $(".dmapp:nth-child("+child+")").css("background-color","#d64937");
        }
    },25);
    $(".dmenu input").keydown(function(e) {
        if (e.keyCode == "13") {
            e.preventDefault();
            if ($("#dapp").children().length > 0) {
                runCommand([$(".dmapp:nth-child("+child+")").html()],fs.currentdir,"");
            }
            else {
                var parsing = document.getElementById("dmenu").value.split(" ");
                runCommand(parsing,"","");
            }
            if (prevwindow != "none" && prevwindow != "") {
                prevwindow.focus();
            }
            clearInterval(m);
            $(".dmenu").remove();
        }
        if (e.keyCode == "27") {
            e.preventDefault();
            if (prevwindow != "none" && prevwindow != "") {
                prevwindow.focus();
            }
            $(".dmenu").remove();
            clearInterval(m);
        }
        if (e.keyCode == "37" && child > 1) {
            child--;
        }
        if (e.keyCode == "39" && child < $("#dapp").children().length) {
            child++;
        }
    });
}
