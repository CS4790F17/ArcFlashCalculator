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
        public ActionResult index()
        {
            return View();
        }

        // GET: Battery/CalcBat
        public ActionResult CalcBat()
        {
            Battery battery = new Battery();
            return View(battery);
        }

        // POST: Battery/CalcBat
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CalcBat(Battery battery)
        {
            if (ModelState.IsValid)
            {
                //Do stuff here
            }
            return View();
        }
    }
}