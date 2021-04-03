using System;
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

        public IEnumerable<SanPham> SanPham_Filter(string Type, string qSearch, string price, string sort, int pageIndex, int pageSize, out int count, out decimal pricemax) {
            var query = context.SanPhams.AsQueryable();

            // Lấy dữ liệu loại sản phẩm
            if(!string.IsNullOrEmpty(Type)) {
                int type = int.Parse(Type);
                query = query.Where(m => m.product_type_id == type);
            }
            else {
                // Lấy dữ liệu từ khóa tìm kiếm
                if(!string.IsNullOrEmpty(qSearch)) {
                    qSearch = qSearch.ToLower();
                    query = query.Where(m => m.name.ToLower().Contains(qSearch));
                }
            }

            // Lấy dữ liệu theo giá
            if(!string.IsNullOrEmpty(price)) {
                string[] arrprice = price.Split('-');
                long pricefrom = 0;
                long priceto = 0;
                if(arrprice[0] != "" && arrprice[0] != null) {
                    if(arrprice[1] != "" && arrprice[1] != null) {
                        pricefrom = long.Parse(arrprice[0]);
                        priceto = long.Parse(arrprice[1]);
                        query = query.Where(m => m.price >= pricefrom && m.price <= priceto);
                    }
                    else {
                        pricefrom = long.Parse(arrprice[0]);
                        query = query.Where(m => m.price >= pricefrom);
                    }
                }
                else {
                    if(arrprice[1] != "" && arrprice[1] != null) {
                        pricefrom = 0;
                        priceto = long.Parse(arrprice[1]);
                        query = query.Where(m => m.price >= pricefrom && m.price <= priceto);
                    }
                    else {
                        pricefrom = 0;
                        query = query.Where(m => m.price >= pricefrom);
                    }
                }
                
            }

            query = query.Where(m => m.status == 1);
            count = query.Count();
            pricemax = SanPham_MaxPrice();

            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "name-asc": query = query.OrderBy(m => m.name);
                                    break;
                    case "name-desc": query = query.OrderByDescending(m => m.name);
                                    break;
                    case "price-asc": query = query.OrderBy(m => (int?)m.price);
                                    break;
                    case "price-desc": query = query.OrderByDescending(m => (int?)m.price);
                                    break;
                    default: break;
                }
            }

            int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            if(pageIndex > TotalPages){
                pageIndex = TotalPages;
            }
            if(pageIndex < 1){
                pageIndex = 1;
            }

            return query.Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();
        }

        public decimal SanPham_MaxPrice(){
            IEnumerable<SanPham> ListSP = SanPham_GetAll();
            decimal maxprice = 0;
            foreach(var q in ListSP){
                if(maxprice <= q.price){
                    maxprice = q.price;
                }
            }
            return maxprice;
        }
    }
}