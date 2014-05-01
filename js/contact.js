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
        q.html.html("<div class=\"contact\"></div>");
        q.html = html.find(".contact");

        q.html.append("<div class=\"headerbar\"></div>");
        q.header = q.html.find(".headerbar");
        q.header.append("<span class=\"hcenter\">Contact</span>");
        q.hcenter = q.header.find(".hcenter");

        q.html.append("<div class=\"content\"></div>");
        q.content = q.html.find(".content");
        q.content.append("<div class=\"contentScrolling\"></div>");
        q.scrolling = q.content.find(".contentScrolling");
        q.scrolling.html("<form class=\"contactus\" action=\"php/email.php\" method=\"post\" enctype=\"text/plain\"></form>");
        q.form = q.scrolling.find(".contactus");
        q.form.append("<table></table>");
        q.form.find("table").append("<tr><td>Name:</td><td><input type=\"text\" name=\"name\" /></td></tr>");
        q.form.find("table").append("<tr><td>Email:</td><td><input type=\"email\" name=\"email\" /></td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\">Message:</td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\"><textarea name=\"message\"></textarea></td></tr>");
        q.form.find("table").append("<tr><td colspan=\"2\"><input type=\"submit\" value=\"Submit\" /></td></tr>");
        validateForm();
    }
}

