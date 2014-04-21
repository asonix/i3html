function RisingEdge() {
    this.current_in;
    this.previous_in;
    this.current_out;
    this.check = function(arg) {
        this.current_in = arg;
        if (this.current_in != this.previous_in) {
            this.previous_in = this.current_in;
            return(true);
        }
        else {
            this.previous_in = this.current_in;
            return(false);
        }
    }
}
