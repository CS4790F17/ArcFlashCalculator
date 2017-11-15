using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class CapacitorController : Controller
    {
        // GET: Calculate Capacitor
        public ActionResult CalcCap()
        {
            Models.Capacitors capacitor = new Models.Capacitors();
            return View(capacitor);
        }
    }
}