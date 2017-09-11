using System;

namespace TestTask.DAL.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        TestTaskEntities Init();
    }
}
