using AgendaEventos.Models;

namespace AgendaEventos.Interfaces.Services.Security
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}