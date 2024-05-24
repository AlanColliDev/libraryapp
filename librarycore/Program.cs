using librarycore.Database;
using librarycore.DTOs;
using librarycore.Repositories;
using librarycore.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//InMemory Database
builder.Services.AddDbContext<LibraryContext>();

//Agrego repositories reference
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
// Add services to the container.
builder.Services.AddKeyedScoped<ICommonService<LibroDto, LibroInsertDto, LibroUpdateDto>, LibroService>("libroService");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<LibraryContext>();
    dbContext.EnsureSeedData();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
