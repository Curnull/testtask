using Microsoft.AspNet.Identity.EntityFramework;
using TestTask.DAL.Infrastructure;
using TestTask.Model.Models;

namespace TestTask.DAL.Repositories
{
    public class UserRepository: RepositoryBase<User>, IUserRepository
    {
        public UserRepository(IDbFactory dbFactory): base(dbFactory) { }
    }

    public interface IUserRepository : IRepository<User>
    {

    }
}
