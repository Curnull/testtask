using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TestTask.Model.Models;

namespace TestTask.DAL.Infrastructure
{
    public class TestTaskUserManager : UserManager<User>
    {
        public TestTaskUserManager() : base(new TestTaskUserStore())
        {
        }
    }
}
