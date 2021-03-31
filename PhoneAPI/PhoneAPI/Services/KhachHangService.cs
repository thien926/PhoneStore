using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Interfaces;
using PhoneAPI.Mappings;

namespace PhoneAPI.Services
{
    public class KhachHangService
    {
        private readonly IKhachHangEFContext KHcontext;
        public KhachHangService(IKhachHangEFContext KHcontext){
            this.KHcontext = KHcontext;
        }
        public IEnumerable<KhachHangDto> KhachHang_GetAll(){
            var khs = KHcontext.KhachHang_GetAll();
            return khs.MappingKhachHangDtos();
        }
        public KhachHangDto KhachHang_GetByUser(string user){
            var kh = KHcontext.KhachHang_GetByUser(user);
            if(kh == null) return null;
            return kh.MappingKhachHangDto();
        }
        public void KhachHang_Add(KhachHangDto U){
            var kh = U.MappingKhachHang();
            KHcontext.KhachHang_Add(kh);
        }

        public void KhachHang_Update(KhachHangDto U){
            var kh = KHcontext.KhachHang_GetByUser(U.user);
            if(kh == null) return;
            U.MappingKhachHang(kh);
            KHcontext.KhachHang_Update(kh);
        }

        public void KhachHang_Remove(string user){
            var kh = KHcontext.KhachHang_GetByUser(user);
            if(kh == null) return;
            KHcontext.KhachHang_Remove(kh);
        }
    }
}