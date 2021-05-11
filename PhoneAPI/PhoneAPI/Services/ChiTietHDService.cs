using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Interfaces;
using PhoneAPI.Mappings;
namespace PhoneAPI.Services
{
    public class ChiTietHDService
    {
        private readonly IChiTietHDEFContext CTHDcontext;
        public ChiTietHDService(IChiTietHDEFContext CTHDcontext){
            this.CTHDcontext = CTHDcontext;
        }
        public IEnumerable<ChiTietHDDto> ChiTietHD_GetAll(){
            var hd = CTHDcontext.ChiTietHD_GetAll();
            return hd.MappingChiTietHDDtos();
        }

        public IEnumerable<ChiTietHDDto> ChiTietHD_GetByBill_Id(int bill_id){
            var hd = CTHDcontext.ChiTietHD_GetByBill_Id(bill_id);
            if(hd == null) return null;
            return hd.MappingChiTietHDDtos();
        }

        public void ChiTietHD_Add(ChiTietHDDto hddto){
            var cthd = hddto.MappingChiTietHD();
            CTHDcontext.ChiTietHD_Add(cthd);
        }

        public void ChiTietHD_AddRange(IEnumerable<ChiTietHDDto> cthddtos){
            var cthds = cthddtos.MappingChiTietHDs();
            CTHDcontext.ChiTietHD_AddRange(cthds);
        }
    }
}