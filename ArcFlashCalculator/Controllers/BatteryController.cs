using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class BatteryController : Controller
    {
        //public ActionResult index()
        //{
        //    return View();
        //}

        // GET: Battery/CalcBat
        public ActionResult Index()
        {
            try {
                Battery battery = new Battery();
                return View(battery);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: Battery/CalcBat
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(Battery battery)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Do stuff here
                }
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