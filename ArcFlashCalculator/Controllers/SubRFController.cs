using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class SubRFController : Controller
    {
        public ActionResult index()
        {
            return View();
        }

        // GET: SubRF/CalcSubRF
        public ActionResult CalcSubRF()
        {
            SubRF powerSubRF = new SubRF();
            return View(powerSubRF);
        }

        // POST: SubRF/CalcSubRF
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CalcSubRF(SubRF subRF)
        {
            if (ModelState.IsValid)
            {
                //Do stuff here
            }
            return View();
        }
    }
}