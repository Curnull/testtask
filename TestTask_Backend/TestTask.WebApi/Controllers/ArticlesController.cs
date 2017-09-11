using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TestTask.BLL.Services;
using TestTask.Model.Models;
using TestTask.WebApi.Models;

namespace TestTask.WebApi.Controllers
{
    [RoutePrefix("api/Articles")]
    public class ArticlesController : ApiController
    {
        private IArticleService ArticleService { get; set; }
        private IUserService UserService { get; set; }
        public ArticlesController(IArticleService articleService, IUserService userService) {
            ArticleService = articleService;
            UserService = userService;
        }
        [AllowAnonymous]
        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            return Ok(ArticleService.GetAllPublished().Select(Mapper.Map<ArticleListItemModel>));
        }

        [Route("GetAllForUser")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllForUser()
        {
            return Ok(ArticleService.GetAllForUser(User.Identity.Name).Select(Mapper.Map<ArticleListItemModel>));
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(ArticleModel article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = Mapper.Map<Article>(article);
            entity.Author = UserService.GetByName(User.Identity.Name);
            ArticleService.Add(entity);
            await ArticleService.CommitAsync();
            return Ok(Mapper.Map<ArticleModel>(entity));
        }

        [Route("")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(ArticleModel article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = ArticleService.GetById(article.Id);
            if (CannotPerformOperation(entity)) {
                return NotFound();
            }
            Mapper.Map(article, entity);
            ArticleService.Update(entity);
            await ArticleService.CommitAsync();
            return Ok(Mapper.Map<ArticleModel>(entity));
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var entity = ArticleService.GetById(id);
            if (CannotPerformOperation(entity))
            {
                return NotFound();
            }
            ArticleService.Delete(entity);
            await ArticleService.CommitAsync();
            return Ok();
        }

        [Route("Publish/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> Publish(int id) {
            var entity = ArticleService.GetById(id);
            if (CannotPerformOperation(entity))
            {
                return NotFound();
            }
            ArticleService.Publish(entity);
            await ArticleService.CommitAsync();
            return Ok();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            var entity = ArticleService.GetById(id);
            if (CannotPerformOperation(entity))
            {
                return NotFound();
            }
            return Ok(Mapper.Map<ArticleModel>(entity));
        }

        public bool CannotPerformOperation(Article entity) => entity == null || entity.Author.UserName != User.Identity.Name;
    }
}
