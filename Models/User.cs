using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using MySqlConnector;

namespace AgendaEventos.Models
{
    public class User
    {
        public int idauth { get; set; }
        public string auth_name { get; set; }
        public string auth_login { get; set; }
        public string auth_password { get; set; }
        public DateTime auth_data_created { get; set; }
        public DateTime auth_data_updated { get; set; }

        public string auth_image { get; set; }
        public int auth_active { get; set; }
    }
}