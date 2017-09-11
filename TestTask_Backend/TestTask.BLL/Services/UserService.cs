using System.Collections.Generic;
using TestTask.DAL.Repositories;
using TestTask.Model.Models;

namespace TestTask.BLL.Services
{
    public interface IUserService
    {
        User GetByName(string name);
    }
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetByName(string name) => _userRepository.Get(x => x.UserName == name);
    }
}
