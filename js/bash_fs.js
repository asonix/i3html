function FileSystem() {
    this.contents = [];
    this.currentdir = this;
    this.currentdirectory = this.currentdir;
    this.container = this;
    this.type = "filesystem";
    this.name = "mockfs";
    this.userdir;
}

function Dir(name,container) {
    this.type = "folder";
    this.contents = [];
    this.container = container;
    this.container.contents.push(this);
    this.name = name;
    
    var currentdir = this;
    this.buildpath = function() {
        if (currentdir.container.type == "folder") {
            return(currentdir.container.buildpath() + "/" + currentdir.name);
        }
        else {
            return("/" + currentdir.name);
        }
    }
}

function File(name,container) {
    this.type = "file";
    this.name = name;
    this.contents = [[]];
    this.container = container;
    this.container.contents.push(this);
    this.buildpath = function() {
        if (currentdir.container.type == "folder") {
            return(currentdir.container.buildpath() + "/" + currentdir.name);
        }
        else {
            return("/" + currentdir.name);
        }
    }
}

function Command(name,command) {
    this.name = name;
    this.type = "command";
    var path = preparePath("/usr/bin");
    this.container = search(path,"","folder");
    this.container.contents.push(this);
    
    var currentdir = this;
    this.buildpath = function() {
        if (currentdir.container.type == "folder") {
            return(currentdir.container.buildpath() + "/" + currentdir.name);
        }
        else {
            return("/" + currentdir.name);
        }
    }
    this.command = command;
}
