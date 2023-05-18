using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Data.Sql;
using MySql.Data.MySqlClient;
namespace login
{
    public partial class register : System.Web.UI.Page
    {
        //数据库连接串
        private static string sqlcoon = "Server=localhost;port=3306;Database=login;Uid=root;Pwd=;CharSet=utf8;";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        //登陆
        protected void Register(object sender, EventArgs e)
        {
            SuccessText.Text = "";
            FailureText.Text = "";
            String username = UserName.Text;
            String password = Password.Text;
            String email = Email.Text;
            string sql = string.Format("select count(*) from account where username=@username");//查询是否有该条记录，根据账户密码
            MySqlParameter[] par = { new MySqlParameter("@username", username)};

            string sql2 = string.Format("insert into account(username,password,error,email,ip) values(@username,@password,0,@email,'')");//查询是否有该条记录，根据账户密码
            MySqlParameter[] par2 = { new MySqlParameter("@username", username), new MySqlParameter("@password", password),new MySqlParameter("@email", email) };
            using (MySqlConnection myConnnect = new MySqlConnection(sqlcoon))//SqlConnection连接，用using释放连接
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, myConnnect))//SqlCommand连接，用using释放连接
                {
                    cmd.Parameters.AddRange(par);
                    //打开连接
                    myConnnect.Open();
                    int resert = Convert.ToInt32(cmd.ExecuteScalar());
                    if (resert > 0)
                    {
                        FailureText.Text = "账户名已存在！";
                    }
                    else
                    {
                        //开始注册
                        using (MySqlCommand cmd2 = new MySqlCommand(sql2, myConnnect))
                        {
                            cmd2.Parameters.AddRange(par2);
                            cmd2.ExecuteScalar();
                            SuccessText.Text = "注册成功！";
                        }
                    }
                }
            }
        }
    }
}