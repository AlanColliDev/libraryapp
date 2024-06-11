using System.ComponentModel.DataAnnotations;

namespace librarycore.Models
{
    public class Editorial
    {
        [Key]
        [MaxLength(22)]
        public string Clave { get; set; }    
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
}
