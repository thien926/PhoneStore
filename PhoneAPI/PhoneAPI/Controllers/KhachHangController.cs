using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
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
    }
}