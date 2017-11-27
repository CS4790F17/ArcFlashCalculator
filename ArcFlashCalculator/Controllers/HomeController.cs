using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
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

        public ActionResult About()
        {
            try
            {
                ViewBag.Message = "Your application description page.";

                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        public ActionResult Contact()
        {
            try
            {
                ViewBag.Message = "Your contact page.";

                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }
    }
}