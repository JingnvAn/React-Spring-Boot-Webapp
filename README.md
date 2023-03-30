# The Seller Helper Web App
This project is a demo web application using Spring Boot for backend and [Next.js](https://nextjs.org/) (buit on top of the React framework) for Frontend.

## Get Started
We'll use docker to run this project. The following instruction assumes you have docker installed. If you do not have docker setup, check out the [docker docs](https://docs.docker.com/desktop/install/mac-install/).

1. **Pull the backend image from Docker Hub**
```
docker pull jingnu/seller-helper-api-server:latest
```

2. **Create and run a new container for the backend from the image we just pulled**
```
docker run -d -p8080:8080 jingnu/seller-helper-api-server:latest
```
This command returns an id. Please take a note of the returned id for later debug purpose.

3. **Check if the container is running**,
```
docker ps | grep seller-helper-api-server:latest
```
you should see an output like:
```
4442d95d8fb8   seller-helper-api-server:latest   "java -jar seller-he…"   3 hours ago      Up 3 hours      0.0.0.0:8080->8080/tcp   naughty_chatterjee
```
In case you do not see the above output, use `docker logs <id-returned-from-step-2>` to debug.

4. **Pull the frontend image from Docker Hub**
```
docker pull jingnu/seller-helper-frontend
```

5. **Create and run a new container for the frontend from the image we just pulled**
```
docker run -p 3000:3000 seller-helper-frontend
```
You should see the above command returned: `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`. Now if you go to the localhost, you should see the app.

6. **All set! You should be able to interacting with the app on [`http://localhost:3000`](http://localhost:3000)!**

## API Documentation
### Base URL

http://localhost:8080/product

### Endpoints
1. **GET /all**
    
   Get all products in the database.
   - Request Arguments: None
   - Returns a list of all products in the database as a JSON string.
   - Example: `curl http://localhost:8080/product/all`

2. **GET /{id}**

    Returns a single product by ID in JSON format. If the product with the specified ID is not found, returns a 404 Not Found status code.
    - Required request Arguments: id (int)
    - Returns a product with the given id as a JSON string.
    - Example: `curl http://localhost:8080/product/1`

3. **GET /shipping-date/{id}**

   Calculates and returns the shipping date for a product by ID in format (yyyy-MM-dd). If the product with the specified ID is not found, returns a 404 Not Found status code.
    - Required request Arguments: id (int)
    - Returns the shipping date of the product with the given id as a JSON string.
    - Example: `curl http://localhost:8080/product/shipping-date/1`

4. **GET /shipping-date (with query parameters)**

    Calculates and returns the shipping date for a given purchase date in ISO date format (yyyy-MM-dd) and maximum days to ship. The endpoint also accepts a query parameter to indicate whether the product can be shipped on weekends or not. If the purchase date is not in a valid format or any error occurs 
during the calculation, returns a 500 Internal Server Error status code.
    - Required request Arguments: none
    - Request Query Parameters:
        - purchaseDate (String): The purchase date of the product in ISO date format (yyyy-MM-dd)
        - maxDaysToShip (int): The maximum number of days to ship the product
        - shipOnWeekends (boolean): Whether the product can be shipped on weekends
    - Returns the shipping date of the product with the given id as a JSON string.
    - Example: `curl http://localhost:8080/product/shipping-date?purchaseDate=2023-03-30&maxDaysToShip=2&shipOnWeekends=true`

5. **POST /create**

    Creates a new product in the database. If the product is successfully created, returns a 201 Created status code. If the product is not created, returns a 500 Internal Server Error status code.
    - Required request body:
        - productName (String): The name of the product
        - inventoryQuantity (int): The quantity of the product
        - maxBusinessDaysToShip (int): The maximum number of days to ship the product
        - shipOnWeekends (boolean): Whether the product can be shipped on weekends
    - Request Body: A JSON string representing the product to be created.
    - Example: `curl -X POST -H "Content-Type: application/json" -d '{"productMame": "Product 1","maxBusinessDaysToShip": 2, "shipOnWeekends": true}' http://localhost:8080/product/create`

6. **GET /get-all-holidays**

    Returns a list of all holidays in the database.
    - Required request Arguments: None
    - Returns a list of all holidays in the database as a JSON string.
    - Example: `curl http://localhost:8080/product/get-all-holidays`
   
7. **POST /set-user-holidays**

    Add a list of holidays to the database. If the holidays are successfully added, returns a 200 Created status code. If the holidays are not added, returns a 500 Internal Server Error status code.
    - Request Body: A JSON string representing the list of holidays in the format of (MM-dd-yyyy) to be added.
    - Example: `curl -X POST -H "Content-Type: application/json" -d '["01-01-2024", "01-18-2024", "02-15-2024", "05-31-2024", "07-05-2024", "09-06-2024", "10-11-2024", "11-11-2024", "11-25-2024", "12-24-2024", "12-25-2024", "12-31-2024"]' http://localhost:8080/product/set-user-holidays`

*There are a few other endpoints dded for the purpose of developing and debugging, since the frontend is not interacting with them they
are not documented here. However, feel free to check out the source code for more details.

