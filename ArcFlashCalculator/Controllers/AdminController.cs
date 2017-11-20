using ArcFlashCalculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login([Bind(Include = "Email, Password")] Users user)
        {
            if (ModelState.IsValid)
            {
                // check user info here
            }

            return View(user);
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult Account()
        {
            return View();
        }
    }
}