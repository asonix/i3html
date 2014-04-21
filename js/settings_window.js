function Settings() {
    this.name = "Settings";
    var q = this;
    this.html;
    var html;
    this.focus = function() {}
    this.create = function() {
        html = this.html;
        this.create1();
    }
    this.create1 = function() {
        q.html.html("<div class=\"settings\"></div>");
        q.html = html.find(".settings");

        q.html.append("<div class=\"headerbar\"></div>");
        q.header = q.html.find(".headerbar");
        q.header.append("<span class=\"hleft\"></span>");
        q.hleft = q.header.find(".hleft");
        q.hleft.append("<div class=\"nav\" id=\"shome\"><div>H</div></div>");
        q.hleft.append("<div class=\"nav\" id=\"sback\"><div>B</div></div>");
        q.home = q.hleft.find("#shome");
        q.back = q.hleft.find("#sback");
        q.home.hide();
        q.header.append("<span class=\"hcenter\">Settings</span>");
        q.hcenter = q.header.find(".hcenter");
        q.header.append("<span class=\"hright\"></span>");
        q.hright = q.header.find(".hright");
        q.hright.append("<div class=\"search\"></div>");
        q.searchbar = q.hright.find(".search");
        q.searchbar.append("<input type=\"text\" val=\"Search\" />");
        q.search = q.searchbar.find("input");

        q.html.append("<div class=\"content\"></div>");
        q.content = q.html.find(".content");
        q.content.append("<div class=\"contentScrolling\"></div>");
        q.scrolling = q.content.find(".contentScrolling");
        q.scrolling.append("<div class=\"attributes\"></div>");
        q.attributes = q.scrolling.find(".attributes");
        
        size(q.html,q.content,q.header);

        var w = new SettingsHolder();
        q.categories = [];
        for (var i = 0; i < w.q.length; i++) {
            var knownCat = false;
            for (var j = 0; j < q.categories.length; j++) {
                if (w.q[i].category == q.categories[j].name) {
                    knownCat = true;
                    q.categories[j].html.append("<div class=\"plug\" id=\""+w.q[i].name+"\"><div class=\"icon\"></div><div class=\"name\">"+w.q[i].name+"</div></div>");
                }
            }
            if (knownCat == false) {
                q.scrolling.append("<div class=\"category\" id=\""+w.q[i].category+"\"><div class=\"ctitle\">"+w.q[i].category+"</div></div>");
                q.categories.push(new Category(w.q[i].category,q.scrolling.find("#"+w.q[i].category)));
                q.categories[q.categories.length-1].html.append("<div class=\"plugs\"></div>");
                q.categories[q.categories.length-1].html = q.categories[q.categories.length-1].html.find(".plugs");
                q.categories[q.categories.length-1].html.append("<div class=\"plug\" id=\""+w.q[i].name+"\"><div class=\"icon\"></div><div class=\"name\">"+w.q[i].name+"</div></div>");
            }
        }
        var prev;
        $("#shome").click(function(){
            var i = 0;
            var u = setInterval(function(){
                if (i > 1) {
                    $(".attributes").fadeOut(300).html(" ");
                    $(".category").delay(400).show(300);
                    q.home.hide();
                    q.back.delay(300).show();
                    q.hcenter.html("Settings");
                    clearInterval(u);
                }
                else {
                    i++;
                }
            },50);
        });
        $("#sback").click(function(){
            if (typeof(prev) != "undefined") {
                $(".category").fadeOut(300);
                q.attributes.delay(400).fadeIn(300);
                q.back.hide();
                q.home.delay(300).show();
                q.hcenter.html(prev);
                w.create(prev);
            }
        });
        $(".plug").click(function(){
            $(".category").fadeOut(300);
            q.back.hide();
            q.attributes.delay(400).fadeIn(300);
            q.home.delay(300).show();
            w.create(this.id);
            q.hcenter.html(this.id);
            prev = this.id;
        });
    }
}
