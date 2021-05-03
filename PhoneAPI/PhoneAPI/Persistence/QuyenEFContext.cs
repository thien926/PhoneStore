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
        public IEnumerable<Quyen> Quyen_AdminTimKiem(string type, string input){
            var query = context.Quyens.AsQueryable();
            switch(type){
                case "all": {
                    input = input.Trim().ToLower();
                    if(input == ""){
                        return Quyen_GetAll();
                    }
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.permission_id == ip || m.name.ToLower().Contains(input) ||
                        m.details.ToLower().Contains(input));
                    }
                    else{
                        query = query.Where(m => m.name.ToLower().Contains(input) || m.details.ToLower().Contains(input));
                    }
                    break;
                }
                case "permission_id": {
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.permission_id == ip);
                    }
                    else{
                        return new List<Quyen>();
                    }
                    break;
                }
                case "name": {
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.name.ToLower().Contains(input));
                    break;
                }
                case "details": {
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.details.ToLower().Contains(input));
                    break;
                }
                default: break;
            }
            return query.ToList();
        }
    }
}