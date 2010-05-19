<%@ CODEPAGE=65001 %>
<% Option Explicit %>
<% Response.CodePage=65001 %>
<% Response.Charset="UTF-8" %>
<!--#include file="JSON_2.0.4.asp"-->
<%

' KindEditor ASP
'
' 本ASP程序是演示程序，建议不要直接在实际项目中使用。
' 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
'

Dim rootPath, rootUrl, fileTypes
Dim currentPath, currentUrl, currentDirPath, moveupDirPath
Dim path, order, fso, folder, dir, file, result, fileList
Dim fileExt, fileCount

'根目录路径，可以指定绝对路径，比如 /var/www/attached/
rootPath = "../attached/"
'根目录URL，可以指定绝对路径，比如 http://www.yoursite.com/attached/
rootUrl = "../../attached/"
'图片扩展名
fileTypes = "gif,jpg,jpeg,png,bmp"

currentPath = ""
currentUrl = ""
currentDirPath = ""
moveupDirPath = ""

'根据path参数，设置各路径和URL
path = Request.QueryString("path")
If path = "" Then
	currentPath = Server.MapPath(rootPath) & "\"
	currentUrl = rootUrl
	currentDirPath = ""
	moveupDirPath = ""
Else
	currentPath = Server.MapPath(rootPath & path) & "\"
	currentUrl = rootUrl + path
	currentDirPath = path
	moveupDirPath = RegexReplace(currentDirPath, "(.*?)[^\/]+\/$", "$1")
End If

'排序形式，name or size or type
order = lcase(Request.QueryString("order"))

'不允许使用..移动到上一级目录
If RegexIsMatch(path, "\.\.") Then
	Response.Write "Access is not allowed."
	Response.End
End If
'最后一个字符不是/
If path <> "" And Not RegexIsMatch(path, "\/$") Then
	Response.Write "Parameter is not allowed."
	Response.End
End If
'目录不存在或不是目录
If Not DirectoryExists(currentPath) Then
	Response.Write "Directory does not exist."
	Response.End
End If

Set result = jsObject()
'相对于根目录的上一级目录
result("moveupDirPath") = moveupDirPath
'相对于根目录的当前目录
result("current_dir_path") = currentDirPath
'当前目录的URL
result("current_url") = currentUrl

Set fso = Server.CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder(currentPath)

Set result("file_list") = jsArray()
fileCount = 0
For Each dir in folder.SubFolders
	Set result("file_list")(Null) = jsObject()
	result("file_list")(Null)("is_dir") = True
	result("file_list")(Null)("has_file") = (dir.Files.count > 0)
	result("file_list")(Null)("filesize") = 0
	result("file_list")(Null)("is_photo") = False
	result("file_list")(Null)("filetype") = ""
	result("file_list")(Null)("filename") = dir.name
	result("file_list")(Null)("datetime") = dir.DateLastModified
	fileCount = fileCount + 1
Next
For Each file in folder.Files
	fileExt = mid(file.name, InStrRev(file.name, ".") + 1)
	Set result("file_list")(Null) = jsObject()
	result("file_list")(Null)("is_dir") = False
	result("file_list")(Null)("has_file") = False
	result("file_list")(Null)("filesize") = file.size
	result("file_list")(Null)("is_photo") = (instr(lcase(fileTypes), fileExt) > 0)
	result("file_list")(Null)("filetype") = fileExt
	result("file_list")(Null)("filename") = file.name
	result("file_list")(Null)("datetime") = file.DateLastModified
	fileCount = fileCount + 1
Next

'文件数
result("total_count") = fileCount

'输出JSON字符串
Response.AddHeader "Content-Type", "text/html; charset=UTF-8"
'Response.AddHeader "Content-Type", "application/json; charset=UTF-8"
result.Flush
Response.End

'自定义函数
Function DirectoryExists(dirPath)
	Dim fso
	Set fso = Server.CreateObject("Scripting.FileSystemObject")
	DirectoryExists = fso.FolderExists(dirPath)
End Function

Function RegexIsMatch(subject, pattern)
	Dim reg
	Set reg = New RegExp
	reg.Global = True
	reg.MultiLine = True
	reg.Pattern = pattern
	RegexIsMatch = reg.Test(subject)
End Function

Function RegexReplace(subject, pattern, replacement)
	Dim reg
	Set reg = New RegExp
	reg.Global = True
	reg.MultiLine = True
	reg.Pattern = pattern
	RegexReplace = reg.Replace(subject, replacement)
End Function
%>
