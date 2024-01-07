## Blaze Assesment
### Local Environment (Dockerized):
1. Create a ".env.local" file for the backend app with .env variables values following back/.env.example structure. <br>
2. Create a ".env.local" file for the front app with .env variables values following the back/.env.example structure. <br>
3. Run docker-compose.local.yml file:<br>
``docker compose -f ./docker-compose.local.yml up -d --build`` <br><br>
*In local environment Live reload is enabled, so you dont need to re build the app on each change.*
<br><br>

### Prod Environment
1. Crea a ".env.prod" file for backend app with env variables values following back/.env.example structure.
2. Crea a ".env.prod" file for front app with env variables values following front/.env.example structure.
3. Run docker-compose.prod.yml file. <br>
``docker compose -f ./docker-compose.prod.yml up -d --build``
<br><br>

### Local Environment (No Dockerized):
1. Install postgres.
2. Create a ".env.local" file for the backend app with .env variables following back/.env.example structure.
3. Run ``npm i`` to install dependencies on backend app.
4. Use ``npm run start:local`` command to start the backend app.<br><br>
5. Create a ".env.local" file for the frontend app with .env variables following front/.env.example structure.
6. Run ``npm i`` to install dependencies on frontend app.
7. Use ``npm run dev`` command to start the backend app.<br><br>
*Live reload is enabled in backend and frontend apps, so you dont need to re build the app on each change.*
<br><br>

# BackEnd Project:

## Cronjobs:
- All the cronjobs are classes that extend the class Cronjob.
- The cronjob schedule and action are defined on the constructor of each cronjob.
- The action property has a setter that wraps the action execution for error handling.
- All cron files should have the suffix .cron.ts
- In order to get a cronjob initialized, an instance must be registered on the App constructor on the config options object in an array under the key cronJobs. To get an instance you can use the IoC container.
- The cronjob requested for the assesment is defined in the following path: /src/football-data-source/infra/cronjobs/api-football-update-teams-and-matches.cron.ts. Here is defined the schedule to fetch the data.
- The teams and matches data is being fetched at every 2 minutes. Feel free to set it as you wish before running the app.
- You can define the ammount of days back, since today, that you want to get data. You can set the amount of days with the FOOTABLL_API_DAYS_BACK_TO_FETCH_MATCHES env variable passing a number value like 30 for 30 days.

## Custom Errors and ErrorHandling:
- The app is using a set of custom exceptions that describe different cases.
- Each new exception type should extend the CustomException class that extends from the base Error class.
- Each exception class has a http code and a http error message that maps with the http code. This is used when the case of use is called through a rest controller.
- Also, each custom exception instance receives a message in the constructor that is to show a message to the user to be more specific when explaining the error.
- This works for every type of exception except for the InternalServerException type, the internal server exception message is deleted in order to not show critical information to the user.

### For Cronjobs:
- The cronjob class wraps each action so when an error is thrown the error is logged properly.
- As each exception extends from the Custom Exception class and the Custom Exception class extends from the Error class, each time you throw a Custom Exception when you log the error you have the stack trace for the error and a custom message that should explain what is happening more clearly.
- In cron job errors http code and http message related to the code are simply ignored.

### For Controllers:
- The express app has a middleware that is being used as an interceptor for all the errors thrown by the controller.
- As each exception type extends from the Custom Exception, they must have an http code related to the error and an http message related to the code. So when a custom exception is thrown and it pass through the interceptor, the interceptor use that information to build the response with a code and a code related message.
- As mentioned before, there CustomException classes receive in the constructor a message for logging. When the CustomException gets to the interceptor the custom exception is logged and later the message is deleted before being sent as a response. In order to not show critical information as a reponse.
- Every exception thrown that is unknown is mapped as a 500 internal server error exception.
- All the internal server error exceptions also have an error property that shows the original error instance.
- All the Rest error responses are following with the format defined in the file: /src/shared/responses/http-error.response.ts

## Success Responses:
- All success Rest responses follow the format of the file /src/shared/responses/http-success.response.ts
- When you define a route for later register the route action is being wrapped in function that handles the return value in the controller. This allow the rest responses to be standarized as in the file previously mentioned. The response is always going to show a status code a status code message and a payload.
- The status code can be changed from the controller using the response received as argument in the controllers. For example to return a 201. Otherwise is going to be always 200 by default.

## Dependency Injection (IoC)
- In case you want to add a service, a router, a controller or a cron you need to add it to the /src/dependency-injection/container.ts.
- Also, the class should be decorated with the @injectable() decorator.

## Routes
- Each new router should be a class that extend route base class.
- You should inject the controller that is going to be mapped to the requests into the router.
- To define the routes you should create new Route instances and pass those in an array to the method setRoutes() in the constructor of the router class.
- The route instance receive the http method, the uri path and the action (from the controller, remember to bind the controller class...) 
