# Blog Server

## Overview

### Blog server is a back end application designed to manage blog and user data thats very easy to use. This application built using typescript, express.js, node.js, mongodb and mongoose. This application play tow diffrent role, one is admin role and another is user role. Admin and user both have to loged in for perform any operation. admin can block user and delete blog when. on the other hand user can register and login. user can create blog, update their own blog and delete their own blog by blog id. user cannot perform admin actions.

## Technology Stack

### TypeScript: used typescript for avoid type error.

### Express.js: very popurler node.js freamwork. Its lightweight easy to use and flexible for building api.

### MongoDB: noSql database it's vary eficient and scalable data storage.

### mongoose: object data modeling library for mongodb and node.js. it's make easy to manage mongodb database.

### node.js: javaScript runtime for serverside rendering .

# moduler design pattern

### moduler design pattern used for this application. This design pattern make easy to manage code of each file. In this application have three module. user module, blog module and auth module. The user module, blog module and auth module have inside module directory.

# Private API ENDPOINTS for user actions

## Method:POST

### API for register user : https://blog-server-lac.vercel.app/api/auth/register

## Method:POST

### API for login user: https://blog-server-lac.vercel.app/api/auth/login

## Method:POST

### API for create blog : https://blog-server-lac.vercel.app/api/blogs

## Method:PATCH

### API for update user own blog : https://blog-server-lac.vercel.app/api/blogs/:id

## Method:DELETE

### Api for delete user own blog : https://blog-server-lac.vercel.app/api/blogs/:id

# Private API for Admin actions

## Method:PATCH

### Api for block user: https://blog-server-lac.vercel.app/api/admin/users/:userId/block

## Method: DELETE

### Api for delete blog : https://blog-server-lac.vercel.app/api/admin/blogs/:id

# Public API Endpoints

## Method:GET

### API for blogs: blog-server-lac.vercel.app/api/blogs

## Query Parameters:

### search: Search blogs by title or content (e.g., search=blogtitle).

### sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).

### sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).

### filter: Filter blogs by author ID (e.g., author=authorId).
