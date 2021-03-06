var BashSettings = new function() {
    this.padding = 5;
    this.fontsize = 12;
    var m = this;
    this.settings = function() {
        m.text1 = new TextBox("Padding",m.padding+"");
        m.text2 = new TextBox("Font Size",m.fontsize+"");
        var re1 = new RisingEdge();
        var re2 = new RisingEdge();
        var q = setInterval(function(){
            m.padding = Number(m.text1.check());
            m.fontsize = Number(m.text2.check());
            if (re1.check(m.fontsize)) {
                $(".bashContainer").css("font-size",m.fontsize+"px");
                $(".input").css("font-size",m.fontsize+"px");
            }
            if (re2.check(m.padding)) {
                $(".bashContainer").css("padding",m.padding+"px");
            }
            $("#shome").click(function(){
                clearInterval(q);
            });
        },25);
    }
}

var WmSettings = new function() {
    this.inset = 20;
    this.fontsize = 12;
    this.border = 3;
    var m = this;
    this.settings = function() {
        m.text1 = new TextBox("Inset",m.inset+"");
        m.text2 = new TextBox("Font Size",m.fontsize+"");
        m.text3 = new TextBox("Border Width",m.border+"");
        var re1 = new RisingEdge();
        var re2 = new RisingEdge();
        var re3 = new RisingEdge();
        var q = setInterval(function(){
            m.inset = Number(m.text1.check());
            m.fontsize = Number(m.text2.check());
            m.border = Number(m.text3.check());
            if (re1.check(m.inset) || re2.check(m.border)) {
                for (var i = 0; i < site.child.length; i++) {
                    resizeAll(site.child[i]);
                }
            }
            if (re3.check(m.fontsize)) {
                $(".bar").css("font-size",m.fontsize+"px");
                $(".wintitle").css("font-size",m.fontsize+"px");
            }
            $("#shome").click(function(){
                clearInterval(q);
            });
        },25);
    }
}

var Preferences = new function() {
    this.title = 24;
    this.fontsize = 16;
    this.name = 12;
    var m = this;
    this.settings = function() {
        m.text1 = new TextBox("Large Size",m.title+"");
        m.text2 = new TextBox("Medium Size",m.fontsize+"");
        m.text3 = new TextBox("Small Size",m.name+"");
        var re1 = new RisingEdge();
        var re2 = new RisingEdge();
        var re3 = new RisingEdge();
        var q = setInterval(function(){
            m.title = Number(m.text1.check());
            m.fontsize = Number(m.text2.check());
            m.name = Number(m.text3.check());
            if (re1.check(m.title)) {
                $(".ctitle").css("font-size",m.title+"px");
            }
            if (re2.check(m.fontsize)) {
                $(".attributes").css("font-size",m.fontsize+"px");
            }
            if (re3.check(m.name)) {
                $(".plug").css("font-size",m.name+"px");
            }
            $("#shome").click(function(){
                clearInterval(q);
            });
        },25);
    }
}

