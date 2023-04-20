# <h1 align="center"> FP3SocialNetwork - Twitter </h1>

### Launching an application from the command line

To run the application from the command line, you need to have Maven installed. To check if maven is installed, run the mvn –version command on the command line.
```sh
mvn -version
```

If Maven is installed, to run the application, go to the root of the social-network-api project through the command line and run the command mvn spring-boot:run
```sh
cd  social-network-api
```
```sh
mvn spring-boot:run
```

The CLI will run your application on the configured port and you can access it just like you would if you start the app in an IDE.

### Java code style checking

In this project, the style of the code is checked using Checkstyle.

To check the style of the code, go to the root of the project and run the following on the command line:
```sh
mvn validate
```