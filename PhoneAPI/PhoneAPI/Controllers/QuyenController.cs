using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.DTOs.Admin.Quyen;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuyenController : ControllerBase
    {
        private readonly QuyenService Qservice;
        public QuyenController(QuyenService Qservice)
        {
            this.Qservice = Qservice;
        }

        [HttpGet]
        public IEnumerable<QuyenDto> GetQDtos()
        {
            return Qservice.Quyen_GetAll();
        }

        [HttpGet("{id}")]
        public QuyenDto GetQDto(int id)
        {
            return Qservice.Quyen_GetById(id);
        }

        [HttpPost]
        public ActionResult<QuyenDto> AddQDto(QuyenDto q)
        {
            Qservice.Quyen_Add(q);

            return CreatedAtAction(nameof(GetQDto), new { id = q.permission_id }, q);
        }

        [HttpPut]
        public void UpdateQDto([FromBody] QuyenDto q)
        {
            Qservice.Quyen_Update(q);
        }

        [HttpDelete("{id}")]
        public void DeleteQDto(int id)
        {
            Qservice.Quyen_Remove(id);
        }
        // Tìm kiếm bên admin quyền
        [HttpPost("manager_qsearch")]
        public IEnumerable<QuyenDto> TimKiem(Quyen_SearchDto q){
            if(String.IsNullOrEmpty(q.input)){
                q.input = "";
            }
            return Qservice.Quyen_AdminTimKiem(q.type, q.input);
        }
    }
}