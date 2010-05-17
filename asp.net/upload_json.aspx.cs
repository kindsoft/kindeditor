/**
本ASP.NET程序属于一个服务器端程序的例子，不正确的使用可能威胁服务器的安全，使用之前请仔细确认相关安全设置。
*/

using System;
using System.Collections;
using System.Web;
using System.IO;
using System.Globalization;

namespace KindEditor.NET
{
    public partial class Upload : System.Web.UI.Page
    {
        //文件保存目录路径
        private String savePath = "../attached/";
        //文件保存目录URL
        private String saveUrl = "../attached/";
        //定义允许上传的文件扩展名
        private String fileTypes = "gif,jpg,jpeg,png,bmp";
        //最大文件大小
        private int maxSize = 1000000;
        
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpPostedFile imgFile = Request.Files["imgFile"];
            if (imgFile == null)
            {
                showError("请选择文件。");
            }

            String dirPath = Server.MapPath(savePath);
            if (!Directory.Exists(dirPath))
            {
                showError("上传目录不存在。");
            }

            String fileName = imgFile.FileName;
            String fileExt = Path.GetExtension(fileName).ToLower();
            ArrayList fileTypeList = ArrayList.Adapter(fileTypes.Split(','));

            if (imgFile.InputStream == null || imgFile.InputStream.Length > maxSize)
            {
                showError("上传文件大小超过限制。");
            }

            if (String.IsNullOrEmpty(fileExt) || Array.IndexOf(fileTypes.Split(','), fileExt.Substring(1).ToLower()) == -1)
            {
                showError("上传文件扩展名是不允许的扩展名。");
            }

            String newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_ffff", DateTimeFormatInfo.InvariantInfo) + fileExt;
            String filePath = dirPath + newFileName;

            imgFile.SaveAs(filePath);

            String fileUrl = saveUrl + newFileName;

            Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
            Response.Write("{\"error\":0,\"url\":\"" + fileUrl + "\"}");
            Response.End();
        }

        private void showError(string message)
        {
            Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
            Response.Write("{\"error\":1,\"message\":\"" + message + "\"}");
            Response.End();
        }
    }
}
