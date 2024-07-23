## Application

    Welcome to the Product Management Application! This web app allows users to browse products, filter and sort them, and manage their shopping cart. It leverages Alpine.js for interactivity and fetches product data from a mock API.

## Getting Started
    To get started with this application, follow these instructions:

## Prerequisites
    Make sure you have the following dependencies installed:

Alpine.js for interactivity.
Fetch API for HTTP requests.
Installation
Clone the repository:


git clone <[repository-url](https://github.com/ChristopherTsh/Module-2_CHRTSH528_BCL2401_GroupA_Christopher-Tshoma-JSF01-main.git)>

npm install

## File Overview
# main.js
This file sets up the application with Alpine.js and manages core functionality.

# Key Features:

**State Management:** Handles products, filtered products, categories, and shopping cart state.
**Filtering & Sorting:** Filters products by category and search query, and sorts them by price.
**Cart Management:** Adds, removes, and updates items in the shopping cart. Calculates total cost including 

# Functions:

**init():** Initializes the application by fetching products and categories.
**filterProducts():** Filters products based on user input.
**sortProducts():** Sorts products by price.
**addToCart(product):** Adds a product to the cart.
**removeFromCart(product):** Removes a product from the cart.
**updateQuantity(product, quantity):** Updates the quantity of a product in the cart.

# Api.js
This file includes functions to fetch product and category data from the API.

## Functions:

**fetchProducts():** Retrieves a list of products.
**fetchCategories():** Retrieves a list of product categories.

## Error Handling:

*Both functions handle errors and log issues to the console.*
## Usage
**Initialize Alpine.js:** Ensure Alpine.js is included and configured in your project.
**Fetch Data:** The app will automatically fetch product and category data from the API on initialization.
**Interact:** Use the app to filter, sort, and manage products in the shopping cart.
## Dependencies
**Alpine.js:** Lightweight JavaScript framework for building interactive UI components.
**Fetch API:** Native JavaScript API for making HTTP requests.
