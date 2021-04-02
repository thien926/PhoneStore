using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneAPI.DTOs
{
    public class NhanVienDto
    {
        public string user{get; set;}
        public string pass{get; set;}
        public string full_name{get; set;}
        public string phone{get; set;}
        public string mail{get; set;}
        public string address {get; set;}
        public string sex{get; set;}
        public DateTime dateborn{get; set;}
        public int permission_id {get; set;}
        public int status{get; set;}

        public NhanVienDto()
        {
            status = 1;
        }
        public NhanVienDto(string user, string pass, string full_name, string phone, string mail,
        string address, string sex, DateTime dateborn, int permission_id, int status)
        {
            this.user = user;
            this.pass = pass;
            this.full_name = full_name;
            this.phone = phone;
            this.mail = mail;
            this.address = address;
            this.sex = sex;
            this.dateborn = dateborn;
            this.permission_id = permission_id;
            this.status = status;
        }
    }
}