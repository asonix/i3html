function dmenu() {
    $("body").append("<div class=\"dmenu\"></div>");
    $(".dmenu").append("<input id=\"dmenu\" name=\"dmenu\"type=\"text\" value=\"\" />").append("<span id=\"dapp\"></span>");
    $(".dmenu input").focus();
    $(".dmenu").mouseover(function(){
        $(".dmenu input").focus();
        console.log("focusing");
    });
    var workingdir = search(preparePath("/usr/bin"),"","folder");
    var q;
    var r;
    var child = 1;
    var ls;
    var re1 = new RisingEdge();
    var re2 = new RisingEdge();
    var m = setInterval(function() {
        ls = "";
        if (re1.check(child)) {
            $(".dmapp").css("background-color","transparent");
            $(".dmapp:nth-child("+child+")").css("background-color","#d64937");
        }
        q = document.getElementById("dmenu").value;
        if (re2.check(q)) {
            r = q.length;
            for (var i = 0; i < workingdir.contents.length; i++) {
                if (workingdir.contents[i].name.substring(0,r) == q) {
                    ls += "<span class=\"dmapp\">"+workingdir.contents[i].name + "</span>";
                }
            }
            $("#dapp").html(ls);
            child = 1;
            $(".dmapp").css("background-color","transparent");
            $(".dmapp:nth-child("+child+")").css("background-color","#d64937");
        }
    },25);
    $(".dmenu input").keydown(function(e) {
        if (e.keyCode == "13") {
            e.preventDefault();
            if ($("#dapp").children().length != 0) {
                runCommand([$(".dmapp:nth-child("+child+")").html()],"","");
            }
            else {
                var parsing = document.getElementById("dmenu").value.split(" ");
                runCommand(parsing,"","");
            }
            $(".dmenu").remove();
            clearInterval(m);
        }
        if (e.keyCode == "27") {
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
