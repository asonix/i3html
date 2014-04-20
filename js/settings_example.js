function Test() {
    var m = this;
    this.name = "test";
    this.one = true;
    this.two = false;
    this.three = "three";
    this.four = "6";
    this.create = function() {
        m.c1 = new CheckBox("testOne",this.one);
        m.c2 = new CheckBox("testTwo",this.two);
        m.c3 = new SelectBox("testThree",["one","two","three"],this.three);
        m.c4 = new TextBox("testFour",this.four);
    }
    this.settings = function() {
        this.create();
        var q = setInterval(function(){
            m.one = m.c1.check();
            m.two = m.c2.check();
            m.three = m.c3.check();
            m.four = m.c4.check();
            $("#shome").click(function(){
                clearInterval(q);
            });
        },25);
    }
}

var t1 = new Test();
var t2 = new Test();
var t3 = new Test();
var t4 = new Test();
