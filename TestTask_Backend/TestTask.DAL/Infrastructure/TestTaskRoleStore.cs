using Microsoft.AspNet.Identity.EntityFramework;

namespace TestTask.DAL.Infrastructure
{
    public class TestTaskRoleStore: RoleStore<IdentityRole>
    {
        public TestTaskRoleStore(): base(new TestTaskEntities())
        {
        }
    }
}
