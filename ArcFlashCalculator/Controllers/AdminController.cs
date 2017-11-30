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
        public ActionResult Delete(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ViewModels.DeleteUser(id);
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
                Login login = new Login();
                return View(login);
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
        public ActionResult Login(Login login)
        {
            try
            {
                //A user has been returned. Pull out the email that is specified. Has the user's password and compare it to the hash in the database.
                if (ModelState.IsValid)
                {
                    //Get the information for the user they are trying to login as
                    Users u = ViewModels.GetUser(login.user.Email);

                    //Check to the entered password against the saved password
                    if (Encrypter.VerifyHash(login.user.Password, u.Password))
                    {
                        //TODO: Figure out how to set the validation for a user
                        return RedirectToAction("ReportHome");
                    }
                    else
                    {
                        //It failed so return the view with the user input
                        login.Error = true;
                        return View(login);
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
        public ActionResult ChangePassword()
        {
            try
            {
                ChangePassword cp = new ChangePassword();
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
        public ActionResult ChangePassword(ChangePassword changedPassword)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Check that the password is complex enough
                    if (CheckComplexity(changedPassword.newPassword))
                    {
                        //Check that the new and confirmed password match
                        if (changedPassword.newPassword.Equals(changedPassword.confirmPassword))
                        {
                            //Email is our email
                            Users user = ViewModels.GetUser(changedPassword.user.Email);

                            //Check that the oldpassword matches our password
                            if (Encrypter.VerifyHash(changedPassword.user.Password, user.Password))
                            {
                                user.Password = Encrypter.ComputeHash(changedPassword.newPassword, null);

                                ViewModels.UpdateUser(user, System.Data.Entity.EntityState.Modified);
                                return RedirectToAction("ReportHome");
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
                    } else
                    {
                        changedPassword.PasswordComplexityError = true;
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
                return View("Report60Hz");
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
                CreateNewUser newUser = new CreateNewUser();
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
        public ActionResult Create(CreateNewUser newUser)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //TODO: Check the cookie
                    if (!ViewModels.CheckForUser(newUser.user.Email))
                    {
                        if (CheckComplexity(newUser.user.Password))
                        {
                            newUser.user.Password = Encrypter.ComputeHash(newUser.user.Password, null);
                            Users myUser = new Users();
                            myUser.Email = newUser.user.Email;
                            myUser.Password = newUser.user.Password;
                            ViewModels.CreateUser(myUser);
                        } else
                        {
                            newUser.passwordError = true;
                            return View(newUser);
                        }
                    }
                    else
                    {
                        newUser.emailError = true;
                        return View(newUser);
                    }
                }
                return RedirectToAction("Delete");
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

        public bool CheckComplexity(string password)
        {
            int digits = 0;
            int uppers = 0;
            int symbols = 0;
            if (password.Length >= 15 && password.Length <= 25)
            {
                foreach (char c in password)
                {
                    if (char.IsDigit(c)) digits++;
                    if (char.IsUpper(c)) uppers++;
                    if (!char.IsDigit(c) && !char.IsLetter(c)) symbols++;
                }

                if (digits >= 2) {
                    if (uppers >= 2) {
                        if (symbols >= 2) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }
}