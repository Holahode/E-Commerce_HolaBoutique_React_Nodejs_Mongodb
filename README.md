# Final Project

1. Specification
2. System Design
3. Install Tools
4. Create React Application
5. Create Git Repository
6. List products
   a. Create Products Array
   b. Add Product Images
   c. Render Products
   d. Style Products
7. Routing
   a. npm i react-router-dom
   b. Create route for home screen
   c. Create router for product screen
8. Create Node.js Server
   a. run npm init in root folder
   b. update package.json set type: module
   c. Add .js to imports
   d. npm install express
   e. Create Server.js
   f. Add start command as backend/Server.js
   g. Require express
   h. Create route for /
   i. Move products.js from frontend to backend
   j. Create route for api/products
   k. return products and run npm start
9. Fetch products from backend
   a. Set proxy in package.json
   b. npm install axios
   c. Use state hook
   d. Use effect hook
   e. Use reducer hook
10. Manage state by reducer hook
    a. Define reducer
    b. Update fetch data
    c. get state from usReducer
11. Bootstrap UI framework
    a. npm i react-bootstrap bootstrap
    b. UpdateApp.js
12. Product and rating component
    a. Create rating component
    b. Create product component
    c. Use Rating component in Product component
13. Create product detail screen
    a. Fetch product from backend
    b. Create 3 columns for image, info and action
14. Implement Add to cart
    a. Create react context
    b. Define reducer
    c. Create store provider
    d. Implement add to cart button click handler
15. Create cart screen
    a. Create two columns
    b. Display items list
    c. Create action column
16. Complete cart screen
    a. Click handler for -/+ items
    b. Click handler for remove items
    c. Click handler forcheckout
17. Create signin screen
    a. Create signin form
    b. Add email and password
    c. Add signin button
18. Connect to mongodb database
    a. Create atlas mongodb database
    b. Install local mongodb database
    c. npm install mongoose
    d. Connect to mongodb database

19. Create signin backend API
    a. Create signin API
    b. npm install jsonwebtoken
    c. Define generatetoken
20. Complete signin screen
    a. Handle submit action
    b. Save token in a store and local storage
    c. Show user name in header
21. Create shipping screen
    a. Create form inputs
    b. Save shipping address in local storage
    c. Checkout progress bar
22. Create signup screen
    a. Create input form
    b. Handle submit action
    c. Create backend API
23. Implement select payment method
    a. Credit input forms
    b. Handle submit
24. Create place order screen
    a. Show cart items, payment and address
    b. Handle place order action
    c. create order create api
25. Implement place order action
    a. Handle place order action
    b. create order create api
26. Create search screen
    a. Create API forsearching products
    b. Display results
