using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Models;

namespace PhoneAPI.Mappings
{
    public static class MappingChiTietHDProfile
    {
        public static ChiTietHDDto MappingChiTietHDDto(this ChiTietHD cthd){
            return new ChiTietHDDto{
                bill_id = cthd.bill_id,
                product_id = cthd.product_id,
                name = cthd.name,
                amount = cthd.amount,
                price = cthd.price,
                img = cthd.img,
                product_type_id =cthd.product_type_id,
                description =cthd.description,
                status =cthd.status,
            };
        }
        public static ChiTietHD MappingChiTietHD(this ChiTietHDDto cthddto){
            return new ChiTietHD{
                bill_id = cthddto.bill_id,
                product_id = cthddto.product_id,
                name = cthddto.name,
                amount = cthddto.amount,
                price = cthddto.price,
                img = cthddto.img,
                product_type_id =cthddto.product_type_id,
                description =cthddto.description,
                status =cthddto.status,
            };
        }
        public static void MappingChiTietHD(this ChiTietHDDto cthddto, ChiTietHD cthd){
            // q.permission_id = cthddto.permission_id;
            cthd.name = cthddto.name;
            cthd.amount = cthddto.amount;
            cthd.price = cthddto.price;
            cthd.img = cthddto.img;
            cthd.product_type_id =cthddto.product_type_id;
            cthd.description =cthddto.description;
            cthd.status =cthddto.status;
        }

        public static IEnumerable<ChiTietHDDto> MappingChiTietHDDtos(this IEnumerable<ChiTietHD> cthds){
            foreach(var cthd in cthds){
                yield return cthd.MappingChiTietHDDto();
            }
        }
    }
}