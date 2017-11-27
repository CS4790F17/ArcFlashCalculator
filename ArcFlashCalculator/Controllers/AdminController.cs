using ArcFlashCalculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Security;

namespace ArcFlashCalculator.Controllers
{
    public class AdminController : Controller
    {
        //GET: Admin/Delete
        public ActionResult Delete()
        {
            try
            {
                List<Users> userList = ViewModels.GetAllUsers();
                return View(userList);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //POST: Admin/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Users user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ViewModels.DeleteUser(user.Id);
                }
                return RedirectToAction("Delete");
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            try
            {
                User user = new User();
                user.error = false;
                return View(user);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //POST: Admin/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult Login(User user)
        {
            try
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
                    }
                    else
                    {
                        //It failed so return the view with the user input
                        user.error = true;
                        return View(user);
                    }
                }
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/Password
        public ActionResult Password()
        {
            try
            {
                ChangePassword cp = new ChangePassword();
                cp.UserOrPasswordError = false;
                cp.confirmError = false;
                return View(cp);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //POST: Admin/Password
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Password(ChangePassword changedPassword)
        {
            try
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
                        }
                        else
                        {
                            changedPassword.UserOrPasswordError = true;
                            return View(changedPassword);
                        }
                    }
                    else
                    {
                        changedPassword.confirmError = true;
                        return View(changedPassword);
                    }
                }
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/ReportHome
        public ActionResult ReportHome()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/Report60Hz
        public ActionResult Report60Hz()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/ReportDC
        public ActionResult ReportDC()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/ReportIP
        public ActionResult ReportIp()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //GET: Admin/Create
        public ActionResult Create()
        {
            try
            {
                User newUser = new User();
                newUser.error = false;
                return View(newUser);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        //POST: Admin/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User newUser)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //TODO: Check the cookie
                    Users nameCheck = ViewModels.GetUser(newUser.user.Username);
                    if (nameCheck == null)
                    {
                        newUser.user.Password = Encrypter.ComputeHash(newUser.user.Password, null);
                        ViewModels.CreateUser(newUser.user);
                    }
                    else
                    {
                        //The name was already assigned
                        newUser.error = true;
                        return View(newUser);
                    }
                }
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        public ActionResult ChangePassword()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        public ActionResult Account()
        {
            try
            {
                List<Users> userList = ViewModels.GetAllUsers();
                return View(userList);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }


        public void dummyData(List<User> userList)
        {
            foreach (User u in userList)
            {

            }
        }
    }
}