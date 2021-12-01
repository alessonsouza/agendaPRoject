using System.Collections.Generic;
using System.Threading.Tasks;
using AgendaEventos.Models;

namespace AgendaEventos.Interfaces.Services.Security
{
    public interface ILogin
    {
        Task<ResponseLogin> Authenticate(Login login);
        List<User> AllUsers(User obj);

        object SaveUser(User obj);
        object UpdateUser(User obj);
    }
}