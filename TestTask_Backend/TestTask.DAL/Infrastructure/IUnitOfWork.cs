using System.Threading.Tasks;

namespace TestTask.DAL.Infrastructure
{
    public interface IUnitOfWork
    {
        void Commit();
        Task CommitAsync();
    }
}
