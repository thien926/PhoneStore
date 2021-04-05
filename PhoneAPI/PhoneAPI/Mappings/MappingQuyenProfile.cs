using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Models;

namespace PhoneAPI.Mappings
{
    public static class MappingQuyenProfile
    {
        public static QuyenDto MappingQuyenDto(this Quyen q){
            return new QuyenDto{
                permission_id = q.permission_id,
                name = q.name,
                details = q.details
            };
        }
        public static Quyen MappingQuyen(this QuyenDto qdto){
            return new Quyen{
                permission_id = qdto.permission_id,
                name = qdto.name,
                details = qdto.details
            };
        }
        public static void MappingQuyen(this QuyenDto qdto, Quyen q){
            // q.permission_id = qdto.permission_id;
            q.name = qdto.name;
            q.details = qdto.details;
        }

        public static IEnumerable<QuyenDto> MappingQuyenDtos(this IEnumerable<Quyen> qs){
            foreach(var q in qs){
                yield return q.MappingQuyenDto();
            }
        }
    }
}