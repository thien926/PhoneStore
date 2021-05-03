using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface IKhachHangEFContext
    {
        List<KhachHang> KhachHang_GetAll();
        KhachHang KhachHang_GetByUser(string user);
        void KhachHang_Add(KhachHang U);
        void KhachHang_Update(KhachHang U);
        void KhachHang_Remove(KhachHang U);
        IEnumerable<KhachHang> KhachHang_AdminTimKiem(string type, string input);
    }
}