function ImageBrowser() {
    this.name = "Images";
    var q = this;
    this.html;
    var html;
    this.focused = false;
    this.kill = function() {
        q.done = true;
    }
    this.focus = function() {
        this.focused = true;
    }
    this.unfocus = function() {
        this.focused = false;
    }
    this.create = function() {
        html = this.html;
        this.create1();
    }
    this.create1 = function() {
        q.html.html("<div class=\"settings\"></div>");
        q.html = html.find(".settings");

        q.html.append("<div class=\"headerbar\"></div>");
        q.header = q.html.find(".headerbar");
        q.header.append("<span class=\"hleft\"><div style=\"width: 24px; height: 24px;\"></div></span>");
        q.header.append("<span class=\"hcenter\">Images</span>");
        q.hcenter = q.header.find(".hcenter");
        $(".hcenter").css("top","9px");

        q.html.append("<div class=\"content\"></div>");
        q.content = q.html.find(".content");
        q.content.append("<div class=\"contentScrolling\"></div>");
        q.scrolling = q.content.find(".contentScrolling");
        size(q.html,q.content,q.header);
        var imagelist = images(q.scrolling,q);
    }
}

function buildImageIcon(filename) {
    var inside = "<div class=\"imageicon\" style=\"background-image: url('img/"+filename+"');\"></div>";
    var title = "<div class=\"imagetitle\">"+filename+"</div>";
    var container = "<div class=\"imagebutton\">"+inside+title+"</div>";
    return(container);
}

function images(html,browser) {
    var images = [];
    var imagesurl = [];
    $.ajax({
        url: 'php/images.php',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.images.length; i++) {
                if (data.images[i] != ".." && data.images[i] != ".") {
                    images.push(buildImageIcon(data.images[i]));
                    imagesurl.push(data.images[i]);
                }
            }
            html.html(images);
            $(".imagebutton").click(function() {
                var iterator = 0;
                for (var i = 0; i < imagesurl.length; i++) {
                    if ($(this).find(".imagetitle").text() == imagesurl[i]) {
                        iterator = i;
                        break;
                    }
                }
                html.append("<div class=\"fullimage\"><img src=\"img/"+imagesurl[iterator]+"\" /></div>");
                html.find(".fullimage").append("<div class=\"imageside\" style=\"left: 0px;\"></div><div class=\"imageside\" style=\"right: 0px;\"></div><div class=\"imageleft\"><</div><div class=\"imageright\">></div><div class=\"imageclose\"><div class=\"close\">x</div></div>");
                html.find(".imageclose").click(function() {
                    html.find(".fullimage").remove();
                    clearInterval(inter);
                });
                var re1 = new RisingEdge();
                var re2 = new RisingEdge();
                var counter = 0;
                var visible = true;
                var inter = setInterval(function() {
                    if (counter <= 5) {
                        counter++;
                    }
                    if (counter >= 4) {
                        html.find(".fullimage").find("div").fadeOut(300);
                        visible = false;
                    }
                }, 500);
                $(window).mousemove(function(event) {
                    if (browser.focused) {
                        if ((re1.check(event.pageX) || re2.check(event.pageY)) && visible == false) {
                            html.find(".fullimage").find("div").fadeIn(150);
                            counter = 0;
                        }
                        else if ((re1.check(event.pageX) || re2.check(event.pageY)) && visible == true) {
                            counter = 0;
                        }
                    }
                })
                $(window).keydown(function(key) {
                    if (browser.focused && !key.altKey) {
                        if (key.keyCode == "72" || key.keyCode == "37" || key.keyCode == "8") { //h or left or backspace
                            if (iterator == 0) {
                                iterator = imagesurl.length-1;
                            }
                            else {
                                iterator--;
                            }
                            html.find(".fullimage").find("img").remove();
                            html.find(".fullimage").prepend("<img src=\"img/"+imagesurl[iterator]+"\" />");
                        }
                        else if (key.keyCode == "76" || key.keyCode == "39" || key.keyCode == "32") { //l or right or space
                            if (iterator == imagesurl.length-1) {
                                iterator = 0;
                            }
                            else {
                                iterator++;
                            }
                            html.find(".fullimage").find("img").remove();
                            html.find(".fullimage").prepend("<img src=\"img/"+imagesurl[iterator]+"\" />");
                        }
                        else if (key.keyCode == "81") {
                            html.find(".fullimage").remove();
                            clearInterval(inter);
                        }
                    }
                });
                html.find(".imageleft").click(function() {
                    if (iterator == 0) {
                        iterator = imagesurl.length-1;
                    }
                    else {
                        iterator--;
                    }
                    html.find(".fullimage").find("img").remove();
                    html.find(".fullimage").prepend("<img src=\"img/"+imagesurl[iterator]+"\" />");
                    counter = 0;
                });
                html.find(".imageright").click(function() {
                    if (iterator == imagesurl.length-1) {
                        iterator = 0;
                    }
                    else {
                        iterator++;
                    }
                    html.find(".fullimage").find("img").remove();
                    html.find(".fullimage").prepend("<img src=\"img/"+imagesurl[iterator]+"\" />");
                    counter = 0;
                });
            });
        }
    });
}

