using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
namespace login
{
    public partial class login : System.Web.UI.Page
    {
        //数据库连接串
        private static string sqlcoon = "Server=localhost;port=3306;Database=login;Uid=root;Pwd=;CharSet=utf8;";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        //登陆
        protected void LoginIn(object sender, EventArgs e)
        {
            SuccessText.Text = "";
            FailureText.Text = "";
            String username = UserName.Text;
            String password = Password.Text;
            string sql = string.Format("select username,password,ip,error from account where username=@username");//查询是否有该条记录，根据账户密码
            MySqlParameter[] par = { new MySqlParameter("@username", username), new MySqlParameter("@password", password) };
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
                        String dbpwd = reader.GetString("password");
                        int error = reader.GetInt32("error");
                        reader.Close();
                        string upsql = "";//查询是否有该条记录，根据账户密码
                        
                        if (password.Equals(dbpwd))
                        {
                            error = 0;
                            upsql = string.Format("update account set ip = @ip,error = @error where username = @username");
                            SuccessText.Text = "登陆成功！";
                        }
                        else
                        {
                            error++;
                            if (error >= 3)
                            {
                                upsql = string.Format("update account set ip = '',error = @error where username = @username");
                                FailureText.Text = "密码输错3次以上，IP已清除！";
                            }
                            else
                            {
                                upsql = string.Format("update account set error = @error where username = @username");
                                FailureText.Text = "账户名或密码错误！";
                            }
                        }
                        MySqlParameter[] ipar = { new MySqlParameter("@username", username), new MySqlParameter("@error", error), new MySqlParameter("@ip", getIP()) };
                        using (MySqlCommand ucmd = new MySqlCommand(upsql, myConnnect))
                        {
                            ucmd.Parameters.AddRange(ipar);
                            ucmd.ExecuteReader();
                        }
                        if (error == 0)
                        {
                            Response.Redirect("index1.aspx");
                        }


                    }
                    else
                    {
                        FailureText.Text = "账户名或密码错误！";
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