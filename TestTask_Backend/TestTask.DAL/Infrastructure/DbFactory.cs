namespace TestTask.DAL.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        TestTaskEntities dbContext;

        public TestTaskEntities Init()
        {
            return dbContext ?? (dbContext = new TestTaskEntities());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
