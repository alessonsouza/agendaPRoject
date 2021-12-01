using System;
using System.Reflection.Metadata;
using MySqlConnector;

namespace AgendaEventos.Controllers
{
    public class RegisterEvents
    {
        public int rg_id_events { get; set; }
        public string rg_title { get; set; }
        public DateTime rg_date_begin { get; set; }
        public DateTime rg_date_end { get; set; }
        public Nullable<DateTime> rg_date_begin_show { get; set; }
        public Nullable<DateTime> rg_date_end_visu { get; set; }
        public string rg_site { get; set; }
        public string rg_description { get; set; }
        public string rg_document { get; set; }
        public Boolean rg_show_by_time { get; set; }
        public string rg_status { get; set; }
        public string rg_local { get; set; }
    }
}