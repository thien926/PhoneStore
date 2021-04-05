using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class HoaDonEFContext : IHoaDonEFContext
    {
        private readonly PhoneStoreDBContext context;
        public HoaDonEFContext(PhoneStoreDBContext context) {
            this.context = context;
        }
        public void HoaDon_Add(HoaDon HD)
        {
            context.HoaDons.Add(HD);
            context.SaveChanges();
        }

        public IEnumerable<HoaDon> HoaDon_GetAll()
        {
            return context.HoaDons.ToList();
        }

        public HoaDon HoaDon_GetById(int id)
        {
            return context.HoaDons.Find(id);
        }

        public void HoaDon_Remove(HoaDon HD)
        {
            context.HoaDons.Remove(HD);
            context.SaveChanges();
        }

        public void HoaDon_Update(HoaDon HD)
        {
            context.HoaDons.Update(HD);
            context.SaveChanges();
        }
    }
}