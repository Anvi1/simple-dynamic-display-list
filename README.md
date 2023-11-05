# SimpleDynamicDisplayList

1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

2. Node version v19.6.0

3. npm version 9.4.0

4. Run `npm install` inside root directory to download node modules. 

5. Additional package is installed for using Font awesome icons locally. This is used for installing fa icon used as toggle button in application. Dependency is added in package.json. If this somehow throws error while 'npm install' because of version issues, then remove it from package.json, remove import from styles.scss, do 'npm install' wihout it and to access fa icons uncomment line number 9 in index.html file. index.html file includes font-awesome style sheet source link, so internet connection is required to access the icon in this case.

6. If some error persists while 'npm install', try deleting 'package-lock.json' file and then run 'npm install' again.


# Description:

1. Code structure follows full utilization of Angular component based structure to make code as clean, maintainable and understandable as possible. Includes Services, Interfaces, Smart Component and Dumb component. Communication between child and parent components is facilitated using RxJs Subject. Navigation from different pages is done using angular route.

2. Application fetches maximum 10 users from api - 'https://reqres.in/api/users?per_page=10'. Displays the list at /display-list page, After every 5 seconds new user is fetched based on the next id number from the last user id in the list of 10 users. Keeping that data coming from backend is in ascending user id sequence.

3. New user is fetched afyter every 5 seconds till new user id reaches to the total items in the data set. And interval will stop after that and no new user is fetched afterwards. New user api is - 'https://reqres.in/api/users/${ItemId}'

4. User can add upto 10 favorite items in the list of favorites, the list is displayed on '/favorites' page. Add or remove favorites could be done clicking heart icon present in bottom right corner of each image on '/display-list' page. User can only see favorites from '/favorites' page, any addition/removal is allowed there.

5. User can navigate to favorites page by clicking link on top right corner and back to display page similarly.

6. Error handling and unit test cases ate written for all possible scenarios

7. ESLint in added to the project.

8. There could be more scenarios where data discrepencies could be there from BE. Data processing could be done based on that. This application is implemented keeping in mind data from BE is in sequence and no discrepency is there.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
