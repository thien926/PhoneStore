using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace PhoneAPI.Session
{
    public static class SessionHelper
    {
        public static void SetObjectAsJson(this ISession session, string key, object value){
            // Cần có Microsoft.EntityFrameworkCore.SqlServer để sử dụng JsonConvert
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key){
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }
}