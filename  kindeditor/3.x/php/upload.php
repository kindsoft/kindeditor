<?php

//文件保存目录路径
$save_path = '../attached/';
//文件保存目录URL
$save_url = './attached/';
//定义允许上传的文件扩展名
$ext_arr = array('gif','jpg','png','bmp');
//最大文件大小
$max_size = 1000000;
//更改目录权限
@mkdir($save_path, 0777);
//文件的全部路径
$file_path = $save_path.$_POST['fileName'];
//文件URL
$file_url = $save_url.$_POST['fileName'];

//有上传文件时
if (empty($_FILES) === false) {
	//原文件名
	$file_name = $_FILES['fileData']['name'];
	//服务器上临时文件名
	$tmp_name = $_FILES['fileData']['tmp_name'];
	//文件大小
	$file_size = $_FILES['fileData']['size'];
	//检查目录
	if (@is_dir($save_path) === false) {
		alert("上传目录不存在。");
	}
	//检查目录写权限
	if (@is_writable($save_path) === false) {
		alert("上传目录没有写权限。");
	}
	//检查是否已上传
	if (@is_uploaded_file($tmp_name) === false) {
		alert("临时文件可能不是上传文件。");
	}
	//检查文件大小
	if ($file_size > $max_size) {
		alert("上传文件大小超过限制。");
	}
	//获得文件扩展名
	$temp_arr = explode(".", $_POST['fileName']);
	$file_ext = array_pop($temp_arr);
	$file_ext = trim($file_ext);
	$file_ext = strtolower($file_ext);
	//检查扩展名
	if (in_array($file_ext, $ext_arr) === false) {
		alert("上传文件扩展名是不允许的扩展名。");
	}
	//移动文件
	if (move_uploaded_file($tmp_name, $file_path) === false) {
		alert("上传文件失败。");
	}
	//插入图片，关闭层
	echo '<html>';
	echo '<head>';
	echo '<title>Insert Image</title>';
	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	echo '</head>';
	echo '<body>';
	echo '<script type="text/javascript">parent.KindInsertImage("'.$file_url.'","'.$_POST['imgWidth'].'","'.$_POST['imgHeight'].'","'.$_POST['imgBorder'].'","'.$_POST['imgTitle'].'","'.$_POST['imgAlign'].'","'.$_POST['imgHspace'].'","'.$_POST['imgVspace'].'");</script>';
	echo '</body>';
	echo '</html>';
}

//提示，关闭层
function alert($msg)
{
	echo '<html>';
	echo '<head>';
	echo '<title>error</title>';
	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	echo '</head>';
	echo '<body>';
	echo '<script type="text/javascript">alert("'.$msg.'");parent.KindDisableMenu();parent.KindReloadIframe();</script>';
	echo '</body>';
	echo '</html>';
	exit;
}
?>