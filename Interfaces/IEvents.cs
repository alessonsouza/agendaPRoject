using System.Collections.Generic;
using System.Threading.Tasks;
using AgendaEventos.Controllers;

namespace AgendaEventos.Interfaces
{
    public interface IEvents
    {
        object SaveEvent(RegisterEvents obj);
        object UpdateEvent(RegisterEvents obj);
        object DeleteEvent(RegisterEvents obj);
        List<RegisterEvents> GetEvents(RegisterEvents obj);
        List<RegisterEvents> GetEventsShow();

    }
}