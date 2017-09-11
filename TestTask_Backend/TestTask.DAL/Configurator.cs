using System.Data.Entity;

namespace TestTask.DAL
{
    public class Configurator
    {
        public static void Init() {
            Database.SetInitializer(new Initializer());
        }
    }
}
