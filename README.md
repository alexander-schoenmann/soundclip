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
Since progressive web apps do not work without an ssh certificate, the use of a webhost is recommended. It should be possible to install an ssh certificate there. In addition, the app is permanently accessible through a webhost. After you have received the access data from your hosting provider, you can connect to your web server via ftp. Then navigate to the folder public_html and copy the two folders "_app" and "_api" into it.

### 1.3 Database
In any case, a database is also needed for the app. Open the web interface of your hosting provider and create a mysql database. Enter the corresponding data such as database name, login and password.

### 1.4 Wordpress installation
Then navigate to https://project.com/_api and enter the connection data for the database. Enter the server address of the web server as the host. The table prefix can be retained.

After continuing on to next, information about wordpress itself must be entered. This includes the user name and a password for logging into the admin area. The installation is then complete.

### 1.5 Wordpress settings
Keep going with settings like Plugins, Custom Fields, Categories, ...

### 1.6 Launch the app
To start the app in the browser, you have to navigate to the "_app" folder. This is done via www.project.com/_app. After the url has been called, the app should be displayed with the respective content from wordpress.

## 2 Administration corner
### 2.1 Contribution
Pull Requests are gladly welcome! Nevertheless please don't forget to add an issue and connect it to your pull requests. This is very helpful to understand what kind of issue the PR is going to solve.

Bugfixes: Please describe what kind of bug your fix solve and give me feedback how to reproduce the issue. I'm going to accept only bugfixes if I can reproduce the issue.

Features: Not every feature is relevant for the bulk of ```soundclip``` users. In addition: I don't want to make ```soundclip``` even more complicated in usability for an edge case feature. It helps to have a discussion about a new feature before you open a pull request.

### 2.2 Contact
If you have any questions regarding the project, please do not hesitate to contact me. I can be reached at alexander@schoenmann.co.at.
