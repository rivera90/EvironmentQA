using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvironmentQA.Models
{
    public class Archivo
    {
        public Archivo()
        {
            IdArchivo = 0;
            NomArchivo = "";
            RutaArchivo = "";
            ISR = 0;
            NomISR = "";
           Ambiente = "";
            FechaModificacion = new DateTime(1900,1,1);
          RutaFileServer = "";
            Validador = 0;
    }
        public int Validador { get; set; }
        public int IdArchivo { get; set; }
        public string NomArchivo { get; set; }
        public string RutaArchivo { get; set; }
        public int idCarpetaRuta { get; set; }
        public int ISR { get; set; }
        public string NomISR { get; set; }
        public string Ambiente { get; set; }
        public DateTime FechaModificacion { get; set; }
        public string RutaFileServer { get; set; }
        
    }
}