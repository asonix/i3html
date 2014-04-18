new Command("cd", function(args,cur_win_dir,cur_win) {
    if (args.length != 0) {
        changeDirectory(args,cur_win_dir,cur_win);
    }
    else {
        changeDirectory("~",cur_win_dir,cur_win);
    }
});
new Command("cd..", function(args,cur_win_dir,cur_win) {
    changeDirectory("..",cur_win_dir,cur_win);
});
new Command("mkdir", function(args,cur_win_dir,cur_win) {
    makeDirectory([args],"folder",cur_win_dir,cur_win);
});
new Command("ls", function(args,cur_win_dir,cur_win) {
    cur_win.append.append(list(args,cur_win_dir,cur_win));
});
new Command("clear", function(args,cur_win_dir,cur_win) {
    cur_win.append.html("");
});
new Command("rmdir", function(args,cur_win_dir,cur_win) {
    removeDir(args,cur_win_dir,cur_win);
});
new Command("rm", function(args,cur_win_dir,cur_win) {
    remove(args,"",cur_win_dir,cur_win);
});
new Command("touch", function(args,cur_win_dir,cur_win) {
    makeDirectory([args],"file",cur_win_dir,cur_win)
});
new Command("mv", function(args,cur_win_dir,cur_win) {
    move(args,cur_win_dir,cur_win);
});
new Command("cp", function(args,cur_win_dir,cur_win) {
    copy(args,cur_win_dir,cur_win);
});
new Command("help", function(args,cur_win_dir,cur_win) {
    help(cur_win);
});

