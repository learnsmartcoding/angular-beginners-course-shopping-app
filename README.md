# Lsc Essential Products

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

# Learn Step by Step 

## Local system setup
1. Install Visual Studio Code (IDE)
    https://code.visualstudio.com/
2. Install NodeJS https://nodejs.org/en/
    Suggestions: install only recommended LTS version
3. Install Angular CLI 
     - open command prompt
     - use this command and install Angular CLI 
     -  <code>npm install -g @angular/cli</code>
### Create new project
1. Open the folder location in command prompt.
2. Create new project using command 
   <code>ng new <project_name></code> 
E.g. <code>ng new lsc-essential-products</code>
3. Choose the options as per the demo and finally, the npm package will be installed.
4. To run the app, use command
<code>ng serve </code>

### Create Component
1. To create a component using Angular CLI command, use the below command.
<code>ng g c <component_name></code>
E.g. <code>ng g c home</code>. 
    - <code>g </code>denotes generate, <code>c </code> denotes component
    - you can also use command as <code>ng generate component  home</code>
2. Data binding with more examples
3. Separated header component and brought top navigation
4. Created models based on API response and using static data we built home component. Home component has products displayed. We also did create spinner component.
5. Created shared module and refactored product view component to reuse it across different pages.
6. Creating product feature module and various component to reuse.
7. Use of HTTP service to fetch real data from API and refactor existing home component to replace static data
8.Input() usage to pass data.
9.Routing
10. Output usage for product page
11. Product Detail page development
12. Manage Product - Complete CRUD operation for Product using Reactive Forms

### API details
API used to develop this project is below
<code>https://essentialproducts-api.azurewebsites.net/swagger/index.html</code>
