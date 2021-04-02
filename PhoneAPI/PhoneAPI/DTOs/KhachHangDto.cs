using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneAPI.DTOs
{
    public class KhachHangDto
    {
        public string user{get; set;}
        public string pass{get; set;}
        public string full_name{get; set;}
        public string phone{get; set;}
        public string mail{get; set;}
        public string address {get; set;}
        public string sex{get; set;}
        public DateTime dateborn{get; set;}
        public int status{get; set;}

        public KhachHangDto()
        {
            status = 1;
        }

        public KhachHangDto(string user, string pass, string full_name, string phone, string mail,
        string address, string sex, DateTime dateborn, int status){
            this.user = user;
            this.pass = pass;
            this.full_name = full_name;
            this.phone = phone;
            this.mail = mail;
            this.address = address;
            this.sex = sex;
            this.dateborn = dateborn;
            this.status = status;
        }
    }
}