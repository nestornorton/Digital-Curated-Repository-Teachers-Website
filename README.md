# Digital-Curated-Repository-Teachers-Website

This web application’s purpose is to be a Curated Repository for Teachers, a website repository that should help various college teachers efficiently share resources in different media formats. The site will be a location to crowdsource teacher experiences in the form of descriptions and demo videos which will be searchable.


## Release Notes
### Version 1.0.0

### Features:

* Users are able to register on our website with use a .edu email and use a valid account with password to login. 
* After a successful log in, the users are able to create a new post.
* Users is able to view existing posts with pdf content from both self and others.
* Users are able to search for a post's content title or descriptions in their homepage.
* Users are able to see what posts they have uploaded in their homepage. 
* Function of sharing posts allows users upload multiple types of file like txt, pdf, image, and video.
   
### Known bugs and defects:

* Unexpected logout during page changes.
* Missing favorite feature: adding something to favorite for future viewing.
* Missing threads feature: more advanced sorting and recommendation system .
* Missing report feature: report inappropriate content to admin for review.

### Bugs and defects Fixed since last Release:
*  When a user is not logged in, the navigation bar was displaying the sharing, profile tabs and if they are clicked, it would display the respective component such as sharing page with errors since no user is logged in to share or create a post. Now, the navigation bar only shows register tab when the user is not logged in, and displays the sharing, profile tabs if logged in and vice versa.

### Functionality Missing in Release:

* viewing existing images from a post.
* download certain types of files that were uploaded in posts (e.g. docx, ppt).
* Editing existing posts.
* Rating and commenting on posts.


## Install Guide  

### Pre-requisites:
 
For this project, we’re going to use the MEAN stack template to build the web application.
If you don’t have GIT installed on the computer, you can follow the install instructions here:

* [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

This project was generated with Angular CLI version 8.3.3 and MondoDB version 4.0.3. To run server side with the JavaScript and MongoDB, you need install:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)

Once Node.js is installed, a package manager named npm will be installed with the Node.js. Npm is able to help you search and download many 3rd party libraries.
 
### Installation to Running:
 
First, clone the GitHub repository by running the following command in your command line or terminal:

```
git clone https://github.com/nestornorton/Digital-Curated-Repository-Teachers-Website.git
``` 

Next, go to the repository directory by typing 
cd (change directory), add a space and drag the root project folder into the terminal of command line and press enter.

To download all necessary dependencies for the project, in the top or root directory, type:

```
npm install
```
To start the database service open a new CLI window and run:

Mac/Linux Users:

```
mongod
```
Windows Users:

```
C:\mongodb\bin\mongod.exe
```
After the database service is running, you can run the backend server and type:

``` 
nodemon  
```
Open another command line or terminal and go to the teachers-website directory under the root directory, cd into that folder by typing cd (space) (drag folder in terminal or command line).
 
To run the Angular frontend, type:

``` 
ng serve
```   
Now, you can go to your web browser and go to "localhost:4200", and register and log in.




