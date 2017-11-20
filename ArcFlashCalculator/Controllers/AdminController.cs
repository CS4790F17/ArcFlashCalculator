using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        //GET: Admin/Login
        public ActionResult Login()
        {
            Users user = new Users();
            return View();
        }

        //POST: Admin/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Users user)
        {
            return View();
        }

        //GET: Admin/Password
        public ActionResult Password()
        {
            ChangePassword cp = new ChangePassword();
            return View(cp);
        }

        //GET: Admin/Report60Hz
        public ActionResult Report60Hz()
        {
            List<UserInputs60Hz> report = ViewModels.GetAllUserInputs60Hz();
            return View(report);
        }

        //GET: Admin/ReportDC
        public ActionResult ReportDC()
        {
            List<UserInputsDC> report = ViewModels.GetAllUserInputsDC();
            return View(report);
        }

        //GET: Admin/ReportIP
        public ActionResult ReportIp()
        {
            List<string> report = ViewModels.GetAllIP();
            return View(report);
        }
        //List of routes
        //IpReport
        //ReportHome
    }
}