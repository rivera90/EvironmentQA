using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EvironmentQA.clsConexión;
using EvironmentQA.Models;
using Newtonsoft.Json;

namespace EvironmentQA.Controllers
{
    public class archivosController : Controller
    {
        // GET: archivos
        public ActionResult Archivos()
        {
            Archivo archi = new Archivo();
            Conexion con = new Conexion();
            List<Archivo> dt = new List<Archivo>(con.Prueba(archi));

             
            return View(dt);
        }
        public ActionResult NuevoArchivo()
        {
            Conexion con = new Conexion();
            Archivo archivo = new Archivo();
            
            ViewBag.opciones = con.Carpetas();

            return View();
        }
        [HttpPost]
        public ActionResult NuevoArchivo(Archivo ar)
        {
            Conexion con = new Conexion();
            //Creo una lista de ejemplo
            ViewBag.opciones = con.Carpetas();
            ViewBag.Alert = con.ImeArchivos(ar);
            return View();
        }

        [HttpPost]
        public ActionResult Delete(int id,int validar)
        {
            Conexion con = new Conexion();
            Archivo ar = new Archivo();
            ar.IdArchivo = id;
            ar.Validador = validar;

            ViewBag.Alert = con.ImeArchivos(ar);
            
            return Redirect("~/Archivos/Archivos");
        }
        
        public ActionResult EditarAchivo(int id)
        {
            Conexion con = new Conexion();
            Archivo ar = new Archivo();
            ar.IdArchivo = id;
            ar.Validador = 1;
            List<Archivo> dt = new List<Archivo>(con.Prueba(ar));

            List<SelectListItem> opciones = new List<SelectListItem>()
            {
                new SelectListItem{ Text="QA", Value="QA" },
                new SelectListItem{ Text="PreProducción", Value="PreProducción" },
                new SelectListItem{ Text="PRODUCCION", Value="PRODUCCION" }                
            };
            ViewBag.selectAmbiente = opciones;
            ViewBag.opciones = con.Carpetas();
            return View(dt[0]);
        }
        [HttpPost]
        public ActionResult EditarAchivo(Archivo archi)
        {
            Conexion con = new Conexion();
         
            //List<Archivo> dt = new List<Archivo>(con.Prueba(archi));

            List<SelectListItem> opciones = new List<SelectListItem>()
            {
                new SelectListItem{ Text="QA", Value="QA" },
                new SelectListItem{ Text="PreProducción", Value="PreProducción" },
                new SelectListItem{ Text="PRODUCCION", Value="PRODUCCION" }
            };

            archi.Validador = 1;
            con.ImeArchivos(archi);

            return Redirect("~/Archivos/Archivos");
        }

        public ActionResult BuscarISR(Archivo archi)
        {
            Conexion con = new Conexion();
            List<Archivo> dt = new List<Archivo>(con.Prueba(archi));
                      
            return View(dt);

        }

        public string BuscarUNISR(Archivo archi)
        {
            Conexion con = new Conexion();
            List<Archivo> dt = new List<Archivo>(con.Prueba(archi));
            
         
            return JsonConvert.SerializeObject(dt);
        }
        [HttpPost]
        public ActionResult CerrarISR(Archivo archi)
        {
            Conexion con = new Conexion();

            con.ImeArchivos(archi);
            return Redirect("~/Archivos/Archivos");
        }
    }
}