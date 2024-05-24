using System.ComponentModel.DataAnnotations;

namespace librarycore.Models
{
    public class Autor
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
