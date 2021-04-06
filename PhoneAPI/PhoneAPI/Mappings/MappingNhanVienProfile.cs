using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Models;

namespace PhoneAPI.Mappings
{
    public static class MappingNhanVienProfile
    {
        public static NhanVienDto MappingNhanVienDto(this NhanVien nv){
            return new NhanVienDto{    
                user = nv.user,
                pass = nv.pass,
                full_name = nv.full_name,
                phone = nv.phone,
                mail = nv.mail,
                address = nv.address,
                sex = nv.sex,
                dateborn = nv.dateborn,
                permission_id = nv.permission_id,
                status = nv.status,
            };
        }
        public static NhanVien MappingNhanVien(this NhanVienDto nvdto){
            return new NhanVien{
                user = nvdto.user,
                pass = nvdto.pass,
                full_name = nvdto.full_name,
                phone = nvdto.phone,
                mail = nvdto.mail,
                address = nvdto.address,
                sex = nvdto.sex,
                dateborn = nvdto.dateborn,
                permission_id = nvdto.permission_id,
                status = nvdto.status,
            };
        }
        public static void MappingNhanVien(this NhanVienDto nvdto, NhanVien nv){
            // q.permission_id = qdto.permission_id;
                nv.pass = nvdto.pass;
                nv.full_name = nvdto.full_name;
                nv.phone = nvdto.phone;
                nv.mail = nvdto.mail;
                nv.address = nvdto.address;
                nv.sex = nvdto.sex;
                nv.dateborn = nvdto.dateborn;
                nv.permission_id = nvdto.permission_id;
                nv.status = nvdto.status;
        }

        public static IEnumerable<NhanVienDto> MappingNhanVienDtos(this IEnumerable<NhanVien> nvs){
            foreach(var nv in nvs){
                yield return nv.MappingNhanVienDto();
            }
       }
    }
}