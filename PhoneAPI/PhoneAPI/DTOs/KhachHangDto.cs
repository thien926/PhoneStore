using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneAPI.DTOs
{
    public class KhachHangDto
    {
        [Key]
        [Required(ErrorMessage = "Tài khoản bắt buộc")]
        [StringLength(maximumLength:25, MinimumLength = 3, ErrorMessage = "Tên đăng nhập từ 3 đến 25 kí tự")]
        [RegularExpression(pattern: @"^[a-zA-Z][\w]{1,}", ErrorMessage="Tài khoản phải bắt đầu bằng chữ")]
        public string user{get; set;}

        [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
        [StringLength(maximumLength:25, MinimumLength = 4, ErrorMessage = "Mật khẩu từ 4 đến 25 kí tự")]
        public string pass{get; set;}

        [Required(ErrorMessage = "Họ tên là bắt buộc")]
        [StringLength(maximumLength:100, MinimumLength = 4, ErrorMessage = "Họ tên từ 4 đến 100 kí tự")]
        public string full_name{get; set;}

        [Required(ErrorMessage = "Số điện thoại là bắt buộc")]
        [RegularExpression(pattern: "^([\\d]{10,11})", ErrorMessage="Số điện thoại phải là số và dài từ 10 đến 11")]
        public string phone{get; set;}

        [Required(ErrorMessage = "Thư điện tử là bắt buộc")]
        [EmailAddress(ErrorMessage = "Thư điện tử không phù hợp")]
        public string mail{get; set;}

        [Required(ErrorMessage = "Địa chỉ là bắt buộc")]
        public string address {get; set;}

        [Required(ErrorMessage = "Giới tính là bắt buộc")]
        public string sex{get; set;}

        [Required(ErrorMessage = "Ngày sinh là bắt buộc")]
        [DataType(DataType.Date)]
        public DateTime dateborn{get; set;}

        [Required(ErrorMessage = "Trạng thái là bắt buộc")]
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