using System.ComponentModel.DataAnnotations;

namespace librarycore.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; } 
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
