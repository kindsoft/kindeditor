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

Dim aspUrl, rootPath, rootUrl, fileTypes
Dim currentPath, currentUrl, currentDirPath, moveupDirPath
Dim path, order, fso, folder, dir, file, result
Dim fileExt, fileCount, orderIndex
Dim i, j, fileList(), isDir, hasFile, filesize, isPhoto, filetype, filename, datetime

aspUrl = Request.ServerVariables("SCRIPT_NAME")
aspUrl = left(aspUrl, InStrRev(aspUrl, "/"))

'根目录路径，可以指定绝对路径，比如 /var/www/attached/
rootPath = "../attached/"
'根目录URL，可以指定绝对路径，比如 http://www.yoursite.com/attached/
rootUrl = aspUrl & "../attached/"
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
Select Case order
	Case "type" orderIndex = 4
	Case "size" orderIndex = 2
	Case Else  orderIndex = 5
End Select

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
result("moveup_dir_path") = moveupDirPath
'相对于根目录的当前目录
result("current_dir_path") = currentDirPath
'当前目录的URL
result("current_url") = currentUrl

Set fso = Server.CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder(currentPath)

'文件数
fileCount = folder.SubFolders.count + folder.Files.count
result("total_count") = fileCount

ReDim fileList(fileCount)
i = 0
For Each dir in folder.SubFolders
	isDir = True
	hasFile = (dir.Files.count > 0)
	filesize = 0
	isPhoto = False
	filetype = ""
	filename = dir.name
	datetime = dir.DateLastModified
	fileList(i) = Array(isDir, hasFile, filesize, isPhoto, filetype, filename, datetime)
	i = i + 1
Next
For Each file in folder.Files
	fileExt = mid(file.name, InStrRev(file.name, ".") + 1)
	isDir = False
	hasFile = False
	filesize = file.size
	isPhoto = (instr(lcase(fileTypes), fileExt) > 0)
	filetype = fileExt
	filename = file.name
	datetime = file.DateLastModified
	fileList(i) = Array(isDir, hasFile, filesize, isPhoto, filetype, filename, datetime)
	i = i + 1
Next

'排序
Dim minidx, temp
For i = 0 To fileCount - 2
	minidx = i
	For j = i + 1 To fileCount - 1
		If (fileList(minidx)(orderIndex) > fileList(j)(orderIndex)) Then
			minidx = j
		End If
	Next
	If minidx <> i Then
		temp = fileList(minidx)
		fileList(minidx) = fileList(i)
		fileList(i) = temp
	End If
Next

Set result("file_list") = jsArray()
For i = 0 To fileCount - 1
	Set result("file_list")(Null) = jsObject()
	result("file_list")(Null)("is_dir") = fileList(i)(0)
	result("file_list")(Null)("has_file") = fileList(i)(1)
	result("file_list")(Null)("filesize") = fileList(i)(2)
	result("file_list")(Null)("is_photo") = fileList(i)(3)
	result("file_list")(Null)("filetype") = fileList(i)(4)
	result("file_list")(Null)("filename") = fileList(i)(5)
	result("file_list")(Null)("datetime") = fileList(i)(6)
Next

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
