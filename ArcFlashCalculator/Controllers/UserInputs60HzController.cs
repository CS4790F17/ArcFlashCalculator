﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ArcFlashCalculator.Models;

namespace ArcFlashCalculator.Controllers
{
    public class UserInputs60HzController : Controller
    {
        private ArcCalculatorDbContext db = new ArcCalculatorDbContext();

        // GET: UserInputs60Hz
        public ActionResult Index()
        {
            Models.Power60Hz power60Hz = new Models.Power60Hz();
            return View(power60Hz);
        }

        // ------------------------------- These are the important actionresults//
        // GET: UserInputs60Hz/Calc60Hz
        public ActionResult Calc60Hz()
        {
            Models.Power60Hz power60Hz = new Models.Power60Hz();
            return View(power60Hz);
        }

        // POST: UserInputs60Hz/Calc60Hz
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Calc60Hz(Power60Hz power60Hz)
        {
            if (ModelState.IsValid)
            {
                ViewModels.CreateUserInputs60Hz(power60Hz.Inputs);
            }
            return View();
        }

        // ------------------------------- These are the important actionresults//

        // GET: UserInputs60Hz/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputs60Hz userInputs60Hz = db.userInputs60Hz.Find(id);
            if (userInputs60Hz == null)
            {
                return HttpNotFound();
            }
            return View(userInputs60Hz);
        }

        // GET: UserInputs60Hz/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserInputs60Hz/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,TransSize,Impedance,SCC,FaultClearing,Voltage,OEInFreshAir,IPAddress")] UserInputs60Hz userInputs60Hz)
        {
            if (ModelState.IsValid)
            {
                db.userInputs60Hz.Add(userInputs60Hz);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(userInputs60Hz);
        }

        // GET: UserInputs60Hz/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputs60Hz userInputs60Hz = db.userInputs60Hz.Find(id);
            if (userInputs60Hz == null)
            {
                return HttpNotFound();
            }
            return View(userInputs60Hz);
        }

        // POST: UserInputs60Hz/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,TransSize,Impedance,SCC,FaultClearing,Voltage,OEInFreshAir,IPAddress")] UserInputs60Hz userInputs60Hz)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userInputs60Hz).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userInputs60Hz);
        }

        // GET: UserInputs60Hz/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputs60Hz userInputs60Hz = db.userInputs60Hz.Find(id);
            if (userInputs60Hz == null)
            {
                return HttpNotFound();
            }
            return View(userInputs60Hz);
        }

        // POST: UserInputs60Hz/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserInputs60Hz userInputs60Hz = db.userInputs60Hz.Find(id);
            db.userInputs60Hz.Remove(userInputs60Hz);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
