using System.ComponentModel.DataAnnotations;

namespace librarycore.Models
{
    public class Persona
    {
        [Key]
        public int Id { get; set; } 
        public string Nombre { get; set; }
        public string Apellidos { get; set; }

    }
}
