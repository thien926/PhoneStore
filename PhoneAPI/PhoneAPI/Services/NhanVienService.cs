using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Interfaces;
using PhoneAPI.Mappings;
namespace PhoneAPI.Services
{
    public class NhanVienService
    {
        private readonly INhanVienEFContext NVcontext;
        public NhanVienService(INhanVienEFContext NVcontext){
            this.NVcontext = NVcontext;
        }
        public IEnumerable<NhanVienDto> NhanVien_GetAll(){
            var q = NVcontext.NhanVien_GetAll();
            return q.MappingNhanVienDtos();
        }

        public NhanVienDto NhanVien_GetByUser(string user){
            var q = NVcontext.NhanVien_GetByUser(user);
            if(q == null) return null;
            return q.MappingNhanVienDto();
        }

        public void NhanVien_Add(NhanVienDto NVdto){
            var q = NVdto.MappingNhanVien();
            NVcontext.NhanVien_Add(q);
        }

        public void NhanVien_Update(NhanVienDto NVdto){
            var q = NVcontext.NhanVien_GetByUser(NVdto.user);
            if(q == null) return;
            NVdto.MappingNhanVien(q);
            NVcontext.NhanVien_Update(q);
        }

        public void NhanVien_Remove(string user){
            var q = NVcontext.NhanVien_GetByUser(user);
            if(q == null) return;
            NVcontext.NhanVien_Remove(q);
        }
    }
}