using TestTask.DAL.Infrastructure;
using TestTask.Model.Models;

namespace TestTask.DAL.Repositories
{
    public class ArticleRepository : RepositoryBase<Article>, IArticleRepository
    {
        public ArticleRepository(IDbFactory dbFactory): base(dbFactory) { }
    }

    public interface IArticleRepository : IRepository<Article>
    {

    }
}
