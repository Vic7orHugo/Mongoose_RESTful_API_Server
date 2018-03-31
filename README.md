# Mongoose_RESTful_API_Server

### This was a challenge/assignment from [EDX](https://edx.org), course ["Introduction to Node.js"](https://www.edx.org/course/introduction-to-nodejs), Module 4. 

#### The project is a implementation of a basic RESTful API server using Node.js, and Mongoose to create schemas for the documents of interest. The CRUD requests will use Mongoose methods to work with the data on a Mongo Database.

- - - - 

___LINUX/MAC___:

To easily test it, you need to open 3 to 4 *terminal* windows on the working project folder directory. Follow the instructions section below.

___WINDOWS___:

  * If you have *Git* installed on your pc, you just need to go to the folder where you downloaded the project, unzip it, enter on the project folder, right click on a blank space, and click the option "Git Bash Here". Then, follow the instructions section below
  * If you dont have *Git*, do the following instructions 4 times:
     1. Click **Windows Key** + **R** and type **cmd**
     2. Find the directory where you downloaded the project and unzip it
     3. The project probably is saved on your Downloads or Desktop folder, so just type: 
 ```
    cd Downloads\Mongoose_RESTful_API_Server   OR   cd Downloads\Mongoose_RESTful_API_Server

 ``` 
    
- - - -

### INSTRUCTIONS

  1. On the first *terminal/cmd* window, use the command: 
  ```
  mongod      <-- Opens connection to the Mongo database
  ```
  2. On another *terminal/cmd*, type: 
  ```
  npm i       <-- Installs the required modules to run the project
  npm start   <-- Runs the server
  ```
  3. At the third window, use any of the commands:
  ```
  curl "http://localhost:3000/accounts"
  curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "Fred"}' "http://localhost:3000/accounts"
  curl -H "Content-Type: application/json" -X PUT -d '{"balance": "1500"}' "http://localhost:3000/accounts/ID"
  curl -X DELETE "http://localhost:3000/accounts/ID"
  
  OR
  
  sh test.sh    <-- "test.sh" is a bash script saved on the project root folder. Edit it first
  ```
  4a. If you have MongoUI installed and know what to do, type on the fourth window:
  ```
  mongoui
  ```
  4b. If you dont have MongoUI, then type on the fourth window:
  ```
  mongo
  use edx-course-db
  db.accounts.find({}).count()              <-- The total of accounts saved
  db.accounts.find({name: "NAME"})          <-- NAME = a valid name saved with a POST request
  db.accounts.find({balance: "BALANCE"})    <-- BALANCE = a valid balance saved with a POST/PUT request
  ```
    
- - - -    

### SOME OBSERVATIONS

* Node.JS and MongoDB have to be installed in order to run this project.

* The code is really hardcoded for now, so if you try to edit an account name, it will probably result on a error.

* ID is a id value for a document. This value has to be the value of an id generated automatically by Mongoose, which means you have to know it beforehand.
