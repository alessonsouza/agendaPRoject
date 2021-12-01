using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using AgendaEventos.Interfaces;
using AgendaEventos.Interfaces.Services;
using AgendaEventos.Models;

namespace AgendaEventos.Services.Security
{
    public class UserSeniorService : IUser
    {
        public readonly IConnectionFactory _connection;

        public UserSeniorService(IConnectionFactory conn)
        {
            _connection = conn;
        }

        public async Task<IEnumerable<User>> GetUsers(string username)
        {
            string sql = @"SELECT r034usu.numcad as numCadastro
                             FROM r999usu
                             JOIN r034usu
                                ON ( r034usu.codusu = r999usu.codusu )
                            WHERE lower(r999usu.nomusu) = lower(:username)";
            var param = new DynamicParameters();
            param.Add(":username", username);


            using (var conn = _connection.Connection())
            {
                try
                {
                    return await conn.QueryAsync<User>(sql, param);
                }
                catch (Exception e)
                {

                    throw new ApplicationException(e.Message);
                }
            }
        }

        public async Task<IEnumerable<User>> GetUsersByNumCAd(int matricula)
        {
            string sql = @"select fun.NOMFUN as Name from r034fun fun
                            where fun.numcad = :matricula";
            var param = new DynamicParameters();
            param.Add(":matricula", matricula);


            using (var conn = _connection.Connection())
            {
                try
                {
                    return await conn.QueryAsync<User>(sql, param);
                }
                catch (Exception e)
                {

                    throw new ApplicationException(e.Message);
                }
            }
        }
    }
}