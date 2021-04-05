using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class QuyenEFContext : IQuyenEFContext
    {
        private readonly PhoneStoreDBContext context;
        public QuyenEFContext(PhoneStoreDBContext context) {
            this.context = context;
        }
        public void Quyen_Add(Quyen LSP)
        {
            context.Quyens.Add(LSP);
            context.SaveChanges();
        }

        public IEnumerable<Quyen> Quyen_GetAll()
        {
            return context.Quyens.ToList();
        }

        public Quyen Quyen_GetById(int id)
        {
            return context.Quyens.Find(id);
        }

        public void Quyen_Remove(Quyen LSP)
        {
            context.Quyens.Remove(LSP);
            context.SaveChanges();
        }

        public void Quyen_Update(Quyen LSP)
        {
            context.Quyens.Update(LSP);
            context.SaveChanges();
        }
    }
}