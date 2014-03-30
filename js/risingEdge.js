function RisingEdge(arg) {
    this.current_in;
    this.previous_in;
    this.current_out;
    if (arg) {
        this.previous_in = this.current_in;
        this.current_in = true;
    }
    else {
        this.previous_in = this.current_in;
        this.current_in = false;
    }
    if (this.current_in == true && this.previous_in == false) {
        return(true);
    }
    else {
        return(false);
    }
}