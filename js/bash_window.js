function BashWindow() {
    this.currentdirectory = fs;
    var q = this;
    var r;
    var s;
    var t;
    var u;
    this.html;
    var html;
    this.create1 = function() {
        html.html("<div class=\"append\"></div>").append("<div class=\"active\"></div>");
        html.find(".active").append("<span class=\"currentdir\"></span>").append("<input autofocus type=\"text\" name=\"cmd\" class=\"input\" id=\"input\" autocomplete=\"off\" />");
        u = html.find(".active");
        r = html.find(".active").find("span");
        s = html.find(".active").find("input");
        t = html.find(".append");
    }
    this.create2 = function(q) {
        r.html(currentline(q.currentdirectory)+" ");
        s.val("");
        
        s.keypress(function(key) {
            if (key.keyCode == 13) {    //'enter'
                var formInput = s.val();
                var parsing = formInput.split(" ");
                
                u.toggle();
                if (formInput != "" && typeof(formInput) != "undefined") {
                    t.append(currentline(q.currentdirectory)+" "+formInput+"</br>");
                }
                
                runCommand(parsing,q.currentdirectory,q);
                
                r.html(currentline(q.currentdirectory)+" ");
                s.val("");
                u.toggle();
            }
        });
    }
    this.create = function() {
        html = this.html;
        
        this.create1();
        
        this.active = u;
        this.curdir = r;
        this.input = s;
        this.append = t;

        this.create2(this);
    }
}
