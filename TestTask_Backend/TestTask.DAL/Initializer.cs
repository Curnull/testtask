using System.Data.Entity;

namespace TestTask.DAL
{
    public class Initializer: MigrateDatabaseToLatestVersion<TestTaskEntities, DbConfiguration>
    {
    }
}
