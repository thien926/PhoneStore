using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class ChiTietHDEFContext : IChiTietHDEFContext
    {
        private readonly PhoneStoreDBContext context;
        public ChiTietHDEFContext(PhoneStoreDBContext context) {
            this.context = context;
        }
        public void ChiTietHD_Add(ChiTietHD CTHD)
        {
            context.ChiTietHDs.Add(CTHD);
            context.SaveChanges();
        }

        public void ChiTietHD_AddRange(IEnumerable<ChiTietHD> list)
        {
            context.ChiTietHDs.AddRange(list);
            context.SaveChanges();
        }

        public IEnumerable<ChiTietHD> ChiTietHD_GetAll()
        {
            return context.ChiTietHDs.ToList();
        }

        public IEnumerable<ChiTietHD> ChiTietHD_GetByBill_Id(int bill_id)
        {
            var query = context.ChiTietHDs.AsQueryable();
            query = query.Where(m => m.bill_id == bill_id);
            return query.ToList();
        }

        public void ChiTietHD_Remove(ChiTietHD CTHD)
        {
            context.ChiTietHDs.Remove(CTHD);
            context.SaveChanges();
        }

        public void ChiTietHD_Update(ChiTietHD CTHD)
        {
            context.ChiTietHDs.Update(CTHD);
            context.SaveChanges();
        }
    }
}