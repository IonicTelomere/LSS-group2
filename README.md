## Frontend Pages

### Lecturer Pages
LecturerProfile -- Profile for each lecturer
LecturerNotification -- Notification/Calendar view for each lecturer

### Manager Pages
ManagerPage -- Add subject/subject instance form page
ManagerSchedule -- Assign lecturers to subjects form and lecturer specialisation table and un allocated subjects table view, data is pulled from database tables
ManagerSummary -- Unassigned subjects table view, data is pulled from database tables
EditInfo -- Edit lecturer information form, data is updated in the database tables

### Administrator Pages
AdminPage -- Administrator home page with timestamped note taking feature, notes are stored in local cache
RegisterPage -- User registration form, data is inserted into database tables

## Backend Pages (Database)
DataBase -- Function to pull data from the database
server -- Page to set up connection with RDS, All forms that link to the database go through the functions in here (create, read, update)

## Open source license

MIT License

# Permissions and Restrictions for code usage

Copyright (c) 2025 Joshua H

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Code Structure/ Directories
Please check the Code Structure.md file

## CI/CD

For Continuous Integration The developers of thi application used copies of the main branch as a sandbox environment for updates to the
application, once the update was successfully integrated into the copy and all tests passed only then was the andbox branch pushed to main

## Local Server Setup

Download the repository, navigate to the source folder on your default drive, copy the path, open cmd, change to the repository directory
adding /src to the end of the directory path, run node server.js in the cmd, only run server after the application is allready running
so they can both run on the same port

## Local Application Setup

Download the repository, navigate to the source folder on your default drive, copy the path, open cmd, change to the repository directory
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

