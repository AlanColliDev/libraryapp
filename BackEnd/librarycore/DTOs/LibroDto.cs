using librarycore.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace librarycore.DTOs
{
    public class LibroDto
    {
        public string Isbn { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public int Stock { get; set; }
        public string Categoria { get; set; }
        public string Autor { get; set; }

    }
}
