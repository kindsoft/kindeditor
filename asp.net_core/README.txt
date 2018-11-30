KindEditor ASP.NET

本ASP.NET程序是演示程序，建议不要直接在实际项目中使用。
如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。

使用方法:

1. 要在HomeController添加依赖注入:
	private readonly IHostingEnvironment _hostingEnv;			/**此项为必要**/
    private readonly IStringLocalizer<Program> _localizer;
    private readonly UserManager<IdentityUser> _userManager;	/**此项为必要**/
    private readonly IEmailSender _emailSender;
    private readonly ApplicationDbContext _context;

    public HomeController(
       IEmailSender emailSender,
       UserManager<IdentityUser> userManager,
       ApplicationDbContext context,
       IHostingEnvironment hostingEnv,
       IStringLocalizer<Program> localizer)
    {
        _hostingEnv = hostingEnv;								/**此项为必要**/
        _localizer = localizer;
        _context = context;
        _userManager = userManager;								/**此项为必要**/
        _emailSender = emailSender;
    }

2. 将HomeController.cs.txt内的内粘贴到项目的HomeController.cs

3. 参考Demo目录的Index.cshtml

4. 所有KindEditor上传的文件均可见(即KindEditor上传的文件皆为公开, 读者可以参考实现更为安全的上传实现方式)

/*
 * 笔者在就读大学，如果你愿意支持笔者，还希望能够给笔者捐款(每一笔捐款都是对笔者的巨大帮助，感激不尽)，
 * 如果你喜欢.NET Core或在.NET Core项目中遇到困难，都可以和笔者交流 https://github.com/linghuchong123
 */