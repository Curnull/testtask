using System;

namespace TestTask.Model.Interfaces
{
    public interface IEntity
    {
        int Id { get; set; }
        DateTime DateCreated { get; set; }
    }
}
