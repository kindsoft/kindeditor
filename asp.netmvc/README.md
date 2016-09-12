#KindEditor ASP.NET MVC Demo
> Intro

本ASP.NET MVC程序是演示程序，建议不要直接在实际项目中使用。
如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。

如果您在使用遇到什么问题，可以随时联系我，我的邮箱: <ben121011@126.com>
 
> 使用方法:

1. 解压zip文件，将所有文件复制到IIS的 wwwroot/kindeditor 目录下。

2. 将 HomeController.cs 文件包含在项目中，并修改 HomeController 的命名空间为自己网站项目的命名空间，不修改的话有可能会导致 HTTP 404。

3. 将 Index.cshtml 文件包含在项目中，并创建 Home 文件夹（如果需要），之后修改 Index.cshtml 文件的路径放在对应的 Home 文件夹下。

3. 打开浏览器，输入 *http://localhost:[P0RT]/Home/Index* ，不一定是这样，地址和你的网站的端口和 HomeController 的位置有关。
