<?php
    $dir = "../img";
    $dh = scandir($dir);
    print json_encode(array('images'=>$dh));
?>

