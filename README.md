# Full Stack -web development project (5 credits)

## About the project

### This repository was used for development phase.

### Client repository is [here](https://github.com/shonkam/small-shops-client) and it's running [here](https://small-shops-client.herokuapp.com/) Use instructions are on repo's [README](https://github.com/shonkam/small-shops-client/blob/main/README.md)

### API repository is [here](https://github.com/shonkam/small-shops-api) and it's running [here](https://small-shops-api.herokuapp.com/)

### The changes on these repositories at the time of writing are only regarding Heroku deployment along with few minor fixes.

---

## Time keeping

| Task | Commit Date | Hours | Hours total |
|-----|-----|-----|-----|
| Init project | 02.12.2021 | 1 | 1 |
| Added router to the project, started Login view implementation | 02.12.2021 | 1 | 2 |
| Added ApolloServer with a structure, where each different type (E.g. User) has their own file, which holds the typeDefs and resolvers of that type.  | 04.12.2021 | 3 | 5 |
| Connected MongoDB to the project | 06.12.2012 | 1 | 6 |
| Implemented a "allUsers" query and a "newUser" mutation | 07.12.2021 | 2 | 8 |
| Login mutation with JWT token | 08.12.2021 | 2 | 10 |
| Created a test environment with a MongoDB connection for the backend with Jest
Implemented deleteUser mutation
Implemented 4 test cases for testing users
Spent way too much time trying to configurate testing so that you wouldn't need to force exit, will take a second round later | 14.12.2021 | 8 | 18 |
| Implemented mutations for adding and deleting a store
Implemented a query to fetch data from stores
Implemented 3 test cases for testing stores | 14.12.2021 | 2 | 20 |
| Sorted testing
Added test helper
Improved project structure | 15.12.2021 | 3 | 23 |
| README fixes | 16.12.2021 | 0 | 23 |
| Designing the data structure and backend logic
Improved mongoose models
Converted user into customer
Implemented login mutation for stores
Added tests for testing the behaviour during bad inputs | 19.12.2021 | 5 | 28 |
| Added models for products and orders
Improved existing models
Implemented JWT verification for requests 
Implemented mutation for adding a product
Implemented query for products | 20.12.2021 | 5 | 33 |
| Improved test cases
Improved mongoose models
Added authorization to deleteStore mutation | 11.01.2022 | 4 | 37 |
| Connected frontend to backend
Implemented signing up functionality to frontend | 11.01.2022 | 2 | 39 |
| Implemented login functionality to frontend | 12.01.2022 | 1 | 40 |
| Added Redux for state management
Implemented logout functionality
Changes for behaviour depending if user is signed in | 19.01.2022 | 4 | 44 |
| Implemented login functionality for stores
Adapted formik into MUI
Header and Login styling with MUI | 20.01.2022 | 2 | 46 |
| Sign up styling with MUI
Functionality to register either as a customer or store | 22.01.2022 | 4 | 50 |
| Improved project structure |
| A view for store to add a new product | 25.01.2022 | 2 | 52 |
| Functionality to add new products
Minor bug fixes | 25.01.2022 | 3 | 55 |
| Functionality to fetch product information
A view for store to examine currently listed products | 26.01.2022 | 3 | 58|
|Improved routing and headers
Improved the structure of frontend
Multiple smaller improvements| 27.01.2022 | 3 | 61 |
|A view and functionality for store to fetch and customize a single product | 28.01.2022 | 5 | 66 |
| Added dotenv example
When store request all products, the backend returns only the store's own products
Bug fixes | 05.02.2022 | 2 | 63 |
Functionality for the store to delete products
Refetch queries | 07.02.2022 | 2 | 65 |
|Ability to set background picture URL and a short description for your store
Store profile view | 21.02.2022 | 3 | 68 |
|View for all stores
Ability to check the products of the selected store | 24.02.2022 | 3 | 71 |
|Designing the UI, initial implementation of the single product view|05.03.2022|3|74|
|Implementing and designing customer UI | 07.03.2022 | 4 | 78 |
|Shopping cart view|08.03.2022|3|81|
|Reducer and the logic to check that all the items are ordered from the same store |09.03.2022|1|82|
|Func to create new order, minor improvements|09.03.2022|1|83|
|Create order from frontend|10.03.2022|2|85|
|Orders view|11.03.2022|1|86|
|Improvements on Orders view and disabling product purchasing if the product is out of stock|11.03.2022|2|88|
|ESLint configuration and part of corrections|11.03.2022|1|87|
|ESLint configuration and corrections on frontend |12.03.2022|3|90|
|Backend ESLing configuration and corrections
Store validation for product updating|13.03.2022|1|91|
|Store's orders view
Structure and functionalities for guest users
Connected styling across the app | 13.03.2022| 3 | 94 |
|Deploying to Heroku
Small fixes|14.03.2022|8|102|

---
###  [Project instructions](https://github.com/FullStack-HY/misc/blob/main/project.md)