using System;
using TestTask.Model.Enums;
using TestTask.Model.Interfaces;

namespace TestTask.Model.Models
{
    public class Article : IEntity
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string Title { get; set; }
        public int Views { get; set; }
        public bool IsPublic { get; set; }
        public string Content { get; set; }

        public Article() {
            DateCreated = DateTime.UtcNow;
        }
        public virtual User Author { get; set; }
    }
}
