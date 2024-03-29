﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class SubRFController : Controller
    {
        //public ActionResult index()
        //{
        //    return View();
        //}

        // GET: SubRF/CalcSubRF
        public ActionResult Index()
        {
            try
            {
                SubRF powerSubRF = new SubRF();
                return View(powerSubRF);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: SubRF/CalcSubRF
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(SubRF subRF)
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