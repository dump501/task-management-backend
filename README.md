## Task manager backend
### A task management api build as assignment

This project is developed using node js, express and mysl

### installation

#### using git (clone and start development server)
* Clone the project using git run `git clone https://github.com/dump501/task-management-backend`
* cd in the cloned folder `cd task-management-backend`
* run the command `npm install` to install the depencies
* create `.env` file
* open the `.env.example` file, copy the content and paste in the `.env` file
* update the environement variables in the `.env` file
* run the command `node src/index.js` to start the server
* make a get request at http://localhost:8080 to see if the server is running
* voila! you're done ! 😁

#### using docker (build image and run container)
* Clone the project using git run `git clone https://github.com/dump501/task-management-backend`
* cd in the cloned folder `cd task-management-backend`
* run the command `docker build -t task-management-api` to build the image
* 
* voila! you're done ! 😁

### Tools used
* Mysql for database
* Express for handling request and middlewares
* jsonwebtoken for generating jwt
* nodemailer for sending mails

### Todo next 
* create unit test
* use kubernetes to deploy and manage containers
* add test in github actions and make a real CI/CD pipeline
  
### Thunder client api collections
Thunder client is store in the `thunder-collection_task manager.json` at the root of the project

made with ❤️ by Fritz <tsafack07albin@gmail.com> for Albedo system intership application.