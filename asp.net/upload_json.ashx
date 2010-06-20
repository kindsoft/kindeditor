<%@ webhandler Language="C#" class="Upload" %>

/**
 * KindEditor ASP.NET
 *
 * 本ASP.NET程序是演示程序，建议不要直接在实际项目中使用。
 * 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
 *
 */

using System;
using System.Collections;
using System.Web;
using System.IO;
using System.Globalization;
using LitJson;

public class Upload : IHttpHandler
{
	//文件保存目录路径
	private String savePath = "../attached/";
	//文件保存目录URL
	private String saveUrl = "../attached/";
	//定义允许上传的文件扩展名
	private String fileTypes = "gif,jpg,jpeg,png,bmp";
	//最大文件大小
	private int maxSize = 1000000;

	private HttpContext context;

	public void ProcessRequest(HttpContext context)
	{
		this.context = context;

		HttpPostedFile imgFile = context.Request.Files["imgFile"];
		if (imgFile == null)
		{
			showError("请选择文件。");
		}

		String dirPath = context.Server.MapPath(savePath);
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

		Hashtable hash = new Hashtable();
		hash["error"] = 0;
		hash["url"] = fileUrl;
		context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
		context.Response.Write(JsonMapper.ToJson(hash));
		context.Response.End();
	}

	private void showError(string message)
	{
		Hashtable hash = new Hashtable();
		hash["error"] = 1;
		hash["message"] = message;
		context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
		context.Response.Write(JsonMapper.ToJson(hash));
		context.Response.End();
	}

	public bool IsReusable
	{
		get
		{
			return true;
		}
	}
}
