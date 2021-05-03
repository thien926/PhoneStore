using System.Collections.Generic;
using PhoneAPI.Models;

namespace PhoneAPI.Interfaces
{
    public interface IQuyenEFContext
    {
        IEnumerable<Quyen> Quyen_GetAll();
        Quyen Quyen_GetById(int id);
        void Quyen_Add(Quyen q);
        void Quyen_Update(Quyen q);
        void Quyen_Remove(Quyen q);
        IEnumerable<Quyen> Quyen_AdminTimKiem(string type, string input);
    }
}