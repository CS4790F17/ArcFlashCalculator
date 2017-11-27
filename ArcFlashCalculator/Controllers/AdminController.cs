using ArcFlashCalculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Security;

namespace ArcFlashCalculator.Controllers
{
    //[Authorize]
    public class AdminController : Controller
    {
        //GET: Admin/Delete
        public ActionResult Delete()
        {
            List<Users> userList = ViewModels.GetAllUsers();
            return View(userList);
        }

        //POST: Admin/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Users user)
        {
            if (ModelState.IsValid)
            {
                ViewModels.DeleteUser(user.Id);
            }
            return RedirectToAction("Delete");
        }

        //GET: Admin/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            User user = new User();
            user.error = false;
            return View(user);
        }

        //POST: Admin/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult Login(User user)
        {
            //A user has been returned. Pull out the username that is specified. Has the user's password and compare it to the hash in the database.
            if (ModelState.IsValid)
            {
                //Get the information for the user they are trying to login as
                Users u = ViewModels.GetUser(user.user.Username);

                //Check to the entered password against the saved password
                if (Encrypter.VerifyHash(user.user.Password, u.Password))
                {
                    //TODO: Figure out how to set the validation for a user
                    RedirectToAction("Create");                   
                } else
                {
                    //It failed so return the view with the user input
                    user.error = true;
                    return View(user);
                }
            }
            return View();
        }

        //GET: Admin/Password
        public ActionResult Password()
        {
            ChangePassword cp = new ChangePassword();
            cp.UserOrPasswordError = false;
            cp.confirmError = false;
            return View(cp);
        }

        //POST: Admin/Password
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Password(ChangePassword changedPassword)
        {
            if (ModelState.IsValid)
            {                
                //Check that the new and confirmed password match
                if (changedPassword.newPassword.Equals(changedPassword.confirmPassword))
                {
                    //Email is our username
                    Users user = ViewModels.GetUser(changedPassword.email);

                    //Check that the oldpassword matches our password
                    if (Encrypter.VerifyHash(changedPassword.oldPassword, user.Username))
                    {
                        user.Password = Encrypter.ComputeHash(changedPassword.newPassword, null);
                        RedirectToAction("Create");
                    } else
                    {
                        changedPassword.UserOrPasswordError = true;
                        return View(changedPassword);
                    }
                } else
                {
                    changedPassword.confirmError = true;
                    return View(changedPassword);
                }
            }
            return View();
        }

        //GET: Admin/ReportHome
        public ActionResult ReportHome() {
            return View();
        }

        //GET: Admin/Report60Hz
        public ActionResult Report60Hz()
        {
            return View();
        }

        //GET: Admin/ReportDC
        public ActionResult ReportDC()
        {
            return View();
        }

        //GET: Admin/ReportIP
        public ActionResult ReportIp()
        {

            return View();
        }

        //GET: Admin/Create
        public ActionResult Create()
        {
            User newUser = new User();
            newUser.error = false;
            return View(newUser);
        }

        //POST: Admin/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User newUser)
        {
            if (ModelState.IsValid)
            {
                //TODO: Check the cookie
                Users nameCheck = ViewModels.GetUser(newUser.user.Username);
                if (nameCheck == null)
                {
                    newUser.user.Password = Encrypter.ComputeHash(newUser.user.Password, null);
                    ViewModels.CreateUser(newUser.user);
                } else
                {
                    //The name was already assigned
                    newUser.error = true;
                    return View(newUser);
                }
            }
            return View();
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult Account()
        {
            List<Users> userList = ViewModels.GetAllUsers();
            return View(userList);
        }

        
        public void dummyData(List<User> userList)
        {
            foreach(User u in userList)
            {

            }
        }
            try
            {
                return View();
            }
            catch(Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }
    }
}