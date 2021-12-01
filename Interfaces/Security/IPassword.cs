namespace AgendaEventos.Interfaces.Security
{
    public interface IPassword
    {
        string Encrypt(string password);
    }
}