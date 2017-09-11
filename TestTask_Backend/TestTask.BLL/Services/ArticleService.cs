using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.DAL.Infrastructure;
using TestTask.DAL.Repositories;
using TestTask.Model.Models;

namespace TestTask.BLL.Services
{
    public interface IArticleService
    {
        IEnumerable<Article> GetAllPublished();
        IEnumerable<Article> GetAllForUser(string userName);
        Article GetById(int id);
        void Add(Article article);
        void Update(Article article);
        bool IsExists(int id);
        void Delete(Article article);
        void Publish(Article article);
        void Commit();
        Task CommitAsync();
    }

    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ArticleService(IArticleRepository articleRepository, IUnitOfWork unitOfWork)
        {
            _articleRepository = articleRepository;
            _unitOfWork = unitOfWork;
        }

        #region IArticletService Members

        public IEnumerable<Article> GetAllPublished() => _articleRepository.GetMany(x => x.IsPublic);
        public IEnumerable<Article> GetAllForUser(string userName) => _articleRepository.GetMany(x => x.Author.UserName == userName);

        public Article GetById(int id) => _articleRepository.GetById(id);

        public void Add(Article article) => _articleRepository.Add(article);

        public void Update(Article article) => _articleRepository.Update(article);

        public void Commit() => _unitOfWork.Commit();
        public Task CommitAsync() => _unitOfWork.CommitAsync();

        public bool IsExists(int id) => _articleRepository.GetById(id) != null;

        public void Delete(Article article) => _articleRepository.Delete(article);
        public void Publish(Article article) {
            article.IsPublic = true;
            _articleRepository.Update(article);
        }

        #endregion
    }

}
