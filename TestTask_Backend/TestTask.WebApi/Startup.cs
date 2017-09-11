using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(TestTask.WebApi.Startup))]
namespace TestTask.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuth(app);
        }
    }
}