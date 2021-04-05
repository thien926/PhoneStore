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

        public ChiTietHDDto ChiTietHD_GetById(int id){
            var hd = CTHDcontext.ChiTietHD_GetById(id);
            if(hd == null) return null;
            return hd.MappingChiTietHDDto();
        }

        public void ChiTietHD_Add(ChiTietHDDto hddto){
            var cthd = hddto.MappingChiTietHD();
            CTHDcontext.ChiTietHD_Add(cthd);
        }

        public void ChiTietHD_Update(ChiTietHDDto hddto){
            var cthd = CTHDcontext.ChiTietHD_GetById(hddto.bill_id);
            if(cthd == null) return;
            hddto.MappingChiTietHD(cthd);
            CTHDcontext.ChiTietHD_Update(cthd);
        }

        public void ChiTietHD_Remove(int bill_id){
            var hd = CTHDcontext.ChiTietHD_GetById(bill_id);
            if(hd == null) return;
            CTHDcontext.ChiTietHD_Remove(hd);
        }
    }
}