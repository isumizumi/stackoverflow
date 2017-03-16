# Stack Overflow (my version)

Stack Overflow is a global forum for developers. User can share or post questions about anything in programming language, then users can answer many question. User can also vote a question for once.


# Database

## User Schema

  **Field**  |  **Data Type**  |              **Description**
-------------|-----------------|-------------------------------------------
| _id        | Object_ID       | User ID (auto create)
| username   | STRING          | Display name
| email      | STRING          | User email
| password   | STRING          | User password
| activity   | STRING          | Student or Worker
| location   | STRING          | Country or City
| createdAt  | DATE            | (auto: timestamps) Date time user created
| updatedAt  | DATE            | (auto: timestamps) Date time user updated

## Question Schema

  **Field**  |  **Data Type**  |                **Description**
-------------|-----------------|--------------------------------------------------
| _id        | Object_ID       | Question ID (auto create)                         
| user_id    | Object_ID       | User ID who post the question    
| title      | STRING          | Title of the question                    
| content    | STRING          | The content of the question              
| answer     | Mixed           | Array of object answer [{title, content, author}]
| vote       | Mixed           | Array of object vote [{upvote, downvote}]
| createdAt  | DATE            | (auto: timestamps) Date time user created
| updatedAt  | DATE            | (auto: timestamps) Date time user updated

# Routes API

## Users

    **Route**        |   **HTTP**    |    **Description**
---------------------|---------------|------------------------
/user/signup         | POST          | Create new user
/user/signin         | POST          | Sign in user
/user                | GET           | Get all user
/user/:username      | GET           | Get one data user
/user/:username      | PUT           | Update data user
/user/:username      | DELETE        | Delete data user

## Questions

      **Route**      |   **HTTP**    |    **Description**
---------------------|---------------|------------------------
| /question          | GET           | Get all question
| /question          | POST          | Post new question
| /question/:id      | GET           | Get one data question
| /question/:id      | PUT           | Update data question
| /question/:id      | DELETE        | Delete data question

## Answers

      **Route**                |   **HTTP**    |       **Description**
-------------------------------|---------------|------------------------------
| /question/:id/answer         | GET           | Get all answer of question
| /question/:id/answer         | POST          | Post an answer in a question
| /question/:id/answer/:id     | GET           | Get one data answer
| /question/:id/answer/:id     | PUT           | Update data answer
| /question/:id/answer/:id     | DELETE        | Delete data answer

# **USAGE**
#### With only npm:

To install all dependencies:
> npm i <br>

I'm using:
>npm install express nodemon mocha chai chai-http cors <br>
>mongodb mongoose jsonwebtoken password-hash<br>

>npm start <br>
>npm run dev <br>

#### Running mongod:
> sudo service mongod start <br>
> check connection @robomongo <br>

Access the website via http://localhost:3000/
