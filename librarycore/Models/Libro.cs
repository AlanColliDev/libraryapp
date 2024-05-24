using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace librarycore.Models
{
    public class Libro
    {
        [Key]
        [MaxLength(22)]
        public string Isbn { get; set; }    
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }  
        public int Stock { get; set; }  
        public int CategoriaId { get; set; }
        public int AutorId { get; set; }

        [ForeignKey("AutorId")]
        public virtual Autor Autor { get; set; }
        [ForeignKey("CategoriaId")]
        public virtual Categoria Categoria { get; set; }
    }
}
