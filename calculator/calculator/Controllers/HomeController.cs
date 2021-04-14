using calculator.Models;
using System.IO;
using System.Web.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using System.Configuration;

namespace calculator.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddNote(Note note)
        {
            try
            {
                string notesPath = Server.MapPath(@ConfigurationManager.AppSettings["notesPath"]);
                using (StreamWriter writer = new StreamWriter(notesPath, true))
                {
                    note.Id = Guid.NewGuid().ToString();
                    var noteJson = JsonConvert.SerializeObject(note);
                    writer.WriteLine(noteJson);
                }
                return View("Index");
            }
            catch(IOException ex)
            {
                Response.StatusCode = 500;
                return Json(new { Message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetNotes()
        {
            try
            {
                List<Note> notes = new List<Note>();
                string notesPath = Server.MapPath(@ConfigurationManager.AppSettings["notesPath"]);
                using (StreamReader reader = new StreamReader(notesPath))
                {
                    string line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        notes.Add(JsonConvert.DeserializeObject<Note>(line));
                    }
                }
                return Json(new { Notes = notes }, JsonRequestBehavior.AllowGet);
            }
            catch (IOException)
            {
                Response.StatusCode = 500;
                return Json(new { Message = "empty history" }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}