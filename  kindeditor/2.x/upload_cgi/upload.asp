<%
'需要安装ABC组件
'下载地址：http://www.websupergoo.com/abcupload-1.htm

'文件保存目录路径
Dim SavePath
SavePath = "../attached/"

'文件保存目录URL
Dim SaveUrl
SaveUrl = "./attached/"

'定义允许上传的文件扩展名
Dim ExtArr(3)
ExtArr(0) = "gif"
ExtArr(1) = "jpg"
ExtArr(2) = "png"
ExtArr(3) = "bmp"

'最大文件大小
Dim MaxSize
MaxSize = 1000000

Dim Msg1, Msg2, Msg3
Msg1 = "上传文件大小超过限制。"
Msg2 = "上传文件扩展名是不允许的扩展名。"
Msg3 = "上传文件失败。"

'用ABC组件
Dim theForm
Set theForm = Server.CreateObject("ABCUpload4.XForm")

'得到POST参数
Dim FileName, FileWidth, FileHeight, FileBorder, FileTitle, FileAlign, FileHspace, FileVspace
FileName = theForm("fileName")
FileWidth = theForm("imgWidth")
FileHeight = theForm("imgHeight")
FileBorder = theForm("imgBorder")
FileTitle = theForm("imgTitle")
FileAlign = theForm("imgAlign")
FileHspace = theForm("imgHspace")
FileVspace = theForm("imgVspace")

Dim FilePath, FileUrl
FilePath = SavePath & FileName
FileUrl = SaveUrl & FileName

'上传到相对地址
theForm.AbsolutePath = False

'得到上传二进制文件
Dim theField
Set theField = theForm("fileData")(1)

'上传处理
Dim oFileSize, oFileType
If theField.FileExists Then
    oFileSize = theField.Length
    oFileType = theField.FileType
	if oFileSize > MaxSize Then
		Alert(Msg1)
	ElseIf oFileType <> ExtArr(0) AND oFileType <> ExtArr(1) AND oFileType <> ExtArr(2) AND oFileType <> ExtArr(3)  Then
		Alert(Msg2)
    else
		theField.Save FilePath
	End If
	Response.Write "<html>"
	Response.Write "<head>"
	Response.Write "<title>error</title>"
	Response.Write "<meta http-equiv=""content-type"" content=""text/html; charset=utf-8"">"
	Response.Write "</head>"
	Response.Write "<body>"
	Response.Write "<script type=""text/javascript"">parent.KindInsertImage(""" & FileUrl & """,""" & FileWidth & """,""" & FileHeight & """,""" & FileBorder & """,""" & FileTitle & """,""" & FileAlign & """,""" & FileHspace & """,""" & FileVspace & """);</script>"
	Response.Write "</body>"
	Response.Write "</html>"
Else
	Alert(Msg3)
End if

'提示，关闭层
Function Alert(msg)
	Response.Write "<html>"
	Response.Write "<head>"
	Response.Write "<title>error</title>"
	Response.Write "<meta http-equiv=""content-type"" content=""text/html; charset=utf-8"">"
	Response.Write "</head>"
	Response.Write "<body>"
	Response.Write "<script type=""text/javascript"">alert(""" & msg & """);parent.KindDisableMenu();parent.KindReloadIframe();</script>"
	Response.Write "</body>"
	Response.Write "</html>"
End Function

%>