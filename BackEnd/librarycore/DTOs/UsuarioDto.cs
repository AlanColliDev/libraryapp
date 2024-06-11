namespace librarycore.DTOs
{
    public class UsuarioDto
    {
        
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UsuarioDtoResponse
    {
        public string Username { get; set; }
        public int Status { get; set; }
        public DateTime Logged { get; set; }
    }
}
