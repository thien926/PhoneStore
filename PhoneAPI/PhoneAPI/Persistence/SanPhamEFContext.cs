using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public void SanPham_Update_Status_By_Product_type_id(int product_type_id, int status)
        {
            var query = context.SanPhams.AsQueryable();
            query = query.Where(m => m.product_type_id == product_type_id);
            foreach (var item in query.ToList())
            {
                item.status = status;
            }
            context.SanPhams.UpdateRange(query.ToList());
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

        public int SanPham_MaxProduct_Id(){
            IEnumerable<SanPham> ListSP = SanPham_GetAll();
            int maxproduct_id = 0;
            foreach(var q in ListSP){
                if(maxproduct_id <= q.product_id){
                    maxproduct_id = q.product_id;
                }
            }
            return maxproduct_id;
        }

        public IEnumerable<SanPham> SanPham_ListCart(string list) {
            var query = context.SanPhams.AsQueryable();
            if(!string.IsNullOrEmpty(list)) {
                List<int> listProduct_id = new List<int>();
                List<int> listSoluong = new List<int>();
                list = list.Trim('&');
                string[] arrlist = list.Split('&');
                string[] temp;
                int i = 0;
                for(i = 0; i < arrlist.Length-1; ++i) {
                    if(!string.IsNullOrEmpty(arrlist[i])) {
                        temp = arrlist[i].Split('-');
                        if(!string.IsNullOrEmpty(temp[0])) {
                            listProduct_id.Add(int.Parse(temp[0]));
                            listSoluong.Add(int.Parse(temp[1]));
                        }
                    }
                }

                if(!string.IsNullOrEmpty(arrlist[i])) {
                    temp = arrlist[i].Split('-');
                    if(!string.IsNullOrEmpty(temp[0])) {
                        listProduct_id.Add(int.Parse(temp[0]));
                        listSoluong.Add(int.Parse(temp[1]));
                    }
                }

                query = query.Where(m => listProduct_id.Contains(m.product_id));
                int index = 0;
                foreach(var q in listProduct_id) {
                    foreach(var qq in query) {
                        if(q == qq.product_id) {
                            qq.amount = listSoluong[index];
                        }
                    }
                    ++index;
                }
            }

            return query.ToList();
        }
        public IEnumerable<SanPham> TenSPChay(){
            var query = context.SanPhams.AsQueryable();
            int pageIndex = 1;
            int pageSize = 10;
            query = query.OrderBy(m => m.amount);
            return query.Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();
        }

        public IEnumerable<SanPham> TenSPNoi(){
            var query = context.SanPhams.AsQueryable();
            int pageIndex = 1;
            int pageSize = 10;
            query = query.OrderBy(m => (int?)m.price);
            return query.Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();
        }

        public IEnumerable<SanPham> SanPhams_AdminTimKiem(string type, string input){
            var query = context.SanPhams.AsQueryable();
            switch(type){
                case "all": {
                    input = input.Trim().ToLower();
                    if(input == ""){
                        return SanPham_GetAll();
                    }
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.product_id == ip || m.name.ToLower().Contains(input) ||
                        m.product_type_id == ip || m.price == ip);
                    }
                    else{
                        query = query.Where(m => m.name.ToLower().Contains(input));
                    }
                    break;
                }
                case "product_id": {
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.product_id == ip);
                    }
                    else{
                        return new List<SanPham>();
                    }
                    break;
                }
                case "name": {
                    input = input.Trim().ToLower();
                    query = query.Where(m => m.name.ToLower().Contains(input));
                    break;
                }
                case "product_type_id":{
                    int ip; bool success = int.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.product_type_id == ip);
                    }
                    else{
                        return new List<SanPham>();
                    }
                    break;
                }
                case "price":{
                    long ip; bool success = long.TryParse(input,out ip);
                    if(success){
                        query = query.Where(m => m.price == ip);
                    }
                    break;
                }
                default: break;
            }
            return query.ToList();
        }
    }
}