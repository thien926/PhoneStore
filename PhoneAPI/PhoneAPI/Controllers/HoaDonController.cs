using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly HoaDonService HDservice;
        public HoaDonController(HoaDonService HDservice)
        {
            this.HDservice = HDservice;
        }

        [HttpGet]
        public IEnumerable<HoaDonDto> GetQDtos()
        {
            return HDservice.HoaDon_GetAll();
        }

        [HttpGet("{id}")]
        public HoaDonDto GetQDto(int id)
        {
            return HDservice.HoaDon_GetById(id);
        }

        [HttpPost]
        public ActionResult<HoaDonDto> AddQDto(HoaDonDto q)
        {
            HDservice.HoaDon_Add(q);

            return CreatedAtAction(nameof(GetQDto), new { id = q.bill_id }, q);
        }

        [HttpPut]
        public void UpdateQDto([FromBody] HoaDonDto q)
        {
            HDservice.HoaDon_Update(q);
        }

        [HttpDelete("{id}")]
        public void DeleteQDto(int id)
        {
            HDservice.HoaDon_Remove(id);
        }
    }
}