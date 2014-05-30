<?php
    $viddir = "../vid/content";
    $viddh = scandir($viddir);
    print json_encode(array('videos'=>$viddh));
?>

