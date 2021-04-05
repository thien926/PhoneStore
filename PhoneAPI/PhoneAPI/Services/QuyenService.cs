using System.Collections.Generic;
using PhoneAPI.DTOs;
using PhoneAPI.Interfaces;
using PhoneAPI.Mappings;

namespace PhoneAPI.Services
{
    public class QuyenService
    {
        private readonly IQuyenEFContext Qcontext;
        public QuyenService(IQuyenEFContext Qcontext){
            this.Qcontext = Qcontext;
        }
        public IEnumerable<QuyenDto> Quyen_GetAll(){
            var q = Qcontext.Quyen_GetAll();
            return q.MappingQuyenDtos();
        }

        public QuyenDto Quyen_GetById(int id){
            var q = Qcontext.Quyen_GetById(id);
            if(q == null) return null;
            return q.MappingQuyenDto();
        }

        public void Quyen_Add(QuyenDto Qdto){
            var q = Qdto.MappingQuyen();
            Qcontext.Quyen_Add(q);
        }

        public void Quyen_Update(QuyenDto Qdto){
            var q = Qcontext.Quyen_GetById(Qdto.permission_id);
            if(q == null) return;
            Qdto.MappingQuyen(q);
            Qcontext.Quyen_Update(q);
        }

        public void Quyen_Remove(int permission_id){
            var q = Qcontext.Quyen_GetById(permission_id);
            if(q == null) return;
            Qcontext.Quyen_Remove(q);
        }
    }
}