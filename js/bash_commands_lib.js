function changeDirectory(args,cur_win_dir,cur_win) {
    var dir = handleErrors(search(preparePath(args[0]),"","folder",cur_win_dir,cur_win),cur_win);
    if (dir != false) {
        cur_win.currentdirectory = dir;
    }
    return(cur_win.currentdirectory);
}

function list(args,cur_win_dir,cur_win) {
    var lsarray = [];
    for (var i = 0; i < cur_win_dir.contents.length; i++) {
        lsarray.push(cur_win_dir.contents[i].name);
    }
    return(handleErrors(lsarray.sort().join(" "),cur_win));
}

function makeDirectory(args,type,cur_win_dir,cur_win) {
    var path = args[0];
    for (var i = 0; i < path[0].length; i++) {
        if (path[0][i] == "/") {
            path = path[0].split("/");
        }
    }
    var newpath = [];
    var dir;
    var s = search(path,"",type,cur_win_dir,cur_win);
    s = s.type;
    if (typeof(s) == "undefined") {
        if (path.length > 1) {
            for (var i = 0; i < path.length-1; i++) {
                newpath.push(path[i]);
            }
            dir = search(newpath,"","folder",cur_win_dir,cur_win);
        }
        else {
            dir = cur_win_dir;
        }
        if (type == "folder") {
            new Dir(path[path.length-1],dir);
        }
        else {
            new File(path[path.length-1],dir);
        }
        return(0)
    }
    else {
        return(handleErrors("ERROR: "+path[path.length-1]+" already exists",cur_win));
    }
}

function removeDir(args,cur_win_dir,cur_win) {
    var dir = search(preparePath(args[0]),"","folder",cur_win_dir,cur_win);
    if (typeof(dir) == "string") {
        dir = handleErrors(search(preparePath(args[0]),"","folder",cur_win_dir,cur_win),cur_win);
    }
    if (dir != false && dir.type != "folder") {
        handleErrors("ERROR: " + dir + " is not a directory.",cur_win);
    }
    else if (dir != false && dir.type == "folder") {
        remove(args,"folder",cur_win_dir,cur_win);
    }
    else {
        handleErrors(dir,cur_win);
    }
    return(0);
}

function remove(args,type,cur_win_dir,cur_win) {
    if (typeof(type) == "undefined" || type == "") {
        type = "file";
    }
    var recursive = false;
    var dir;
    for (var i = 0; i < args.length; i++) {
        if (args[i] == "-r") {
            recursive = true;
        }
        else {
            dir = search(preparePath(args[i]),"",type,cur_win_dir,cur_win);
            if (typeof(dir) == "string") {
                dir = handleErrors(search(preparePath(args[i]),"","folder",cur_win_dir,cur_win),cur_win);
            }
        }
    }
    if (dir != false) {
        if (dir.type == "folder") {
            if (dir.contents.length == 0) {
                for (var i = 0; i < dir.container.contents.length; i++) {
                    if (dir == dir.container.contents[i]) {
                        dir.container.contents.splice(i,1);
                    }
                }
            }
            else if (recursive == true) {
                for (var i = 0; i < dir.contents.length; i++) {
                    remove([dir.contents[i].buildpath(),"-r"],"file",cur_win_dir,cur_win);
                    remove([dir.contents[i].buildpath(),"-r"],"folder",cur_win_dir,cur_win);
                }
                for (var i = 0; i < dir.container.contents.length; i++) {
                    if (dir == dir.container.contents[i]) {
                        dir.container.contents.splice(i,1);
                    }
                }
            }
            else {
                handleErrors("ERROR: Directory not empty.",cur_win);
            }
        }
        else {
            for (var i = 0; i < dir.container.contents.length; i++) {
                if (dir == dir.container.contents[i]) {
                     dir.container.contents.splice(i,1);
                }
            }
        }
    }
    else {
        handleErrors(dir,cur_win);
    }
    return(0);
}

function move(args,cur_win_dir,cur_win) {
    var path1;
    var path2;
    var recursive = false;
    for (var i = 0; i < args.length; i++) {
        if(typeof(path1) != "undefined") {
            path2 = args[i];
        }
        else {
            path1 = args[i];
        }
    }
    var p1 = search(preparePath(path1),"","file",cur_win_dir,cur_win);
    if (typeof(p1) == "string") {
        p1 = handleErrors(search(preparePath(path1),"","folder",cur_win_dir,cur_win),cur_win);
    }
    var path2test = [];
    if (p1 != false) {
        for (var i = 0; i < preparePath(path2).length-1; i++) {
            if (typeof(preparePath(path2)[i]) != "undefined") {
                path2test.push(preparePath(path2)[i]);
            }
        }
        if (path2test.length != 0) {
            var p2test = handleErrors(search(path2test,"","folder",cur_win_dir,cur_win),cur_win);
            if (p2test != false) {
                var p2 = handleErrors(search(preparePath(path2),"","folder",cur_win_dir,cur_win),cur_win);
                if (p2 != false) {
                    for (var i = 0; i < p1.container.contents.length; i++) {
                        if (p1.container.contents[i] == p1) {
                            p1.container.contents.splice(i,1);
                        }
                    }
                    p2.contents.push(p1);
                    p1.container = p2;
                }
                else {
                    handleErrors("ERROR: Directory already exists",cur_win);
                }
            }
        }
        else {
            var p2 = handleErrors(search(preparePath(path2),"","folder",cur_win_dir,cur_win),cur_win);
            if (p2 != false) {
                for (var i = 0; i < p1.container.contents.length; i++) {
                    if (p1.container.contents[i] == p1) {
                        p1.container.contents.splice(i,1);
                    }
                }
                p2.contents.push(p1);
                p1.container = p2;
            }
        }
    }
    return(0);
}

function copy(args,cur_win_dir,cur_win) {
    var path1;
    var path2;
    var recursive = false;
    for (var i = 0; i < args.length; i++) {
        if (args[i] == "-r") {
            recursive = true;
        }
        else if (typeof(path1) != "undefined") {
            path2 = args[i];
        }
        else {
            path1 = args[i];
        }
    }
    var path2test = [];
    for (var i = 0; i < preparePath(path2).length-1; i++) {
            path2test.push(path2[i]);
    }
    var p1 = search(preparePath(path1),"","file",cur_win_dir,cur_win);
    if (typeof(p1) == "string") {
        p1 = handleErrors(search(preparePath(path1),"","folder",cur_win_dir,cur_win),cur_win);
    }
    if (p1 != false) {
        var p2 = search(preparePath(path2),"","folder",cur_win_dir,cur_win);
        if (typeof(p2) == "string") {
            handleErrors(search(preparePath(path2),"","file",cur_win_dir,cur_win),cur_win);
        }
        if (p2 == false) {
            var p2test = search(path2test,"","folder",cur_win_dir,cur_win);
            if (typeof(p2test) == "string") {
                p2test = handleErrors(search(path2test,"","file",cur_win_dir,cur_win),cur_win);
            }
            if (p2test != false) {
                makeDirectory([preparePath(path2)],p1.type,cur_win_dir,cur_win);
            }
        }
        else {
            var newFolder = preparePath(path2);
            var p1path = preparePath(path1);
            newFolder.push(p1path[p1path.length-1]);
            makeDirectory([newFolder],p1.type,cur_win_dir,cur_win);
        }
        if (recursive != false) {
            var path2arr = preparePath(path2);
            for (var i = 0; i < p1.contents.length; i++) {
                var path1content = preparePath(p1.contents[i].buildpath());
                path2arr.push(path1content[path1content.length-1]);
                return(copy([path1content,path2arr,"-r"],cur_win_dir,cur_win));
            }
        }
    }
    return(0);
}
function help(cur_win) {
    handleErrors("This is the help dialogue.",cur_win);
    handleErrors("",cur_win);
    handleErrors("i3html is currently in heavy development. Luckily, it is a website and not a downloadable program, so don't worry about it crashing your computer or anything.",cur_win);
    handleErrors("",cur_win);
    handleErrors("A list of possible commands follows:",cur_win);
    handleErrors("",cur_win);
    handleErrors(" - Keyboard Shortcuts",cur_win);
    handleErrors("",cur_win);
    handleErrors("Alt+Enter: Opens a terminal window",cur_win);
    handleErrors("Alt+V: The next window will be opened beneath the focused window",cur_win);
    handleErrors("Alt+H: The next window will be opened to the right of the focused window",cur_win);
    handleErrors("Alt+F: Make the current window fullscreen",cur_win);
    handleErrors("Alt+Q: Close the focused window",cur_win);
    handleErrors("Alt+D: Open dmenu",cur_win);
    handleErrors("Alt+1 through Alt+0:  Switch to a new workspace",cur_win);
    handleErrors("",cur_win);
    handleErrors(" - Bash Commands",cur_win);
    handleErrors("",cur_win);
    handleErrors("cat [path]: display contents of file at path",cur_win);
    handleErrors("cd, cd ~, cd /, cd .., cd [path]: Change directory",cur_win);
    handleErrors("clear: clears the terminal",cur_win);
    handleErrors("contact: contact the site designer",cur_win);
    handleErrors("cp [path1] [path2], cp -r [path1] [path2]: Copy path1 to path2",cur_win);
    handleErrors("dmenu_run: open dmenu",cur_win);
    handleErrors("edit [path]: INCOMPLETE edit file at path",cur_win);
    handleErrors("exit: close the current terminal window",cur_win);
    handleErrors("help: display this help dialogue",cur_win);
    handleErrors("images: open the image browser",cur_win);
    handleErrors("ls: list files and folders in the current directory",cur_win);
    handleErrors("mkdir [path]: Make a new directory",cur_win);
    handleErrors("mv [path1] [path2]: Move path1 to path2",cur_win);
    handleErrors("rm [path]: deletes a file or folder",cur_win);
    handleErrors("rmdir [path]: deletes a folder",cur_win);
    handleErrors("settings: open the settings dialogue",cur_win);
    handleErrors("term: open the terminal",cur_win);
    handleErrors("termtest: INCOMPLETE open a more realistic terminal",cur_win);
    handleErrors("touch [path]: create a file at [path]",cur_win);
    handleErrors("videos: open the video player",cur_win);
    handleErrors("",cur_win);
    return(0);
}
function cat(args,cur_win_dir,cur_win) {
    var file = handleErrors(search(preparePath(args[0]),"","file",cur_win_dir,cur_win),cur_win);
    var contents = file.contents;
    if (typeof(contents) != "undefined") {
        handleErrors(contents,cur_win);
    }
    return(0);
}
