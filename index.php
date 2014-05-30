<!DOCTYPE html>

<html>
    <head>
        <title>i3wm</title>
        
        <meta charset="utf-8" />
        
        <!--Borrowed Code-->
        <script src="js/jquery-2.0.3.js"        type="text/javascript"></script>
        <script src="js/suppressBackspace.js"   type="text/javascript"></script>
        <script src="js/jquery.mousewheel.js"   type="text/javascript"></script>
        
        <!--Self-written Code-->
        <script src="js/videos.js"              type="text/javascript"></script>
        <script src="js/images.js"              type="text/javascript"></script>
        <script src="js/chat.js"                type="text/javascript"></script>
        <script src="js/contact.js"             type="text/javascript"></script>

        <script src="js/risingEdge.js"          type="text/javascript"></script>
        <script src="js/dmenu.js"               type="text/javascript"></script>
        <script src="js/editor.js"              type="text/javascript"></script>
        <script src="js/js2ascii.js"            type="text/javascript"></script>

        <script src="js/bash_fs.js"             type="text/javascript"></script>
        <script src="js/bash_lib.js"            type="text/javascript"></script>
        <script src="js/bash_commands_lib.js"   type="text/javascript"></script>
        <script src="js/bash_window.js"         type="text/javascript"></script>
        <script src="js/bash_window_test.js"    type="text/javascript"></script>
        <script src="js/bash_init_fs.js"        type="text/javascript"></script>
        <script src="js/bash_init_commands.js"  type="text/javascript"></script>

        <script src="js/settings_lib.js"        type="text/javascript"></script>
        <script src="js/settings_init.js"       type="text/javascript"></script>
        <script src="js/settings_window.js"     type="text/javascript"></script>
        <script src="js/settings_example.js"    type="text/javascript"></script>

        <script src="js/i3_lib.js"              type="text/javascript"></script>
        <script src="js/i3_structures.js"       type="text/javascript"></script>
        <script src="js/i3_init.js"             type="text/javascript"></script>

        <script src="js/main.js"                type="text/javascript"></script>

        <link href="http://fonts.googleapis.com/css?family=Droid+Sans+Mono" type="text/css" rel="stylesheet"/>
        <link href="css/main.css"                                           type="text/css" rel="stylesheet"/>
        <link href="css/bash.css"                                           type="text/css" rel="stylesheet"/>
        <link href="css/dmenu.css"                                          type="text/css" rel="stylesheet"/>
        <link href="css/settings.css"                                       type="text/css" rel="stylesheet"/>
        <link href="css/contact.css"                                        type="text/css" rel="stylesheet"/>
        <link href="css/images.css"                                         type="text/css" rel="stylesheet"/>
    </head>
    
    <body>
        <div class="bar">
            <span class="left"></span>
            <span class="right">
                <span class="time"></span>
            </span>
        </div>
        <div class="page"></div>
        <div id="github">
            <span class="github" style="text-align: center">
                <a href="http://www.github.com/asonix/i3html">Asonix @ GitHub</a>
            </span>
            <span class="github2">First Use</span>
            <span>&nbsp;</span>
            <form>
                <input class="instructions" type="button" value="Instructions" />
                <input class="dmenuBtn"     type="button" value="dmenu" />
            </form>
        </div>
    </body>
</html>
