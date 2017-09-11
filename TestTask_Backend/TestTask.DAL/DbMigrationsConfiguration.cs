using System.Data.Entity.Migrations;

namespace TestTask.DAL
{
    public class DbConfiguration : DbMigrationsConfiguration<TestTaskEntities>
    {
        public DbConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
    }
}
