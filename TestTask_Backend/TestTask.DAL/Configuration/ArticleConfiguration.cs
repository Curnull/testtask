using System.Data.Entity.ModelConfiguration;
using TestTask.DAL.Constants;
using TestTask.Model.Models;

namespace TestTask.DAL.Configuration
{
    public class ArticleConfiguration: EntityTypeConfiguration<Article>
    {
        public ArticleConfiguration()
        {
            ToTable("Articles");
            Property(x => x.Title).IsRequired().HasMaxLength(ArticleConstants.TitleMaxLength);
            Property(x => x.DateCreated).IsRequired();
            Property(x => x.Content).IsRequired();
        }
    }
}
