using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHDController : ControllerBase
    {
        private readonly ChiTietHDService CTHDservice;
        public ChiTietHDController(ChiTietHDService CTHDservice)
        {
            this.CTHDservice = CTHDservice;
        }

        [HttpGet]
        public IEnumerable<ChiTietHDDto> GetCTHDDtos()
        {
            return CTHDservice.ChiTietHD_GetAll();
        }

        [HttpGet("{id}")]
        public ChiTietHDDto GetCTHDDto(int id)
        {
            return CTHDservice.ChiTietHD_GetById(id);
        }

        [HttpPost]
        public ActionResult<ChiTietHDDto> AddCTHDDto(ChiTietHDDto q)
        {
            CTHDservice.ChiTietHD_Add(q);

            return CreatedAtAction(nameof(GetCTHDDto), new { id = q.bill_id }, q);
        }

        [HttpPut]
        public void UpdateCTHDDto([FromBody] ChiTietHDDto q)
        {
            CTHDservice.ChiTietHD_Update(q);
        }

        [HttpDelete("{id}")]
        public void DeleteCTHDDto(int id)
        {
            CTHDservice.ChiTietHD_Remove(id);
        }
    }
}