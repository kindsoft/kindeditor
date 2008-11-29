<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>KindEditor 3.0</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="./common.css" rel="stylesheet" type="text/css" />
</head>
<body>
<?php
   echo(stripslashes($_POST['content']));
?>
<center>
<br />
<br />
<input type="button" value="后退" onclick="javascript:history.back();" />
</center>
</body>
</html>

