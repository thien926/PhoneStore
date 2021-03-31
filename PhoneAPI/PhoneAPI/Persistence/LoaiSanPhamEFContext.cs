using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class LoaiSanPhamEFContext : ILoaiSanPhamEFContext
    {
        private readonly PhoneStoreDBContext context;
        public LoaiSanPhamEFContext(PhoneStoreDBContext context) {
            this.context = context;
        }
        public void LoaiSanPham_Add(LoaiSanPham LSP)
        {
            context.LoaiSanPhams.Add(LSP);
            context.SaveChanges();
        }

        public List<LoaiSanPham> LoaiSanPham_GetAll()
        {
            return context.LoaiSanPhams.ToList();
        }

        public LoaiSanPham LoaiSanPham_GetById(int id)
        {
            return context.LoaiSanPhams.Find(id);
        }

        public void LoaiSanPham_Remove(LoaiSanPham LSP)
        {
            context.LoaiSanPhams.Remove(LSP);
            context.SaveChanges();
        }

        public void LoaiSanPham_Update(LoaiSanPham LSP)
        {
            context.LoaiSanPhams.Update(LSP);
            context.SaveChanges();
        }
    }
}