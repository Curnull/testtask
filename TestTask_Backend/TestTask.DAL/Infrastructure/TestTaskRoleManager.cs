using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TestTask.DAL.Infrastructure
{
    public class TestTaskRoleManager : RoleManager<IdentityRole>
    {
        public TestTaskRoleManager()
            : base(new TestTaskRoleStore())
        {
        }
    }
}
