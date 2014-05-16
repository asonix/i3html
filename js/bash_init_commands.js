new Command("cd", function(args,cur_win_dir,cur_win) {
    if (args.length != 0) {
        return(changeDirectory(args,cur_win_dir,cur_win));
    }
    else {
        return(changeDirectory("~",cur_win_dir,cur_win));
    }
});
new Command("cd..", function(args,cur_win_dir,cur_win) {
    return(changeDirectory("..",cur_win_dir,cur_win));
});
new Command("mkdir", function(args,cur_win_dir,cur_win) {
    return(makeDirectory([args],"folder",cur_win_dir,cur_win));
});
new Command("ls", function(args,cur_win_dir,cur_win) {
    return(cur_win.append.append(list(args,cur_win_dir,cur_win)));
});
new Command("clear", function(args,cur_win_dir,cur_win) {
    return(cur_win.append.html(""));
});
new Command("rmdir", function(args,cur_win_dir,cur_win) {
    return(removeDir(args,cur_win_dir,cur_win));
});
new Command("rm", function(args,cur_win_dir,cur_win) {
    return(remove(args,"",cur_win_dir,cur_win));
});
new Command("touch", function(args,cur_win_dir,cur_win) {
    return(makeDirectory([args],"file",cur_win_dir,cur_win));
});
new Command("mv", function(args,cur_win_dir,cur_win) {
    return(move(args,cur_win_dir,cur_win));
});
new Command("cp", function(args,cur_win_dir,cur_win) {
    return(copy(args,cur_win_dir,cur_win));
});
new Command("help", function(args,cur_win_dir,cur_win) {
    return(help(cur_win));
});
new Command("settings", function(args,cur_win_dir,cur_win) {
    site.focusws.windows.push(new Window(function(){
        return(new Settings());
    }));
    return(resizeAll(site.focusws));
});
new Command("term", function(args,cur_win_dir,cur_win) {
    site.focusws.windows.push(new Window(function(){
        var command = args.join(" ");
        return(new BashWindow(command));
    }));
    return(resizeAll(site.focusws));
});
new Command("cat", function(args,cur_win_dir,cur_win) {
    return(cat(args,cur_win_dir,cur_win));
});
new Command("edit", function(args,cur_win_dir,cur_win) {
    var edit = new Editor(args,cur_win_dir,cur_win);
    return(0);
});
new Command("exit", function(args,cur_win_dir,cur_win) {
    cur_win.conwin.kill();
    return(0);
});
new Command("dmenu_run", function(args,cur_win_dir,cur_win) {
    var i = 0
    var t = setInterval(function() {
        if (i > 1) {
            dmenu();
            clearInterval(t);
        }
        i++;
    },25);
    return(0);
});
new Command("contact", function(args,cur_win_dir,cur_win) {
    site.focusws.windows.push(new Window(function(){
        return(new Contact());
    }));
    return(resizeAll(site.focusws));
});
new Command("images", function(args,cur_win_dir,cur_win) {
    site.focusws.windows.push(new Window(function(){
        return(new ImageBrowser());
    }));
    return(resizeAll(site.focusws));
});
new Command("chat", function(args,cur_win_dir,cur_win) {
    site.focusws.windows.push(new Window(function(){
        return(new Chat());
    }));
    return(resizeAll(site.focusws));
});

