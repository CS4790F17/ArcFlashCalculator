﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcFlashCalculator.Controllers
{
    public class BatteryController : Controller
    {
        // GET: Battery
        public ActionResult Index()
        {
            Models.Battery battery = new Models.Battery();
            return View(battery);
        }
    }
}