using System.Collections.Generic;
using PhoneAPI.Models;
namespace PhoneAPI.Interfaces
{
    public interface INhanVienEFContext
    {
        IEnumerable<NhanVien> NhanVien_GetAll();
        NhanVien NhanVien_GetByUser(string user);
        void NhanVien_Add(NhanVien q);
        void NhanVien_Update(NhanVien q);
        void NhanVien_Remove(NhanVien q);
    }
}