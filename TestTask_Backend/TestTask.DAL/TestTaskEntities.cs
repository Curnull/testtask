using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using TestTask.DAL.Configuration;
using TestTask.Model.Models;

namespace TestTask.DAL
{
    public class TestTaskEntities: IdentityDbContext<User>
    {
        public TestTaskEntities() : base("TestTaskEntities") {
        }
        public DbSet<Article> Articles { get; set; }
        public virtual void Commit()
        {
            base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ArticleConfiguration());
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<IdentityUserLogin>().HasKey(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }
    }
}
