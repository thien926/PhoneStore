using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Interfaces;
using PhoneAPI.Mappings;

namespace PhoneAPI.Services
{
    public class SanPhamService
    {
        private readonly ISanPhamEFContext SPcontext;
        public SanPhamService(ISanPhamEFContext SPcontext){
            this.SPcontext = SPcontext;
        }
        public IEnumerable<SanPhamDto> SanPham_GetAll(){
            var sps = SPcontext.SanPham_GetAll();
            return sps.MappingSanPhamDtos();
        }

        public SanPhamDto SanPham_GetById(int id){
            var sp = SPcontext.SanPham_GetById(id);
            if(sp == null) return null;
            return sp.MappingSanPhamDto();
        }

        public void SanPham_Add(SanPhamDto SPdto){
            var sp = SPdto.MappingSanPham();
            SPcontext.SanPham_Add(sp);
        }

        public void SanPham_Update(SanPhamDto SPdto){
            var sp = SPcontext.SanPham_GetById(SPdto.product_id);
            if(sp == null) return;
            SPdto.MappingSanPham(sp);
            SPcontext.SanPham_Update(sp);
        }

        public void SanPham_Remove(int product_id){
            var sp = SPcontext.SanPham_GetById(product_id);
            if(sp == null) return;
            SPcontext.SanPham_Remove(sp);
        }

        public void SanPham_RemoveBy_Product_Type_Id(int product_type_id)
        {
            SPcontext.SanPham_RemoveBy_Product_Type_Id(product_type_id);
        }

        public IEnumerable<SanPhamDto> SanPham_Shop_GetAll(){
            var sps = SPcontext.SanPham_Shop_GetAll();
            return sps.MappingSanPhamDtos();
        }
    }
}