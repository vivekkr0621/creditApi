using creditDataBase.SQLConnection;
using Microsoft.EntityFrameworkCore;
using creditService.Helper;
using System;

var builder = WebApplication.CreateBuilder(args);


// Get connection string from config
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Optional: only if you're using cookies or auth headers
        });
});

// Register AppDbContext
builder.Services.AddDbContext<SqlDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")),
        b => b.MigrationsAssembly("creditDataBase")  // <--- specify migrations assembly here
    ));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register your services here
ServiceRegister.RegisterServices(builder.Services);

var app = builder.Build();


// Use CORS
app.UseCors("AllowAngularApp");

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
