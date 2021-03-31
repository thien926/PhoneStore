using Microsoft.EntityFrameworkCore;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class PhoneStoreDBContext : DbContext
    {
        public PhoneStoreDBContext(DbContextOptions<PhoneStoreDBContext> options) : base(options) {}

        public DbSet<KhachHang> KhachHangs { get; set; }
    }
}