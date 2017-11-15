using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class SubRFController : Controller
    {
        // GET: Calculate SUBRF
        public ActionResult CalcSubRF()
        {
            Models.SubRF powerSubRF = new Models.SubRF();
            return View(powerSubRF);
        }
    }
}