using librarycore.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace librarycore.DTOs
{
    public class PrestamoInsertDto
    {
        public string NombrePrestamista { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaPrestamo { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public string Observacion { get; set; }
        public string Isbn { get; set; }
    }
}
