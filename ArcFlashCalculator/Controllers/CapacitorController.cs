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
        public ActionResult Index()
        {
            try
            {
                Capacitors capacitor = new Capacitors();
                return View(capacitor);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: Capacitor/CalcCap
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(Capacitors capacitor)
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