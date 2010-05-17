/**
本ASP.NET程序属于一个服务器端程序的例子，不正确的使用可能威胁服务器的安全，使用之前请仔细确认相关安全设置。
*/

using System;
using System.Web;
using System.Collections;
using System.IO;
using System.Text.RegularExpressions;
using System.Text;

namespace KindEditor.NET
{

    public partial class FileManager : System.Web.UI.Page
    {
        //根目录路径，可以指定绝对路径，比如 /var/www/attached/
        private String rootPath = "/attached/";
        //根目录URL，可以指定绝对路径，比如 http://www.yoursite.com/attached/
        private String rootUrl = "../../attached/";
        //图片扩展名
        private String fileTypes = "gif,jpg,jpeg,png,bmp";

        protected void Page_Load(object sender, EventArgs e)
        {
            String currentPath = "";
            String currentUrl = "";
            String currentDirPath = "";
            String moveupDirPath = "";

            //根据path参数，设置各路径和URL
            String path = Request.QueryString["path"];
            if (path == "")
            {
                currentPath = Server.MapPath(rootPath);
                currentUrl = rootUrl;
                currentDirPath = "";
                moveupDirPath = "";
            }
            else
            {
                currentPath = Server.MapPath(rootPath) + path;
                currentUrl = rootUrl + path;
                currentDirPath = path;
                moveupDirPath = Regex.Replace(currentDirPath, @"(.*?)[^\/]+\/$", "$1");
            }

            //排序形式，name or size or type
            String order = Request.QueryString["order"].ToLower();

            //不允许使用..移动到上一级目录
            if (Regex.IsMatch(currentPath, @"\.\."))
            {
                Response.Write("Access is not allowed.");
                Response.End();
            }
            //最后一个字符不是/
            if (currentPath.EndsWith("/"))
            {
                Response.Write("Parameter is not valid.");
                Response.End();
            }
            //目录不存在或不是目录
            if (!Directory.Exists(currentPath))
            {
                Response.Write("Directory does not exist.");
                Response.End();
            }

            //遍历目录取得文件信息
            string[] dirList = Directory.GetDirectories(currentPath);
            string[] fileList = Directory.GetFiles(currentPath);
            switch (order)
            {
                case "name":
                    Array.Sort(dirList, new NameSorter());
                    Array.Sort(fileList, new NameSorter());
                    break;
                case "size":
                    Array.Sort(dirList, new NameSorter());
                    Array.Sort(fileList, new SizeSorter());
                    break;
                case "type":
                    Array.Sort(dirList, new NameSorter());
                    Array.Sort(fileList, new TypeSorter());
                    break;
                case "date":
                default:
                    Array.Sort(dirList, new DateSorter());
                    Array.Sort(fileList, new DateSorter());
                    break;
            }

            //组合JSON字符串
            StringBuilder json = new StringBuilder();
            json.Append("{");
            json.Append("\"moveup_dir_path\":\"" + moveupDirPath + "\",");
            json.Append("\"current_dir_path\":\"" + currentDirPath + "\",");
            json.Append("\"current_url\":\"" + currentUrl + "\",");
            json.Append("\"total_count\":" + (dirList.Length + fileList.Length) + ",");
            json.Append("\"file_list\":");
            json.Append("[");
            StringBuilder strList = new StringBuilder();
            for (int i = 0; i < dirList.Length; i++)
            {
                DirectoryInfo dir = new DirectoryInfo(dirList[i]);
                strList.Append(",");
                strList.Append("{");
                strList.Append("\"is_dir\":true,");//是否文件夹
                strList.Append("\"has_file\":" + (dir.GetFileSystemInfos().Length > 0 ? "true" : "false") + ",");//文件夹是否包含文件
                strList.Append("\"filesize\":0,");//文件大小
                strList.Append("\"is_photo\":false,");// 是否图片
                strList.Append("\"filetype\":\"\",");// 文件类别，用扩展名判断
                strList.Append("\"filename\":\"" + dir.FullName.Substring(dir.FullName.LastIndexOf("\\") + 1) + "\",");//文件名，包含扩展名
                strList.Append("\"datetime\":\"" + dir.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss") + "\"");//文件最后修改时间
                strList.Append("}");
            }
            for (int i = 0; i < fileList.Length; i++)
            {
                FileInfo file = new FileInfo(fileList[i]);
                if (Array.IndexOf(fileTypes.Split(','), file.Extension.Substring(1).ToLower()) == -1) continue;
                strList.Append(",");
                strList.Append("{");
                strList.Append("\"is_dir\":false,");// 是否文件夹
                strList.Append("\"has_file\":false,");// 文件夹是否包含文件
                strList.Append("\"filesize\":" + file.Length + ",");//文件大小
                strList.Append("\"dir_path\":\"\",");
                strList.Append("\"is_photo\":true,");// 是否图片
                strList.Append("\"filetype\":\"" + file.Extension.Substring(1) + "\",");//文件类别，用扩展名判断
                strList.Append("\"filename\":\"" + file.Name + "\",");//文件名，包含扩展名
                strList.Append("\"datetime\":\"" + file.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss") + "\"");//文件最后修改时间
                strList.Append("}");
            }
            json.Append(strList.ToString().Substring(1));
            json.Append("]");
            json.Append("}");
            Response.AddHeader("Content-Type", "application/json; charset=UTF-8");
            Response.Write(json.ToString());
            Response.End();
        }

        #region 排序
        /// <summary>
        /// 按名称排序
        /// </summary>
        public class NameSorter : IComparer
        {
            public int Compare(object x, object y)
            {
                if (x == null && y == null)
                {
                    return 0;
                }
                if (x == null)
                {
                    return -1;
                }
                if (y == null)
                {
                    return 1;
                }
                FileInfo xInfo = new FileInfo(x.ToString());
                FileInfo yInfo = new FileInfo(y.ToString());

                return xInfo.FullName.CompareTo(yInfo.FullName);//递增  
                //return yInfo.FullName.CompareTo(xInfo.FullName);//递减
            }
        }
        /// <summary>
        /// 按文件大小排序
        /// </summary>
        public class SizeSorter : IComparer
        {
            public int Compare(object x, object y)
            {
                if (x == null && y == null)
                {
                    return 0;
                }
                if (x == null)
                {
                    return -1;
                }
                if (y == null)
                {
                    return 1;
                }
                FileInfo xInfo = new FileInfo(x.ToString());
                FileInfo yInfo = new FileInfo(y.ToString());

                //return xInfo.Length.CompareTo(yInfo.Length);//递增  
                return yInfo.Length.CompareTo(xInfo.Length);//递减  
            }
        }
        /// <summary>
        /// 按文件类型排序
        /// </summary>
        public class TypeSorter : IComparer
        {
            public int Compare(object x, object y)
            {
                if (x == null && y == null)
                {
                    return 0;
                }
                if (x == null)
                {
                    return -1;
                }
                if (y == null)
                {
                    return 1;
                }
                FileInfo xInfo = new FileInfo(x.ToString());
                FileInfo yInfo = new FileInfo(y.ToString());

                return xInfo.Extension.CompareTo(yInfo.Extension);//递增  
                //return yInfo.Extension.CompareTo(xInfo.Extension);//递减  
            }
        }
        /// <summary>
        /// 按修改时间排序
        /// </summary>
        public class DateSorter : IComparer
        {
            public int Compare(object x, object y)
            {
                if (x == null && y == null)
                {
                    return 0;
                }
                if (x == null)
                {
                    return -1;
                }
                if (y == null)
                {
                    return 1;
                }
                FileInfo xInfo = new FileInfo(x.ToString());
                FileInfo yInfo = new FileInfo(y.ToString());

                //return xInfo.LastWriteTime.CompareTo(yInfo.LastWriteTime);//递增  
                return yInfo.LastWriteTime.CompareTo(xInfo.LastWriteTime);//递减  
            }
        }
        #endregion 排序
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}