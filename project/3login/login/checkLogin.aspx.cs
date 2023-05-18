using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
namespace login
{
    public partial class checkLogin : System.Web.UI.Page
    {
         //数据库连接串
        private static string sqlcoon = "Server=localhost;port=3306;Database=login;Uid=root;Pwd=;CharSet=utf8;";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(Request["username"]))
            {
                check();
            } 
        }
        private void check()
        {
            string username = Request["username"];
            string sql = string.Format("select username,password,ip,error from account where username=@username");//查询是否有该条记录，根据账户密码
            MySqlParameter[] par = { new MySqlParameter("@username", username)};
            using (MySqlConnection myConnnect = new MySqlConnection(sqlcoon))//SqlConnection连接，用using释放连接
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, myConnnect))//SqlCommand连接，用using释放连接
 
                {
                    cmd.Parameters.AddRange(par);
                    //打开连接
                    myConnnect.Open();
                    MySqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        String ip = reader.GetString("ip");
                        if(getIP().Equals(ip)){
                            Response.Write("1");
                            Session["check"] = "1";
                            Response.End();
                        }else{
                            Response.Write("0");
                            Session["check"] = "0";
                            Response.End();
                        }
                    }else{
                        Response.Write("0");
                        Session["check"] = "0";
                        Response.End();
                    }
                }
            }
        }
        public static string getIP()
        {
            string strIPAddr = "";
            HttpContext context = GetContext();
            if (context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] == null)
                strIPAddr = context.Request.ServerVariables["REMOTE_ADDR"].ToString();
            else
                strIPAddr = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            return strIPAddr;
        }
        public static HttpContext GetContext()
        {
            HttpContext context = HttpContext.Current;
            if (context == null)
            {
                throw new Exception("没有找到HttpContext");
            }
            return context;
        }
    }
}