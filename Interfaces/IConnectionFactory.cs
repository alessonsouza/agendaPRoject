using System.Data;
using MySqlConnector;

namespace AgendaEventos.Interfaces
{
    public interface IConnectionFactory
    {
        MySqlConnection Connection();
    }
}