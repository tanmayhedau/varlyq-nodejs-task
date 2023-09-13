
---

# Varlyq Node.js Task

This project is a Node.js API built using Express.js and MongoDB. It provides routes for managing posts and users, along with features like authentication using JWT tokens and Redis for caching.

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tanmayhedau/varlyq-nodejs-task.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd varlyq-nodejs-task
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Create an Environment File**

   Create a `.env` file in the root directory of the project and add the necessary environment variables. For example:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your_database
   JWT_SECRET=your_jwt_secret
   DEV_MODE=development
   ```

5. **Start the Server**

   - If you don't have nodemon installed:

     ```bash
     node server.js
     ```

   - If you have nodemon installed:

     ```bash
     nodemon server.js
     ```

   The server should now be running on the specified port.

6. **Use Postman Collection**

   Import the provided Postman collection to test the API endpoints.

## Environment Variables

- `PORT`: The port on which the server will run.
- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT token generation.
- `DEV_MODE`: development mode.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. You can also open an issue to report bugs or suggest new features.

## License

This project is licensed under the [MIT License](LICENSE).

---

