using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class SubRFController : Controller
    {
        // GET: SubRF
        public ActionResult Index()
        {
            Models.SubRF subRF = new Models.SubRF();
            return View(subRF);
        }
    }
}