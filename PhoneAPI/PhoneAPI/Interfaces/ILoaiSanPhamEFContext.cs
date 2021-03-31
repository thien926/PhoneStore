using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface ILoaiSanPhamEFContext
    {
        List<LoaiSanPham> LoaiSanPham_GetAll();
        LoaiSanPham LoaiSanPham_GetById(int id);
        void LoaiSanPham_Add(LoaiSanPham LSP);
        void LoaiSanPham_Update(LoaiSanPham LSP);
        void LoaiSanPham_Remove(LoaiSanPham LSP);
    }
}