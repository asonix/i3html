function CheckBox(name,value) {
    this.create = function() {
        $(".attributes").append("<div class=\"attribute\"><span class=\"aname\">"+name+"</span><span class=\"\"><input class=\"ainput\" id=\""+name+"\" name=\""+name+"\" type=\"checkbox\" value=\""+name+"\" /></div>");
        document.getElementById(name).checked=value;
    }
    this.create();
    this.check = function() {
        return(document.getElementById(name).checked);
    }
}
function SelectBox(name,values,value) {
    var s = "";
    for (var i = 0; i < values.length; i++) {
        s += "<option value=\""+values[i]+"\">"+values[i]+"</option>";
    }
    this.create = function() {
        $(".attributes").append("<div class=\"attribute\"><span class=\"aname\">"+name+"</span><span class=\"\"><select id=\""+name+"\" class=\"ainput\" name=\""+name+"\">"+s+"</select></div>");
        document.getElementById(name).value=value;
    }
    this.create();
    this.check = function() {
        return(document.getElementById(name).value);
    }
}
function TextBox(name,value) {
    this.create = function() {
        $(".attributes").append("<div class=\"attribute\"><span class=\"aname\">"+name+"</span><span class=\"\"><input id=\""+name+"\" class=\"ainput\" name=\""+name+"\" type=\"text\" /></div>");
        document.getElementById(name).value=value;
    }
    this.create();
    this.check = function() {
        return(document.getElementById(name).value);
    }
}

function AppSettings(name,category,settings) {
    this.name = name;
    this.category = category;
    this.settings = settings;
}

function Category(name,html) {
    this.name = name;
    this.html = html;
}

function size(settings,content,header) {
    var settingsHeight;
    var psettingsHeight;
    var m = setInterval(function(){
        settingsHeight = settings.height();
        if (settingsHeight != psettingsHeight) {
            content.css("height",settings.height()-header.height()+"px");
            psettingsHeight = settingsHeight;
        }
    }, 25);
}

