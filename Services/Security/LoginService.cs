using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using AgendaEventos.Interfaces;
using AgendaEventos.Interfaces.Security;
using AgendaEventos.Interfaces.Services.Security;
using AgendaEventos.Models;
using Microsoft.Extensions.Options;

namespace AgendaEventos.Services.Security
{
    public class LoginService : ILogin
    {

        private readonly ITokenService _tokenService;
        private readonly IPassword _passwordService;
        public readonly IConnectionFactory _connection;


        public LoginService(IConnectionFactory conn, ITokenService tokenService, IPassword passwordService)
        {
            _connection = conn;
            _tokenService = tokenService;
            _passwordService = passwordService;
        }

        public async Task<ResponseLogin> Authenticate(Login login)
        {


            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            ResponseLogin response = new ResponseLogin();
            Console.WriteLine(login.Password);
            conn.CommandText = @"SELECT * FROM events.auth
                                          where auth_login = @auth_login
                                          and auth_password = @auth_password ";

            conn.Parameters.AddWithValue("@auth_login", login.Username);
            conn.Parameters.AddWithValue("@auth_password", login.Password);

            using (var reader = await conn.ExecuteReaderAsync())
            {
                User user = new User
                {
                    auth_name = "",
                    auth_login = "",
                    auth_image = ""
                };
                //montar SQL
                while (reader.Read())
                {

                    if (!String.IsNullOrEmpty(reader.GetString("auth_name")))
                    {
                        user = new User
                        {
                            auth_name = reader.GetString("auth_name"),
                            auth_login = reader.GetString("auth_login"),
                            auth_image = reader.GetString("auth_image")
                        };

                    }

                }

                if (!String.IsNullOrEmpty(user.auth_name))
                {
                    string token = _tokenService.GenerateToken(user);
                    response.User = user;
                    response.Token = token;
                }
                else
                {
                    throw new ApplicationException("Usuário ou senha inválidos");
                }
                // _ldapAuthService.BelongToGroup(_ldapConfig.MemberOf);



                return response;
            }



        }

        public List<User> AllUsers(User obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            string whereClause = "";
            string AndORClause = "";
            conn.CommandText = @"SELECT * FROM events.auth ";

            if (!String.IsNullOrEmpty(obj.auth_name))
            {
                whereClause = "where ";
                conn.CommandText += whereClause;
                conn.CommandText += "auth_name like '%" + obj.auth_name + "%'";
                // conn.Parameters.AddWithValue("@rg_title", obj.rg_title);
            }
            List<User> user = new List<User>();
            Console.WriteLine(conn.CommandText);

            using (var reader = conn.ExecuteReader())
                try
                {
                    //montar SQL
                    while (reader.Read())
                    {
                        var Auth_data_created = reader.GetValue("auth_data_created");
                        var Auth_data_updated = reader.GetValue("auth_data_updated");
                        var photo = reader.GetValue("auth_image");
                        user.Add(new User
                        {
                            idauth = reader.GetInt16("idauth"),
                            auth_name = reader.GetString("auth_name"),
                            auth_login = reader.GetString("auth_login"),
                            auth_image = (string)(photo.ToString() == "" ? null : photo),
                            auth_active = reader.GetInt16("auth_active"),
                            auth_data_created = (DateTime)Auth_data_created,
                            auth_data_updated = (DateTime)Auth_data_updated

                        });
                    }
                    return user;

                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
        }

        public object SaveUser(User obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            conn.CommandText = @"INSERT INTO events.auth(
                                                        auth_name, 
                                                        auth_login, 
                                                        auth_password, 
                                                        auth_data_created, 
                                                        auth_data_updated,
                                                        auth_active,
                                                        auth_image
                                                        ) 
                                                    values(
                                                        @auth_name,
                                                        @auth_login, 
                                                        @auth_password, 
                                                        @auth_data_created, 
                                                        @auth_data_updated,
                                                        @auth_active,
                                                        @auth_image
                                                    )";
            conn.Parameters.AddWithValue("@auth_name", obj.auth_name);
            conn.Parameters.AddWithValue("@auth_login", obj.auth_login);
            conn.Parameters.AddWithValue("@auth_password", obj.auth_password);
            conn.Parameters.AddWithValue("@auth_data_created", obj.auth_data_created);
            conn.Parameters.AddWithValue("@auth_data_updated", obj.auth_data_updated);
            conn.Parameters.AddWithValue("@auth_active", obj.auth_active);
            conn.Parameters.AddWithValue("@auth_image", obj.auth_image);

            try
            {
                // connection.Open();
                return conn.ExecuteReader();
            }
            catch (Exception e)
            {

                connection.Close();
                throw new ApplicationException(e.Message);
            }
        }

        public object UpdateUser(User obj)
        {
            var connection = _connection.Connection();
            var conn = connection.CreateCommand();
            conn.CommandText = @"update events.auth 
                                    SET auth_name = @auth_name, 
                                        auth_login = @auth_login,                                                                               
                                        auth_data_updated = @auth_data_updated,
                                        auth_active = @auth_active,                                                  
                                        auth_image = @auth_image                                                  
                                  where  idauth = @idauth";
            conn.Parameters.AddWithValue("@idauth", obj.idauth);
            conn.Parameters.AddWithValue("@auth_name", obj.auth_name);
            conn.Parameters.AddWithValue("@auth_login", obj.auth_login);
            conn.Parameters.AddWithValue("@auth_data_updated", obj.auth_data_updated);
            conn.Parameters.AddWithValue("@auth_active", obj.auth_active);
            conn.Parameters.AddWithValue("@auth_image", obj.auth_image);

            try
            {
                // connection.Open();
                return conn.ExecuteReader();
            }
            catch (Exception e)
            {

                connection.Close();
                throw new ApplicationException(e.Message);
            }
        }
    }
}