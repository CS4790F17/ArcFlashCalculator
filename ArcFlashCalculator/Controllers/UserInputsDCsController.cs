using System;
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
    public class UserInputsDCsController : Controller
    {
        private ArcCalculatorDbContext db = new ArcCalculatorDbContext();

        // GET: UserInputsDCs
        public ActionResult Index()
        {
            return View(db.userInputsDC.ToList());
        }

        // GET: UserInputsDCs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputsDC userInputsDC = db.userInputsDC.Find(id);
            if (userInputsDC == null)
            {
                return HttpNotFound();
            }
            return View(userInputsDC);
        }

        // GET: UserInputsDCs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserInputsDCs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,PotMaxExp,AvailSCC,Duration,IPAddress")] UserInputsDC userInputsDC)
        {
            if (ModelState.IsValid)
            {
                db.userInputsDC.Add(userInputsDC);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(userInputsDC);
        }

        // GET: UserInputsDCs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputsDC userInputsDC = db.userInputsDC.Find(id);
            if (userInputsDC == null)
            {
                return HttpNotFound();
            }
            return View(userInputsDC);
        }

        // POST: UserInputsDCs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,PotMaxExp,AvailSCC,Duration,IPAddress")] UserInputsDC userInputsDC)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userInputsDC).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userInputsDC);
        }

        // GET: UserInputsDCs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInputsDC userInputsDC = db.userInputsDC.Find(id);
            if (userInputsDC == null)
            {
                return HttpNotFound();
            }
            return View(userInputsDC);
        }

        // POST: UserInputsDCs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserInputsDC userInputsDC = db.userInputsDC.Find(id);
            db.userInputsDC.Remove(userInputsDC);
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
