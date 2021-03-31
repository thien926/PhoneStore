using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Models;

namespace PhoneAPI.Mappings
{
    public static class MappingKhachHangProfile
    {
        public static KhachHangDto MappingKhachHangDto(this KhachHang khachhang){
            return new KhachHangDto{
                user = khachhang.user,
                pass = khachhang.pass,
                full_name = khachhang.full_name,
                phone = khachhang.phone,
                mail = khachhang.mail,
                address = khachhang.address,
                sex = khachhang.sex,
                dateborn = khachhang.dateborn,
                status = khachhang.status
            };
        }

        public static KhachHang MappingKhachHang(this KhachHangDto khachhangdto){
            return new KhachHang{
                user = khachhangdto.user,
                pass = khachhangdto.pass,
                full_name = khachhangdto.full_name,
                phone = khachhangdto.phone,
                mail = khachhangdto.mail,
                address = khachhangdto.address,
                sex = khachhangdto.sex,
                dateborn = khachhangdto.dateborn,
                status = khachhangdto.status
            };
        }

        public static void MappingKhachHang(this KhachHangDto khachhangdto, KhachHang khachhang){
            // khachhang.user = khachhangdto.user;
            khachhang.pass = khachhangdto.pass;
            khachhang.full_name = khachhangdto.full_name;
            khachhang.phone = khachhangdto.phone;
            khachhang.mail = khachhangdto.mail;
            khachhang.address = khachhangdto.address;
            khachhang.sex = khachhangdto.sex;
            khachhang.dateborn = khachhangdto.dateborn;
            khachhang.status = khachhangdto.status;
        }

        public static IEnumerable<KhachHangDto> MappingKhachHangDtos(this IEnumerable<KhachHang> khachhangs){
            foreach(var khachhang in khachhangs){
                yield return khachhang.MappingKhachHangDto();
            }
        }
    }
}