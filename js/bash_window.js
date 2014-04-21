function BashWindow(command) {
    this.name = "weBASH";
    this.currentdirectory = fs.currentdir;
    var q = this;
    var r;
    var s;
    var t;
    var u;
    this.html;
    var html;
    this.focus = function() {
        s.focus();
    }
    this.create1 = function() {
        html.html("<div class=\"bashContainer\"></div>")
        html.find(".bashContainer").html("<div class=\"append\"></div>").css("padding",BashSettings.padding+"px").append("<div class=\"active\"></div>");
        html.find(".active").append("<span class=\"currentdir\"></span>").append("<input autofocus type=\"text\" name=\"cmd\" class=\"input\" id=\"input\" autocomplete=\"off\" />");
        u = html.find(".active");
        r = html.find(".active").find("span");
        s = html.find(".active").find("input");
        t = html.find(".append");
    }
    this.create2 = function(q,command) {
        r.html(currentline(q.currentdirectory)+" ");
        s.val("");
        if (typeof(command) != "undefined") {
            var parsing = command.split(" ");
            u.toggle();
            t.append(currentline(q.currentdirectory)+" "+command+"</br>");
            runCommand(parsing,q.currentdirectory,q);
            r.html(currentline(q.currentdirectory)+" ");
            s.val("");
            u.toggle();
        }
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

        this.create2(this,command);
    }
}
