using System.ComponentModel.DataAnnotations;

namespace librarycore.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }
        
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
}
