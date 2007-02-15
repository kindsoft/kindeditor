<html>
<head>
<title>KindEditor Demo</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="./common.css" rel="stylesheet" type="text/css">
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

