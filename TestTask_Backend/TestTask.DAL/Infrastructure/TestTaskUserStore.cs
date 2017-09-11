using Microsoft.AspNet.Identity.EntityFramework;
using TestTask.Model.Models;

namespace TestTask.DAL.Infrastructure
{
    public class TestTaskUserStore : UserStore<User>
    {
        public TestTaskUserStore() : base(new TestTaskEntities())
        {
        }
    }
}
