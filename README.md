# Progressive Web App ```soundclip```
A progressive web app with headless CMS for all kinds of songs and podcasts. Information such as the artist, album or lyrics are displayed for each song/podcast. There is also the option of playing the respective track immediately in the app. In addition, functions such as login, favourites or comments are available.The entire app is responsive and can be viewed on any available devices.

## 1 Usage
### 1.1 Preparation
Before the installation can be started, the following two folders must be created.
- _api
- _app

#### Download the zip file
Download the project from the master branch and save the zip file on your local machine. Unzip the zip file into the folder "_app".

#### Download wordpress
Navigate to https://de.wordpress.org/download/releases/ and download the latest version of wordpress as a zip file. Originally this app was developed with version 5.7.1. Open the zip file and navigate to the order "wordpress". All files contained in it can now be unpacked into the folder "_api".

### 1.2 Server
It is possible to run the app via localhost as well as via webhosting.

#### localhost
If you want to run the app via localhost, I recommend programmes like Xampp (Win, Linux) or Mamp (MacOS). After you have downloaded the corresponding programme, you must create a project folder (e.g. project) and copy the two folders _app and _api into it.

#### webhosting
To make your app permanently accessible, we recommend using a web host. After you have received the access data from your hosting provider, you can connect to your web server via ftp. Then navigate to the folder public_html and copy the two folders _app and _api into it.

### 1.3 Database
In any case, a database is also needed for the app. In this case a mysql database.

#### localhost
Navigate to http://localhost:8080/phpmyadmin in your browser and create a new database. The encoding used is utf8mb4_general_ci. Then you need to create a user who has full rights to the database. Enter the necessary data and select localhost (without port) as host. 

#### webhosting
Open the web interface of your hosting provider and create a mysql database. Enter the corresponding data such as database name, login and password.

### 1.4 Wordpress installation

#### localhost
Then you can go to http://localhost:8080/_api. Here you have to enter the data for the database connection. Enter localhost as the host (without port). The table prefix can be retained.

#### webhosting
Then navigate to http://localhost:8080/_api and enter the connection data for the database. Enter the server address of the web server as the host. The table prefix can be retained.

After continuing on to next, information about wordpress itself must be entered. This includes the user name and a password for logging into the admin area. The installation is then complete.

### 1.5 Wordpress settings
Keep going with settings like Plugins, Custom Fields, Categories, ...

### 1.6 Launch the app
To start the app in the browser, you have to navigate to the _app folder. When accessing via localhost, this is done via localhost:8080/project/_app. If you are using a webhost, this is done via www.project.com/_app. After the url has been called, the app should be displayed with the respective content from wordpress.

## 2 Administration corner
### 2.1 Contribution
Pull Requests are gladly welcome! Nevertheless please don't forget to add an issue and connect it to your pull requests. This is very helpful to understand what kind of issue the PR is going to solve.

Bugfixes: Please describe what kind of bug your fix solve and give me feedback how to reproduce the issue. I'm going to accept only bugfixes if I can reproduce the issue.

Features: Not every feature is relevant for the bulk of ```soundclip``` users. In addition: I don't want to make ```soundclip``` even more complicated in usability for an edge case feature. It helps to have a discussion about a new feature before you open a pull request.

### 2.2 Contact
If you have any questions regarding the project, please do not hesitate to contact me. I can be reached at alexander@schoenmann.co.at.
