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
        IEnumerable<SanPham> SanPham_Filter(string Type, string qSearch, string price, string sort, int pageIndex, int pageSize, out int count, out decimal pricemax);
        IEnumerable<SanPham> TenSPChay();
        IEnumerable<SanPham> TenSPNoi();
        IEnumerable<SanPham> SanPham_ListCart(string list);
    }
}