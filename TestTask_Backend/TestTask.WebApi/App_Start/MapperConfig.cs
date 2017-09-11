using AutoMapper;
using TestTask.Model.Models;
using TestTask.WebApi.Models;

namespace TestTask.WebApi.App_Start
{
    public class MapperConfig
    {
        public static void Init() {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<Article, ArticleListItemModel>();
                cfg.CreateMap<ArticleModel, Article>().ForMember(x => x.IsPublic, opt => opt.Ignore());
                cfg.CreateMap<Article, ArticleModel>();
            });
        }
    }
}