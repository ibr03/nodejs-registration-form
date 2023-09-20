# Node.js Registration Form with Express and MongoDB

This is a simple Node.js web application that implements a registration form using Express.js, MongoDB, and EJS templates. Users can fill out the registration form, and their information is stored in a MongoDB database. After successful registration, users can view their details on a confirmation page.

## Features

- User registration with the following fields:
  1. First Name (Alphabets only)
  2. Last Name (Alphabets only)
  3. E-Mail (Valid email format)
  4. Country (Dropdown)
  5. State (Dropdown based on selected country)
  6. City (Dropdown based on selected state)
  7. Gender (Radio button)
  8. Date of Birth (Must be older than 14 years)
  9. Age (Calculated automatically based on date of birth)

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/ibr03/nodejs-registration-form.git
cd nodejs-registration-form
```
2. Install required dependencies:

```
npm install
```

3. Configure MongoDB: Set up your MongoDB connection by creating a .env file and store your MONGO_URI and PORT variables.

4. Start the application:

```
npm start
```

5. Access the application in your web browser at http://localhost:{YOUR-PORT}.