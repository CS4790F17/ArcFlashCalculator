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

        //GET: Admin/Delete
        public ActionResult Delete()
        {
            List<Users> userList = ViewModels.GetAllUsers();
            return View(userList);
        }

        //POST: Admin/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(List<Users> userList)
        {
            if (ModelState.IsValid)
            {
                foreach (Users user in userList)
                {
                    ViewModels.DeleteUser(user.Id);
                }
            }
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

        //POST: Admin/Password
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Password(ChangePassword changedPassword)
        {
            if (ModelState.IsValid)
            {
             
            }
            return View();
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

        //GET: Admin/Create
        public ActionResult Create()
        {
            Users newUser = new Users();
            return View(newUser);
        }

        //POST: Admin/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Users newUser)
        {
            if (ModelState.IsValid)
            {
                ViewModels.CreateUser(newUser);
            }
            return View();
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