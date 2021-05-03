using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.DTOs.Admin.KhachHang;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly KhachHangService KHservice;
        public KhachHangController(KhachHangService KHservice){
            this.KHservice = KHservice;
        }
        [HttpGet]
        public IEnumerable<KhachHangDto> GetKHDtos()
        {
            return KHservice.KhachHang_GetAll();
        }

        [HttpGet("{user}")]
        public KhachHangDto GetKHDto(string user)
        {
            return KHservice.KhachHang_GetByUser(user);
        }

        [HttpPost]
        public ActionResult<KhachHangDto> AddKHDto(KhachHangDto p)
        {
            KHservice.KhachHang_Add(p);

            return CreatedAtAction(nameof(GetKHDto), new { user = p.user }, p);
        }

        [HttpPut]
        public void UpdateKHDto([FromBody] KhachHangDto p)
        {
            KHservice.KhachHang_Update(p);
        }

        [HttpDelete("{user}")]
        public void DeleteKHDto(string user)
        {
            KHservice.KhachHang_Remove(user);
        }

        // Các phần cho các trang đặc biệt
        [HttpPost("register")]
        public ActionResult<KhachHangDto> AddKHDto_Register(KhachHangDto p)
        {
            KHservice.KhachHang_Add(p);

            // Ẩn thông tin khách hàng
            p.pass = "";
            p.phone = "";
            p.address = "";
            p.mail = "";
            p.address = "";
            p.dateborn = new DateTime();
            p.status = -1;

            return CreatedAtAction(nameof(GetKHDto), new { user = p.user }, p);
        }

        [HttpPost("login")]
        public ActionResult<TaiKhoanDto> Login(TaiKhoanDto p)
        {
            KhachHangDto kh = KHservice.KhachHang_GetByUser(p.user);
            if(kh == null) {
                return null;
            }

            if(kh.pass != p.password) {
                return null;
            }
            // Ẩn thông tin khách hàng
            kh.pass = "";
            kh.phone = "";
            kh.address = "";
            kh.mail = "";
            kh.address = "";
            kh.dateborn = new DateTime();
            kh.status = -1;
            return CreatedAtAction(nameof(GetKHDto), new { user = kh.user }, kh);
        }

        // Tìm kiếm bên admin khách hàng
        [HttpPost("manager_khsearch")]
        public IEnumerable<KhachHangDto> TimKiem(KhachHang_SearchDto q){
            if(String.IsNullOrEmpty(q.input)){
                q.input = "";
            }
            return KHservice.KhachHang_AdminTimKiem(q.type, q.input);
        }
    }
}