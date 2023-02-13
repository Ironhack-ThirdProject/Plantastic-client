
![Logo](https://res.cloudinary.com/dm6a8aocc/image/upload/v1676296604/third-project/image-name-removebg-preview_naj2ku.png)


# Plantastic

Plantastic is an e-commerce website built with the MERN stack dedicated to offering a unique shopping experience for plant enthusiasts. The design is responsive, providing an optimal user experience across all devices. Users can easily manage their cart, post reviews, complete secure transactions using Stripe, and receive confirmation emails for their orders. The admin is also equipped with a dynamic dashboard, displaying sales and inventory data in real-time.

![App Screenshot](https://res.cloudinary.com/dm6a8aocc/image/upload/v1676297180/third-project/Screenshot1_xoz1qm.png)
## Authors

- [@vrabec94](https://github.com/vrabec94)
- [@marinedrp](https://github.com/marinedrp)


## Tech Stack

**Client:** React.js, Chart.js, MDBootstrap

**Server:** MongoDB, Express.js, Node.js, Stripe, Nodemailer, Cloudinary

## Table of Contents

* [Features](#features)
* [Environment Variables](#environment-variables)
* [Run Locally](#run-locally)
* [Demo](#demo)
* [Roadmap](#roadmap)
* [Server](#server)
## Features

- Responsive Web Design / Cross platform
- User Authentification
- Protected routes
- Conditional rendering
- Search Product by Category
- Average star rating for each product

Admin:
- Product and Inventory Management: admins can create, edit and delete all products of the website.
- Admin Dashboard built with Chart.js: Admin have access to real-time data visualizations of key performance indicators and financial metrics enabling informed decision making.
    - Financial data: line chart with monthly revenue and orders, total orders, average order value and average products ordered.
    - Inventory data: total stock, inventory count and unique products by tag and category displayed with dougnhut charts and tables, low stock products (10 items or less).

Customers:
- Shopping Cart: customers can manage their purchases with a real-time shopping cart that allows for adding, editing and removing products.
- Reviews: customers can create, edit and delete their reviews for each product.
- Star rating system: users can add and modify their rating for each review.
- User profile: users can keep track of their order history, see and edit or delete their reviews directly in their profile.
- Secure payment processing: payments are processed via a secure Stripe checkout session, with customers redirected to a confirmation page after payment completion or cancellation.
- Confirmation e-mail: customers receive personalized confirmation emails via Nodemailer, upon successful payment completion.
## Environment Variable

To run this project, you will need to add the following environment variable to your .env file

`REACT_APP_SERVER_URL`: URL of your server


## Run Locally

Clone the project:

```bash
  git clone https://github.com/Ironhack-ThirdProject/Plantastic-client
```

Install the dependencies:

```bash
  npm install
```

Run the project:

```bash
  npm start
```


## Demo

Deployed project on Netlify: https://plantastic-shop.netlify.app/




## Server

You can check out the repository of our server [here](https://github.com/Ironhack-ThirdProject/Plantastic-server).