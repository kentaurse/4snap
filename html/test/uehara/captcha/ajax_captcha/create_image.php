<?php

// ?祉???激?с?潟?鴻?帥?若??
session_start();

// ?糸??ゃ?＜?若?悟???? 
// ???潟????????絖?????????
$md5_hash = md5(rand(0,999)); 
// ??絖?????鐚?罅??????? 
$code = substr($md5_hash, 15, 5); 
// ?祉???激?с?潟?????????????潟?若????篆?絖?
$_SESSION["code"] = $code;

$image = ImageCreate(120, 20);  

// ?蚊???臂 
$white = ImageColorAllocate($image, 255, 255, 255); 
$grey = ImageColorAllocate($image, 204, 204, 204); 

// ?????
ImageFill($image, 0, 0, $grey); 

// ?????????潟?若????茵?ず
ImageString($image, 5, 30, 3, $code, $white); 

// jpag?у?阪?? 
header("Content-Type: image/jpeg"); 
ImageJpeg($image); 
ImageDestroy($image); 

exit; 
?>