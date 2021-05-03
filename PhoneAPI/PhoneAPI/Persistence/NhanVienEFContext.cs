using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Interfaces;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class NhanVienEFContext : INhanVienEFContext
    {
        private readonly PhoneStoreDBContext context;
        public NhanVienEFContext(PhoneStoreDBContext context) {
            this.context = context;
        }
        public void NhanVien_Add(NhanVien NV)
        {
            context.NhanViens.Add(NV);
            context.SaveChanges();
        }

        public IEnumerable<NhanVien> NhanVien_GetAll()
        {
            return context.NhanViens.ToList();
        }

        public NhanVien NhanVien_GetByUser(string user)
        {
            return context.NhanViens.Find(user);
        }

        public void NhanVien_Remove(NhanVien NV)
        {
            context.NhanViens.Remove(NV);
            context.SaveChanges();
        }

        public void NhanVien_Update(NhanVien NV)
        {
            context.NhanViens.Update(NV);
            context.SaveChanges();
        }
        public IEnumerable<NhanVien> NhanVien_AdminTimKiem(string type, string input){
            var query = context.NhanViens.AsQueryable();
            switch(type){
                case "all": {
                    input = input.Trim().ToLower();
                    if(input == ""){
                        return NhanVien_GetAll();
                    }
                    query = query.Where(m => m.user.ToLower().Contains(input) || m.full_name.ToLower().Contains(input) ||
                    m.phone.ToLower().Contains(input) || m.mail.ToLower().Contains(input) || m.address.ToLower().Contains(input));
                    break;
                }
                case "user": {
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.user.ToLower().Contains(input));
                    break;
                }
                case "full_name": {
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.full_name.ToLower().Contains(input));
                    break;
                }
                case "phone":{
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.phone.ToLower().Contains(input));
                    break;
                }
                case "mail":{
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.mail.ToLower().Contains(input));
                    break;
                }
                case "address":{
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.address.ToLower().Contains(input));
                    break;
                }
                default: break;
            }
            return query.ToList();
        }
    }
}