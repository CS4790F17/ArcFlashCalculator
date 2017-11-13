using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class CapacitorController : Controller
    {
        // GET: Capacity
        public ActionResult Index()
        {
            Models.Capacitors capacitors = new Models.Capacitors();
            return View(capacitors);
        }
    }
}