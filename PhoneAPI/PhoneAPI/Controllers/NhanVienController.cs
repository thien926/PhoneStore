using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    public class NhanVienController : ControllerBase
    {
        private readonly NhanVienService Qservice;
        public NhanVienController(NhanVienService Qservice)
        {
            this.Qservice = Qservice;
        }

        [HttpGet]
        public IEnumerable<NhanVienDto> GetQDtos()
        {
            return Qservice.NhanVien_GetAll();
        }

        [HttpGet("{id}")]
        public NhanVienDto GetQDto(int id)
        {
            return Qservice.NhanVien_GetById(id);
        }

        [HttpPost]
        public ActionResult<NhanVienDto> AddQDto(NhanVienDto q)
        {
            Qservice.NhanVien_Add(q);

            return CreatedAtAction(nameof(GetQDto), new { id = q.permission_id }, q);
        }

        [HttpPut]
        public void UpdateQDto([FromBody] NhanVienDto q)
        {
            Qservice.NhanVien_Update(q);
        }

        [HttpDelete("{id}")]
        public void DeleteQDto(int id)
        {
            Qservice.NhanVien_Remove(id);
        }
    }
}