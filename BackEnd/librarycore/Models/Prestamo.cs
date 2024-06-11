using System.ComponentModel.DataAnnotations.Schema;

namespace librarycore.Models
{
    public class Prestamo
    {
        public int Id { get; set; } 
        public string NombrePrestamista { get; set; }    
        public string Telefono { get; set; }
        public DateTime FechaPrestamo { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public string Observacion { get; set; }
        public string Isbn { get; set; }
        public string Estatus { get; set; }

        [ForeignKey("Isbn")]
        public virtual Libro Libro { get; set; }
    }
}
