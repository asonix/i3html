function Chat() {
    this.name = "Chat";
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
        q.header.append("<span class=\"hcenter\">Chat</span>");
        q.hcenter = q.header.find(".hcenter");
        $(".hcenter").css("top","9px");

        q.html.append("<div class=\"content\" style=\"overflow: hidden\"></div>");
        q.content = q.html.find(".content");
        size(q.html,q.content,q.header);
        q.content.append("<iframe src=\"http://ahswebtech.org/notime4jive\" style=\"width: 100%; height: 100%; border: 0px;\"></iframe><div class=\"closechat\" style=\"position: absolute; top: 8px; right: 10px; background-color: #d64937; color: #e5e5e5; border-radius: 3px; /*box-shadow: #000000 0px 0px 5px;*/ padding: 3px;\">Close</div>");
        q.content.find(".closechat").click(function() {
            q.conwin.kill();
        });
    }
}
