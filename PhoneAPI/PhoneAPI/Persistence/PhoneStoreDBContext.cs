using Microsoft.EntityFrameworkCore;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class PhoneStoreDBContext : DbContext
    {
        public PhoneStoreDBContext(DbContextOptions<PhoneStoreDBContext> options) : base(options) {}

        public DbSet<KhachHang> KhachHangs { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<LoaiSanPham> LoaiSanPhams { get; set; }
        public DbSet<HoaDon> HoaDons{get;set;}
        public DbSet<ChiTietHD> ChiTietHDs{get;set;}
        public DbSet<Quyen> Quyens{get;set;}
        public DbSet<NhanVien> NhanViens{get;set;} 
        // public DbSet<NhanVien> NhanViens{get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChiTietHD>()
                .HasKey(o => new { o.bill_id, o.product_id });
        }
    }
}