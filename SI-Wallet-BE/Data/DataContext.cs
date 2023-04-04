global using Microsoft.EntityFrameworkCore;

namespace SIWallet.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=SITemplatesDB;Trusted_Connection=true;TrustServerCertificate=true;");
        }

        public DbSet<Template> Templates { get; set; }
    }
}
