function SettingsHolder() {
    this.q = [];
    this.q.push(new AppSettings("weBASH","test1",function(){
        return(BashSettings);
    }));
    this.q.push(new AppSettings("i3html","test2",function(){
        return(WmSettings);
    }));
    this.q.push(new AppSettings("settings","test3",function(){
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
