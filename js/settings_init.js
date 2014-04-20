function SettingsHolder() {
    this.q = [];
    this.q.push(new AppSettings("weBASH","test1",function(){
        return(t1);
    }));
    this.q.push(new AppSettings("i3html","test2",function(){
        return(t2);
    }));
    this.q.push(new AppSettings("settings1","test3",function(){
        return(t3);
    }));
    this.q.push(new AppSettings("settings2","test3",function(){
        return(t4);
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
