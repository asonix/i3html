function ImageBrowser() {
    this.name = "Images";
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
        q.header.append("<span class=\"hcenter\">Images</span>");
        q.hcenter = q.header.find(".hcenter");
        $(".hcenter").css("top",WmSettings.inset+9+WmSettings.border+"px");

        q.html.append("<div class=\"content\"></div>");
        q.content = q.html.find(".content");
        q.content.append("<div class=\"contentScrolling\"></div>");
        q.scrolling = q.content.find(".contentScrolling");
        size(q.html,q.content,q.header);
        var imagelist = images(q.scrolling);
    }
}

function buildImageIcon(filename) {
    var inside = "<div class=\"imageicon\" style=\"background-image: url('img/"+filename+"');\"></div>";
    var title = "<div class=\"imagetitle\">"+filename+"</div>";
    var container = "<div class=\"imagebutton\">"+inside+title+"</div>";
    return(container);
}

function images(html) {
    var images = [];
    $.ajax({
        url: 'php/images.php',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.images.length; i++) {
                if (data.images[i] != ".." && data.images[i] != ".") {
                    images.push(buildImageIcon(data.images[i]));
                }
            }
            html.html(images);
        }
    });
}

