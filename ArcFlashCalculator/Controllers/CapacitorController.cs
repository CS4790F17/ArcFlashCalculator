using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class CapacitorController : Controller
    {
        // GET: Capacitor/CalcCap
        public ActionResult CalcCap()
        {
            Capacitors capacitor = new Capacitors();
            return View(capacitor);
        }

        // POST: Capacitor/CalcCap
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CalcCap(Capacitors capacitor)
        {
            if (ModelState.IsValid)
            {
                //Do stuff here
            }
            return View();
        }


    }
}