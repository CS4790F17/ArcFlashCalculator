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
            try
            {
                Models.PowerDC PowerDC = new Models.PowerDC();
                return View(PowerDC);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // ------------------------------- These are the important actionresults//
        // GET: UserInputsDC/CalcDC
        public ActionResult CalcDC()
        {
            try
            {
                Models.PowerDC PowerDC = new Models.PowerDC();
                return View(PowerDC);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: UserInputs60Hz/Calc60Hz
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CalcDC(PowerDC powerDC)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ViewModels.CreateUserInputsDC(powerDC.Inputs);
                }
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }
        // ------------------------------- These are the important actionresults//

        // GET: UserInputsDCs/Details/5
        public ActionResult Details(int? id)
        {
            try
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
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // GET: UserInputsDCs/Create
        public ActionResult Create()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: UserInputsDCs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,PotMaxExp,AvailSCC,Duration,IPAddress")] UserInputsDC userInputsDC)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.userInputsDC.Add(userInputsDC);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }

                return View(userInputsDC);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // GET RID OF THIS METHOD AND IT'S VIEW ///
        // GET: UserInputsDCs/Edit/5
        public ActionResult Edit(int? id)
        {
            try
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
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }


        // GET RID OF THIS METHOD AND IT'S VIEWS ///
        // POST: UserInputsDCs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,PotMaxExp,AvailSCC,Duration,IPAddress")] UserInputsDC userInputsDC)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(userInputsDC).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(userInputsDC);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // GET: UserInputsDCs/Delete/5
        public ActionResult Delete(int? id)
        {
            try
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
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        // POST: UserInputsDCs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {
                UserInputsDC userInputsDC = db.userInputsDC.Find(id);
                db.userInputsDC.Remove(userInputsDC);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            try
            {
                if (disposing)
                {
                    db.Dispose();
                }
                base.Dispose(disposing);
            }
            catch (Exception e)
            {
                DataLink.LogError(e);
                throw;
            }
        }
    }
}
