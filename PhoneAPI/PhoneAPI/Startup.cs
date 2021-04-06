using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PhoneAPI.Interfaces;
using PhoneAPI.Persistence;
using PhoneAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Thiện
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });

            // Thêm dịch vụ Session
            // services.AddSession();

            services.AddControllers();

            // Thiện
            services.AddDbContext<PhoneStoreDBContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("Default")));

            services.AddScoped<IKhachHangEFContext, KhachHangEFContext>();
            services.AddScoped<KhachHangService>();
            services.AddScoped<ILoaiSanPhamEFContext, LoaiSanPhamEFContext>();
            services.AddScoped<LoaiSanPhamService>();
            services.AddScoped<ISanPhamEFContext, SanPhamEFContext>();
            services.AddScoped<SanPhamService>();
            services.AddScoped<IQuyenEFContext, QuyenEFContext>();
            services.AddScoped<QuyenService>();
            services.AddScoped<IHoaDonEFContext, HoaDonEFContext>();
            services.AddScoped<HoaDonService>();
            services.AddScoped<IChiTietHDEFContext, ChiTietHDEFContext>();
            services.AddScoped<ChiTietHDService>();
            services.AddScoped<INhanVienEFContext, NhanVienEFContext>();
            services.AddScoped<NhanVienService>();            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // Thiện
            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            
            //  Sử dụng service Session
            // app.UseSession();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
