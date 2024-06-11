namespace librarycore.DTOs
{
    public class LibroUpdateDto
    {
        public string Isbn { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public int Stock { get; set; }
        public int CategoriaId { get; set; }
        public int AutorId { get; set; }
    }
}
