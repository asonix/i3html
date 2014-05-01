function conversion(key,shift) {
    if (Number(key) > 64 && Number(key) < 91) {
        if (shift) {
            return(key);
        }
        else {
            return(key+32);
        }
    }
    else if (key == "9" || key == "32") {
        return(Number(key));
    }
    else if (key == "49") {
        if (shift) {
            return(33);
        }
        else {
            return(49);
        }
    }
    else if (key == "222") {
        if (shift) {
            return(34);
        }
        else {
            return(39);
        }
    }
    else if (key == "50") {
        if (shift) {
            return(64);
        }
        else {
            return(50);
        }
    }
    else if (key == "51") {
        if (shift) {
            return(35);
        }
        else {
            return(51);
        }
    }
    else if (key == "52") {
        if (shift) {
            return(36);
        }
        else {
            return(52);
        }
    }
    else if (key == "53") {
        if (shift) {
            return(37);
        }
        else {
            return(53);
        }
    }
    else if (key == "54") {
        if (shift) {
            return(94);
        }
        else {
            return(54);
        }
    }
    else if (key == "55") {
        if (shift) {
            return(38);
        }
        else {
            return(55);
        }
    }
    else if (key == "57") {
        if (shift) {
            return(40);
        }
        else {
            return(57);
        }
    }
    else if (key == "48") {
        if (shift) {
            return(41);
        }
        else {
            return(48);
        }
    }
    else if (key == "56") {
        if (shift) {
            return(42);
        }
        else {
            return(56);
        }
    }
    else if (key == "187") {
        if (shift) {
            return(43);
        }
        else {
            return(61);
        }
    }
    else if (key == "188") {
        if (shift) {
            return(60);
        }
        else {
            return(44);
        }
    }
    else if (key == "189") {
        if (shift) {
            return(95);
        }
        else {
            return(45);
        }
    }
    else if (key == "190") {
        if (shift) {
            return(62);
        }
        else {
            return(46);
        }
    }
    else if (key == "191") {
        if (shift) {
            return(63);
        }
        else {
            return(47);
        }
    }
    else if (key == "186") {
        if (shift) {
            return(58);
        }
        else {
            return(59);
        }
    }
    else if (key == "219") {
        if (shift) {
            return(123);
        }
        else {
            return(91);
        }
    }
    else if (key == "220") {
        if (shift) {
            return(124);
        }
        else {
            return(92);
        }
    }
    else if (key == "221") {
        if (shift) {
            return(125);
        }
        else {
            return(93);
        }
    }
    else if (key == "192") {
        if (shift) {
            return(126);
        }
        else {
            return(96);
        }
    }
    
    else {
        return(0);
    }
}
function js2ascii(key,shift) {
    return(String(conversion(key,shift)));
}
function js2char(key,shift) {
    return(String.fromCharCode(js2ascii(key,shift)));
}
