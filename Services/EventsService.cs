using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlTypes;
using System.Threading.Tasks;
using AgendaEventos.Controllers;
using AgendaEventos.Interfaces;
using Microsoft.AspNetCore.Http;
using MySqlConnector;

namespace AgendaEventos.Models
{
    public class EventsService : IEvents
    {

        public readonly IConnectionFactory _connection;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EventsService(IConnectionFactory conn, IHttpContextAccessor httpContextAccessor)
        {
            _connection = conn;
            _httpContextAccessor = httpContextAccessor;

        }

        public List<RegisterEvents> GetEvents(RegisterEvents obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            string whereClause = "";
            string AndORClause = "";
            List<RegisterEvents> list = new List<RegisterEvents>();

            conn.CommandText = @"SELECT * FROM events.register_events ";

            if (!String.IsNullOrEmpty(obj.rg_title))
            {
                whereClause = "where ";
                conn.CommandText += whereClause;
                conn.CommandText += "rg_title like '%" + obj.rg_title + "%'";
                // conn.Parameters.AddWithValue("@rg_title", obj.rg_title);
            }

            if (!String.IsNullOrEmpty(obj.rg_description))
            {
                if (!String.IsNullOrEmpty(whereClause))
                {
                    AndORClause = " AND ";
                    conn.CommandText += AndORClause;
                }
                else
                {
                    whereClause = "where ";
                    conn.CommandText += whereClause;
                }
                conn.CommandText += "rg_description like '%" + obj.rg_description + "%'";
                // conn.Parameters.AddWithValue("@rg_description", obj.rg_description);
            }

            if (obj.rg_date_begin.ToString() != "01/01/0001 00:00:00")
            {
                if (!String.IsNullOrEmpty(whereClause))
                {
                    AndORClause = " AND ";
                    conn.CommandText += AndORClause;
                }
                else
                {
                    whereClause = "where ";
                    conn.CommandText += whereClause;
                }
                conn.CommandText += "rg_date_begin >= '" + obj.rg_date_begin.ToString("yyyy-MM-dd HH:mm:ss") + "'";
                // conn.Parameters.AddWithValue("@rg_date_begin", obj.rg_date_begin);
            }

            if (obj.rg_date_end.ToString() != "01/01/0001 00:00:00")
            {
                if (!String.IsNullOrEmpty(whereClause))
                {
                    AndORClause = " AND ";
                    conn.CommandText += AndORClause;
                }
                else
                {
                    whereClause = "where ";
                    conn.CommandText += whereClause;
                }
                conn.CommandText += "rg_date_end <= '" + obj.rg_date_end.ToString("yyyy-MM-dd HH:mm:ss") + "'";
                // conn.Parameters.AddWithValue("@rg_date_end", obj.rg_date_end);
            }

            Console.WriteLine(conn.CommandText);

            using (var reader = conn.ExecuteReader())
                try
                {
                    while (reader.Read())
                    {
                        var anexo = reader.GetValue("rg_document");
                        var status = reader.GetValue("rg_status");
                        var local = reader.GetValue("rg_local");
                        var date_begin_show = reader.GetValue("rg_date_begin_show");
                        var date_end_visu = reader.GetValue("rg_date_end_visu");
                        list.Add(new RegisterEvents
                        {
                            rg_id_events = reader.GetInt32("rg_id_events"),
                            rg_title = reader.GetString("rg_title"),
                            rg_date_begin = reader.GetDateTime("rg_date_begin"),
                            rg_date_end = reader.GetDateTime("rg_date_end"),
                            rg_date_begin_show = (((date_begin_show.ToString() == "01/01/0001 00:00:00" || date_begin_show.ToString() == "" ? null : (Nullable<DateTime>)date_begin_show))),
                            rg_date_end_visu = (((date_end_visu.ToString() == "01/01/0001 00:00:00" || date_begin_show.ToString() == "" ? null : (DateTime)date_end_visu))),
                            rg_site = reader.GetString("rg_site"),
                            rg_description = reader.GetString("rg_description"),
                            rg_document = (string)(anexo.ToString() == "" ? null : anexo),
                            rg_show_by_time = reader.GetBoolean("rg_show_by_time"),
                            rg_status = (string)(status.ToString() == "" ? null : status),
                            rg_local = (string)(local.ToString() == "" ? null : local),
                        });
                    }
                    Console.WriteLine(list);
                    return list;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    connection.Close();
                    throw new ApplicationException(e.Message);
                }
        }

        public List<RegisterEvents> GetEventsShow()
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            List<RegisterEvents> list = new List<RegisterEvents>();

            conn.CommandText = @"SELECT * FROM events.register_events 
                                          where (rg_date_begin_show is not null or rg_date_end_visu is not null )
                                            and rg_status <> 'cancelado'    ";

            using (var reader = conn.ExecuteReader())
                try
                {
                    while (reader.Read())
                    {
                        var anexo = reader.GetValue("rg_document");
                        var status = reader.GetValue("rg_status");
                        var local = reader.GetValue("rg_local");
                        var date_begin_show = reader.GetValue("rg_date_begin_show");
                        var date_end_visu = reader.GetValue("rg_date_end_visu");
                        list.Add(new RegisterEvents
                        {
                            rg_id_events = reader.GetInt32("rg_id_events"),
                            rg_title = reader.GetString("rg_title"),
                            rg_date_begin = reader.GetDateTime("rg_date_begin"),
                            rg_date_end = reader.GetDateTime("rg_date_end"),
                            rg_date_begin_show = (((date_begin_show.ToString() == "01/01/0001 00:00:00" || date_begin_show.ToString() == "" ? null : (Nullable<DateTime>)date_begin_show))),
                            rg_date_end_visu = (((date_end_visu.ToString() == "01/01/0001 00:00:00" || date_begin_show.ToString() == "" ? null : (DateTime)date_end_visu))),
                            rg_site = reader.GetString("rg_site"),
                            rg_description = reader.GetString("rg_description"),
                            rg_document = (string)(anexo.ToString() == "" ? null : anexo),
                            rg_show_by_time = reader.GetBoolean("rg_show_by_time"),
                            rg_status = (string)(status.ToString() == "" ? null : status),
                            rg_local = (string)(local.ToString() == "" ? null : local),
                        });
                    }
                    Console.WriteLine(list);
                    return list;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    connection.Close();
                    throw new ApplicationException(e.Message);
                }
        }

        public object SaveEvent(RegisterEvents obj)
        {


            // var connString = "server=127.0.0.1;uid=root;pwd=12345;database=events";
            // var connection = new MySqlConnection(connString);
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            // using (var conn = connection.CreateCommand())
            // {
            // object dataAdmissao = DBNull.Value;



            conn.CommandText = @"INSERT INTO register_events (                      
                            rg_title	,
                            rg_date_begin,
                            rg_date_end	,
                            rg_date_begin_show	,
                            rg_date_end_visu	,
                            rg_site	,
                            rg_description	,
                            rg_document	,
                            rg_show_by_time,
                            rg_status,
                            rg_local	
                        ) values (
                            @rg_title	,
                            @rg_date_begin,
                            @rg_date_end	,
                            @rg_date_begin_show	,
                            @rg_date_end_visu	,
                            @rg_site	,
                            @rg_description	,
                            @rg_document	,
                            @rg_show_by_time,
                            @rg_status,
                            @rg_local
                        )";


            conn.Parameters.AddWithValue("@rg_title", obj.rg_title);
            conn.Parameters.AddWithValue("@rg_date_begin", obj.rg_date_begin);
            conn.Parameters.AddWithValue("@rg_date_end", obj.rg_date_end);
            conn.Parameters.AddWithValue("@rg_date_begin_show", obj.rg_date_begin_show.ToString() == "01/01/0001 00:00:00" ? SqlDateTime.Null : obj.rg_date_begin_show);
            conn.Parameters.AddWithValue("@rg_date_end_visu", obj.rg_date_end_visu);
            conn.Parameters.AddWithValue("@rg_site", obj.rg_site);
            conn.Parameters.AddWithValue("@rg_description", obj.rg_description);
            conn.Parameters.AddWithValue("@rg_document", obj.rg_document);
            conn.Parameters.AddWithValue("@rg_show_by_time", obj.rg_show_by_time);
            conn.Parameters.AddWithValue("@rg_status", obj.rg_status);
            conn.Parameters.AddWithValue("@rg_local", obj.rg_local);

            try
            {
                // connection.Open();
                return conn.ExecuteReader();
            }
            catch (Exception e)
            {

                connection.Close();
                throw new ApplicationException(e.Message);
            }
            // }
        }

        public object UpdateEvent(RegisterEvents obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();

            conn.CommandText = @"UPDATE register_events                     
                        set rg_title = @rg_title,
                            rg_date_begin = @rg_date_begin,
                            rg_date_end	= @rg_date_end,
                            rg_date_begin_show = @rg_date_begin_show,
                            rg_date_end_visu = @rg_date_end_visu,
                            rg_site	= @rg_site,
                            rg_description = @rg_description,
                            rg_document	= @rg_document,
                            rg_show_by_time = @rg_show_by_time,
                            rg_status = @rg_status,
                            rg_local = @rg_local
                        where rg_id_events = @rg_id_events
                       ";


            conn.Parameters.AddWithValue("@rg_id_events", obj.rg_id_events);
            conn.Parameters.AddWithValue("@rg_title", obj.rg_title);
            conn.Parameters.AddWithValue("@rg_date_begin", obj.rg_date_begin);
            conn.Parameters.AddWithValue("@rg_date_end", obj.rg_date_end);
            conn.Parameters.AddWithValue("@rg_date_begin_show", obj.rg_date_begin_show.ToString() == "01/01/0001 00:00:00" ? SqlDateTime.Null : obj.rg_date_begin_show);
            conn.Parameters.AddWithValue("@rg_date_end_visu", obj.rg_date_end_visu);
            conn.Parameters.AddWithValue("@rg_site", obj.rg_site);
            conn.Parameters.AddWithValue("@rg_description", obj.rg_description);
            conn.Parameters.AddWithValue("@rg_document", obj.rg_document);
            conn.Parameters.AddWithValue("@rg_show_by_time", obj.rg_show_by_time);
            conn.Parameters.AddWithValue("@rg_status", obj.rg_status);
            conn.Parameters.AddWithValue("@rg_local", obj.rg_local);


            try
            {
                // connection.Open();
                return conn.ExecuteReader();
            }
            catch (Exception e)
            {

                connection.Close();
                throw new ApplicationException(e.Message);
            }
            // }
        }

        public object DeleteEvent(RegisterEvents obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            conn.CommandText = @"DELETE from register_events
                        where rg_id_events = @rg_id_events
                       ";
            conn.Parameters.AddWithValue("@rg_id_events", obj.rg_id_events);
            try
            {
                return conn.ExecuteReader();
            }
            catch (Exception e)
            {

                connection.Close();
                throw new ApplicationException(e.Message);
            }
            // }
        }
    }
}