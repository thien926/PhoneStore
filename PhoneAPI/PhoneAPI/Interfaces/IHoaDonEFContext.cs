using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface IHoaDonEFContext
    {
        IEnumerable<HoaDon> HoaDon_GetAll();
        HoaDon HoaDon_GetById(int id);
        void HoaDon_Add(HoaDon hd);
        void HoaDon_Update(HoaDon hd);
        void HoaDon_Remove(HoaDon hd);
    }
}