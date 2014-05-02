function Contact() {
    this.name = "Contact";
    var q = this;
    this.html;
    var html;
    this.focus = function() {}
    this.unfocus = function() {}
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
        q.header.append("<span class=\"hcenter\">Contact</span>");
        q.hcenter = q.header.find(".hcenter");
        $(".hcenter").css("top",WmSettings.inset+9+WmSettings.border+"px");

        q.html.append("<div class=\"content\"></div>");
        q.content = q.html.find(".content");
        q.content.append("<div class=\"contentScrolling\"></div>");
        q.scrolling = q.content.find(".contentScrolling");
        q.scrolling.html("<form name=\"contactform\" class=\"contactus\"></form>");
        q.form = q.scrolling.find(".contactus");
        q.form.append("<table></table>");
        q.form.find("table").append("<tr><td><label for='name'>Name:</label></td><td><input type=\"text\" name=\"name\" /></td></tr>");
        q.form.find("table").append("<tr><td><label for='email'>Email:</label></td><td><input type=\"text\" name=\"email\" /></td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\"><label for='message'>Message:</label></td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\"><textarea name=\"message\"></textarea></td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\"><input type=\"button\" value=\"Send\" onClick=\"formThings()\" /></td></tr>");
        q.scrolling.append("<div class=\"error\"></div>");
        size(q.html,q.content,q.header);
    }
}

function formThings() {
    $(".error").hide();
    $(".error").html("");
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var message = $("textarea[name='message']").val();
    var error = false;
    if (name == "") {
        $(".error").append("Error: name not specified</br>");
        var error = true;
    }
    if (email == "") {
        $(".error").append("Error: email not specified</br>");
        var error = true;
    }
    if (message == "") {
        $(".error").append("Error: message not specified");
        var error = true;
    }
    if (error == false) {
        $(".error").html("Sending...");
        submitWithoutRefresh(name,email,message);
    }
    $(".error").show();
}

function submitWithoutRefresh(name,email,message) {
    var datastring = 'name='+name+'&email='+email+'&message='+message;
    $.ajax({
        type: "POST",
        url: "php/email.php",
        data: datastring,
        success: function() {
            $(".contactus").remove();
            $(".error").html("<div class=\"thankyou\">Thank you for contacting me!</br> The email has been sent, and I will recieve it momentarily.</br>While you are waiting for a response, you may continue to use this site or, if you prefer, you can check out <a href=\"http://github.com/asonix\">my github</a>. This site is listed under the repository <a href=\"http://github.com/asonix/i3html\">i3html</a>, and I frequently push updates. If you want to check out the code, I would head over there.</div>");
        }
    });
}
