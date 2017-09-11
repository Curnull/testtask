using System.ComponentModel.DataAnnotations;
using TestTask.DAL.Constants;

namespace TestTask.WebApi.Models
{
    public class ArticleModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(ArticleConstants.TitleMaxLength)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set;}
        public bool IsPublic { get; set; }
    }
}