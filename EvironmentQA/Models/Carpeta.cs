using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvironmentQA.Models
{
    public class Carpeta
    {
        public Carpeta()
        {
            ID = 0;
            Carpetas = "";
        }

        public int ID { get; set; }
        public string Carpetas{ get; set; }
    }
}