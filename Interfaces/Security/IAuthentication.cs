using System.Threading.Tasks;
using AgendaEventos.Models;

namespace AgendaEventos.Interfaces.Services.Security
{
    public interface IAuthentication
    {
        Task<User> Autenthicate(string username, string password);
        bool BelongToGroup(string groupName);

    }
}