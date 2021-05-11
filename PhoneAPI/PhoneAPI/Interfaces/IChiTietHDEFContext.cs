using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface IChiTietHDEFContext
    {
         IEnumerable<ChiTietHD> ChiTietHD_GetAll();
        IEnumerable<ChiTietHD> ChiTietHD_GetByBill_Id(int id);
        void ChiTietHD_Add(ChiTietHD q);
        void ChiTietHD_Update(ChiTietHD q);
        void ChiTietHD_Remove(ChiTietHD q);
        void ChiTietHD_AddRange(IEnumerable<ChiTietHD> list);
    }
}