namespace librarycore.DTOs
{
    public class PrestamoDto
    {
        public int Id { get; set; } 
        public string NombrePrestamista { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaPrestamo { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public string Observacion { get; set; }
        public string Isbn { get; set; }
        public string Titulo { get; set; }
        public string Estatus { get; set; }
    }
}
