namespace PhoneAPI.DTOs
{
    public class TaiKhoanDto
    {
        public string user { get; set; }
        public string password { get; set; }
        public TaiKhoanDto () {
            this.user = "";
            this.password = "";
        }
        public TaiKhoanDto (string user, string password) {
            this.user = user;
            this.password = password;
        }
    }
}