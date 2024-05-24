
using librarycore.Models;
using Microsoft.EntityFrameworkCore;

namespace librarycore.Database
{
    public class LibraryContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "LibraryDb");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de datos por defecto
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Literatura", Descripcion = "Dec lit" },
                new Categoria { Id = 2, Nombre = "Terror", Descripcion = "Desc Terr"},
                new Categoria { Id = 3, Nombre = "Fantasía" , Descripcion = "Desc Fant" }
            );
            
            modelBuilder.Entity<Autor>().HasData(
               new Autor { Id = 1, Nombre = "José Madero" },
               new Autor { Id = 2, Nombre = "Stephen King" },
               new Autor { Id = 3, Nombre = "Martín Lutero" }
           );

        }

        public void EnsureSeedData() => this.Database.EnsureCreated();

        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Editorial> Editorial { get; set; }
        public DbSet<Persona> Persona { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Autor> Autor { get; set; }
        public DbSet<Libro> Libro { get; set; }

    }
}
