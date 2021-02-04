# Fetch Rewards Coding Exercise - Backend Software Engineering

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API's](#apis)

## General info
Follow the documentation to setup the Node server and execute the required REST end points.
	
## Technologies
Project is created with:
* Nodejs 
* Express
* Postman 
* Git
	
## Setup
To run this project, clone this repository and execute the following steps:

```
$ cd ../Fetch-Rewards-Coding-Exercise-Backend-Software-Engineering
$ npm install
$ npm start
```

## API's

## Add Points to User Account

### Request

`POST /addPoints`

    http://localhost:4000/addPoints

Request Body:
 ```javascript
    {
    "user":"User1",
    "payer":"DANN0N",
    "points":300,
    "timeStamp":"2/3/2000, 11:4:06 AM"
    }
```
where, 

`user` is the username and It should be String.

`Payer` is the payer name and It should be String.

`points` is the total points to be addded for a perticular payer.

`timeStamp` is the transaction date at which the points were given to payer and it should be Date.


### Response
- Success Response:
```javascript
    {
        "code": "SUCCESS",
        "description": "Points Added Successfully"
    }
```

- Error Response:
```javascript
    {
        "code": "INSUFFICIENT POINTS"
    }
```
## Deduct points from the user account

### Request

`POST /deductPoints`

    http://localhost:4000/deductPoints

Request Body:
```javascript
    {
        "user":"User1",
        "points":5
    }
```
where, 

`user` is the username and It should be String.
    
`points` is the total points to be deducted for a perticular user and it should be always positive Integer.

### Response
- Success Response:
```javascript
    [["DANNON",-5]]
```
- Error Response:
```javascript
    {
        "code": "USER NOT FOUND"
    }
```

## Return point balance

### Request

`GET /pointBalance/user`

Required:
`user=[String]`

    http://localhost:4000/pointBalance/User1

### Response
- Success Response:
```javascript
    [["DANNON",295]]
```
- Error Response:
```javascript
    {
    "code": "USER NOT FOUND"
    }
```

