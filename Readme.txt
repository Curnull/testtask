In order to run the project please do the following:

1. Create empty DataBase in Ms Sql Server,
2. Open solution in IDE (./TestTask_Backend/TestTask.sln),
3. Open file Web.config in TestTask.WebApi project,
4. Replace the following string in the config "<Put your connection string here>" by your connection string,
5. Run project TestTask.WebApi
6. Using console navigate to the folder './TestTask_Frontend'
7. Run 'npm i' (you have to have Node.js installed in order to run this command)
8. Open file ./TestTask_Frontend/webpack.config.js and replace string "<Put your backend url here>" by the URL (without http://) of running backend app (ex: localhost:5456)
9. Run command 'npm run dev' in the console under './TestTask_Frontend' folder
10. After success build of frontend app open "http://localhost:8080" in your browser.
11. Have fun!

Thank you!