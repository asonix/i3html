function SettingsHolder() {
    this.q = [];
    this.q.push(new AppSettings("term","Applications",function(){
        return(BashSettings);
    }));
    this.q.push(new AppSettings("i3html","System",function(){
        return(WmSettings);
    }));
    this.q.push(new AppSettings("settings","Etcetera",function(){
        return(Preferences);
    }));

    this.select = function(name){
        for (var i = 0; i < this.q.length; i++) {
            if (name == this.q[i].name) {
                return(this.q[i]);
            }
        }
    }
    this.create = function(name){
        this.select(name).settings().settings();
    }
}
