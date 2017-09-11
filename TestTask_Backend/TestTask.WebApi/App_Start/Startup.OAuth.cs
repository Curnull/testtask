using Microsoft.Owin.Security.DataHandler.Encoder;
using Owin;
using System.Configuration;
using TestTask.DAL;
using TestTask.DAL.Infrastructure;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin;
using System;
using TestTask.WebApi.Identity;

namespace TestTask.WebApi
{
    public partial class Startup
    {
        public void ConfigureOAuth(IAppBuilder app)
        {
            var issuer = ConfigurationManager.AppSettings["issuer"];
            var secret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["secret"]);
            app.CreatePerOwinContext(() => new TestTaskEntities());
            app.CreatePerOwinContext(() => new TestTaskUserManager());
            app.CreatePerOwinContext(() => new TestTaskRoleManager());
            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { "Any" },
                IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                {
                    new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
                }
            });
            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/oauth2/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(240),
                Provider = new CustomOAuthProvider(),
                AccessTokenFormat = new CustomJwtFormat(issuer),
            });
        }
    }
}