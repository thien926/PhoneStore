using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface ISanPhamEFContext
    {
        IEnumerable<SanPham> SanPham_GetAll();
        IEnumerable<SanPham> SanPham_Shop_GetAll();
        SanPham SanPham_GetById(int id);
        void SanPham_Add(SanPham SP);
        void SanPham_Update(SanPham SP);
        void SanPham_Remove(SanPham SP);
        void SanPham_RemoveBy_Product_Type_Id(int product_type_id);
    }
}