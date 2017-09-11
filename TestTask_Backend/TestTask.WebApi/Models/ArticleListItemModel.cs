namespace TestTask.WebApi.Models
{
    public class ArticleListItemModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsPublic { get; set; }
    }
}