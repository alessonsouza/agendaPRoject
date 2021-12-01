using System;
using System.Data;
using AgendaEventos.Interfaces;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace AgendaEventos.Helper.Connection
{
    public class ConnectionFactory : IConnectionFactory
    {
        private readonly IConfiguration _configuration;

        public ConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public MySqlConnection Connection()
        {
            string connectionString = _configuration.GetConnectionString("Default");
            MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();
            return connection;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}