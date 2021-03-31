
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly KhachHangService KHservice;
        public LoginController(KhachHangService KHservice){
            this.KHservice = KHservice;
        }

        [HttpGet]
        public IEnumerable<KhachHangDto> GetUsers()
        {
            return KHservice.KhachHang_GetAll();
        }
        
        [HttpGet("{user}")]
        public KhachHangDto GetKhachHangDto(string user)
        {
            return KHservice.KhachHang_GetByUser(user);
        }

        [HttpPost]
        public ActionResult<TaiKhoanDto> Login(TaiKhoanDto p)
        {
            KhachHangDto kh = KHservice.KhachHang_GetByUser(p.user);
            if(kh == null) {
                return null;
            }

            if(kh.pass != p.password) {
                return null;
            }
            
            return CreatedAtAction(nameof(GetKhachHangDto), new { user = kh.user }, kh);
        }
    }
}