using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly NhanVienService NVservice;
        public NhanVienController(NhanVienService NVservice)
        {
            this.NVservice = NVservice;
        }

        [HttpGet]
        public IEnumerable<NhanVienDto> GetNVDtos()
        {
            return NVservice.NhanVien_GetAll();
        }

        [HttpGet("{user}")]
        public NhanVienDto GetNVDto(string user)
        {
            return NVservice.NhanVien_GetByUser(user);
        }

        [HttpPost]
        public ActionResult<NhanVienDto> AddNVDto(NhanVienDto q)
        {
            NVservice.NhanVien_Add(q);

            return CreatedAtAction(nameof(GetNVDto), new { user = q.user }, q);
        }

        [HttpPut]
        public void UpdateNVDto([FromBody] NhanVienDto q)
        {
            NVservice.NhanVien_Update(q);
        }

        [HttpDelete("{user}")]
        public void DeleteNVDto(string user)
        {
            NVservice.NhanVien_Remove(user);
        }

        // Đăng nhập admim
        [HttpPost("login-admin")]
        public ActionResult<NhanVienDto> Login(TaiKhoanDto p)
        {
            NhanVienDto nv = NVservice.NhanVien_GetByUser(p.user);
            if(nv == null) {
                return null;
            }

            if(nv.pass != p.password) {
                return null;
            }

            if(nv.status != 1) {
                return null;
            }
            // Ẩn thông tin nhân viên
            nv.pass = "";
            nv.phone = "";
            nv.address = "";
            nv.mail = "";
            nv.address = "";
            nv.dateborn = new DateTime();
            nv.status = -1;
            return nv;
        }
    }
}