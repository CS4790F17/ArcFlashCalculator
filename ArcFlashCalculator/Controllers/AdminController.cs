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