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
        public int HoaDon_GetMaxId(){
            return context.HoaDons.Max(m => m.bill_id);
        }
        public IEnumerable<HoaDon> HoaDon_Manager_TimKiem(string type, string input, int status) {
            var query = context.HoaDons.AsQueryable();
            switch(type){
                case "all": {
                    if (!string.IsNullOrEmpty(input)) {
                        input = input.Trim().ToLower();
                    }
                    else
                    {
                        if (status == 0)
                        {
                            return HoaDon_GetAll();
                        }
                        else
                        {
                            query = query.Where(m => m.status == status);
                            return query.ToList();
                        }
                    }
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        if(status == 0){
                            query = query.Where(m => m.bill_id == ip || m.user_kh.ToLower().Contains(input) || 
                            m.user_nv.ToLower().Contains(input));
                        }
                        else{
                            query = query.Where(m => (m.bill_id == ip || m.user_kh.ToLower().Contains(input) || 
                            m.user_nv.ToLower().Contains(input)) && m.status == status);
                            return query.ToList();
                        }
                    }
                    else{
                        if(status == 0){
                            query = query.Where(m => m.user_kh.ToLower().Contains(input) || 
                            m.user_nv.ToLower().Contains(input));
                        }
                        else{
                            query = query.Where(m => (m.user_kh.ToLower().Contains(input) || 
                            m.user_nv.ToLower().Contains(input)) && m.status == status);
                            return query.ToList();
                        }
                    }
                    break;
                }
                case "bill_id": {
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        if(status == 0){
                            query = query.Where(m => m.bill_id == ip);
                        }
                        else{
                            query = query.Where(m => m.bill_id == ip && m.status == status);
                        }
                    }
                    else{
                        return new List<HoaDon>();
                    }
                    break;
                }
                case "user_kh": {
                    input = input.Trim().ToLower();
                    if(status == 0){
                        query = query.Where(m => m.user_kh.ToLower().Contains(input));
                    }
                    else{
                        query = query.Where(m => m.user_kh.ToLower().Contains(input) && m.status == status);
                    }
                    break;
                }
                case "user_nv":{
                    input = input.Trim().ToLower();
                    if(status == 0){
                        query = query.Where(m => m.user_nv.ToLower().Contains(input));
                    }
                    else{
                        query = query.Where(m => m.user_nv.ToLower().Contains(input) && m.status == status);
                    }
                    break;
                }
                default: break;
            }
            return query.ToList();
        }
    }
}