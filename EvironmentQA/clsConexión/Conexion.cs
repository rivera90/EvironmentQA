using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EvironmentQA.Models;
using System.Web.Mvc;
using System.Configuration;

namespace EvironmentQA.clsConexión
{
    public class Conexion
    {
        public string CadenaConexión = ConfigurationManager.AppSettings["Cadena_Conexion"]; //@"Data Source = ARMANDORIVERA\SQLEXPRESS; Initial Catalog = Pruebas; user id = ar; password = AR1217out#";

        public IEnumerable<EvironmentQA.Models.Archivo> Prueba(Archivo archi)
        {
            List<Archivo> dt = new List<Archivo>();            
            DataTable ds = new DataTable();

            SqlConnection con = new SqlConnection(CadenaConexión);

            //Abrir conexión

            SqlCommand cmd = new SqlCommand();

            SqlDataAdapter dtRead = new SqlDataAdapter(cmd);

            con.Open();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_MostrarArchivos";
            cmd.Parameters.Add("@Validar", SqlDbType.Int).Value = archi.Validador; //variable;
            cmd.Parameters.Add("@IdDoc", SqlDbType.Int).Value = archi.IdArchivo; //variable;
            cmd.Parameters.Add("@idCarpeta", SqlDbType.Int).Value = archi.idCarpetaRuta; //variable;
            cmd.Parameters.Add("@Ambiente", SqlDbType.VarChar).Value = archi.Ambiente; //variable;
            cmd.Parameters.Add("@Isr", SqlDbType.Int).Value = archi.ISR; //variable;

            //dtRead = cmd.ExecuteReader();
            //dt.Add(dtRead);
            dtRead.Fill(ds);
            
            foreach(DataRow ren in ds.Rows)
            {
                Archivo archivo = new Archivo();
                archivo.IdArchivo = Convert.ToInt32(ren["idarchivo"]);
                archivo.NomArchivo = Convert.ToString(ren["nomarchivo"]);
                archivo.RutaArchivo = Convert.ToString(ren["carpeta"]);
                archivo.idCarpetaRuta = Convert.ToInt32(ren["idCarpetaArchivo"]);
                archivo.ISR = Convert.ToInt32(ren["isr"]);
                archivo.NomISR = Convert.ToString(ren["nomisr"]);
                archivo.Ambiente = Convert.ToString(ren["ambiente"]);
                archivo.FechaModificacion = Convert.ToDateTime(ren["fechamodificacion"]);
                archivo.RutaFileServer = Convert.ToString(ren["rutafileserver"]);

                dt.Add(archivo);
            }
            //dtRead.Close();
            cmd.Dispose();
            con.Close();

            return dt;
        }

        public string ImeArchivos(Archivo archivo)
        {
            SqlConnection con = new SqlConnection(CadenaConexión);
            SqlCommand cmd = new SqlCommand();
            string result = "";
            con.Open();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_IME_Archivos";
            cmd.Parameters.Add("@Validar", SqlDbType.Int).Value = archivo.Validador;
            cmd.Parameters.Add("@NomArchivo", SqlDbType.VarChar).Value = archivo.NomArchivo;
            cmd.Parameters.Add("@idcarpetaArchivo", SqlDbType.Int).Value = archivo.idCarpetaRuta;
            cmd.Parameters.Add("@ISR", SqlDbType.Int).Value = archivo.ISR;
            cmd.Parameters.Add("@NomsISR", SqlDbType.VarChar).Value = archivo.NomISR;
            cmd.Parameters.Add("@Ambiente", SqlDbType.VarChar).Value = archivo.Ambiente;
            cmd.Parameters.Add("@FechaModificacion", SqlDbType.DateTime).Value = archivo.FechaModificacion;
            cmd.Parameters.Add("@RutaFileServer", SqlDbType.VarChar).Value = archivo.RutaFileServer;
            cmd.Parameters.Add("@id", SqlDbType.Int).Value = archivo.IdArchivo;

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                result = reader["result"].ToString();
            }
            cmd.Dispose();
            con.Close();

            return result;
        }       

        public List<SelectListItem> Carpetas()
        {
            List<SelectListItem> dt = new List<SelectListItem>();
            DataTable ds = new DataTable();

            SqlConnection con = new SqlConnection(CadenaConexión);
            SqlCommand cmd = new SqlCommand();
            SqlDataAdapter dtRead = new SqlDataAdapter(cmd);

            con.Open();
            cmd.Connection = con;
            
            cmd.CommandText = "Select * from carpetas";
            dtRead.Fill(ds);
            foreach (DataRow ren in ds.Rows)
            {
                SelectListItem opciones = new SelectListItem();


                opciones.Value = Convert.ToString(ren["id"]);
                opciones.Text = Convert.ToString(ren["carpeta"]);

                dt.Add(opciones);
            }
            //dtRead.Close();
            cmd.Dispose();
            con.Close();

            return dt;
        }
    }
}