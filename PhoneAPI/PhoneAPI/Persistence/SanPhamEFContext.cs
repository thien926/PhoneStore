using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class SanPhamEFContext : ISanPhamEFContext
    {
        private readonly PhoneStoreDBContext context;
        public SanPhamEFContext(PhoneStoreDBContext context){
            this.context = context;
        }
        public void SanPham_Add(SanPham SP)
        {
            context.SanPhams.Add(SP);
            context.SaveChanges();
        }

        public IEnumerable<SanPham> SanPham_GetAll()
        {
            return context.SanPhams.ToList();
        }

        public SanPham SanPham_GetById(int id)
        {
            return context.SanPhams.Find(id);
        }

        public void SanPham_Remove(SanPham SP)
        {
            context.SanPhams.Remove(SP);
            context.SaveChanges();
        }

        public void SanPham_RemoveBy_Product_Type_Id(int product_type_id)
        {
            var query = context.SanPhams.AsQueryable();
            query = query.Where(m => m.product_type_id == product_type_id);
            context.SanPhams.RemoveRange(query.ToList());
            context.SaveChanges();
        }

        public IEnumerable<SanPham> SanPham_Shop_GetAll()
        {
            var query = context.SanPhams.AsQueryable();
            query = query.Where(m => m.status == 1);
            return query.ToList();
        }

        public void SanPham_Update(SanPham SP)
        {
            context.SanPhams.Update(SP);
            context.SaveChanges();
        }
    }
}