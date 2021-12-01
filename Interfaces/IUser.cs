using System.Collections.Generic;
using System.Threading.Tasks;
using AgendaEventos.Models;

namespace AgendaEventos.Interfaces.Services
{
    public interface IUser
    {
        Task<IEnumerable<User>> GetUsers(string username);
        Task<IEnumerable<User>> GetUsersByNumCAd(int matricula);
    }
}