# Stock XY - Stock Management System

Welcome to the **Stock XY** project! This is a stock management system built with Node.js and MongoDB on the backend and a frontend built with Vue.js. It allows for managing products, stock-in, stock-out operations, and more.

## Table of Contents

1. [Installation](#installation)
2. [Git Workflow](#git-workflow)
3. [Running the Application](#running-the-application)
4. [Contributing](#contributing)
5. [License](#license)

---

## Installation

To get started with the Stock XY project, follow these steps to set up both the **backend** and **frontend**.

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/germain250/stock_xy.git

    Navigate to the backend directory:

cd stock_xy/backend

Install backend dependencies:

npm install

Start the backend server using nodemon:

    npx nodemon index.js

    The backend API will be running on http://localhost:5000 (or another port if configured).

Frontend Setup

    Navigate to the frontend directory:

cd ../frontend

Install frontend dependencies:

npm install

Start the frontend server:

    npm run dev

    The frontend will be running on http://localhost:3000.

Git Workflow

To ensure smooth collaboration, follow this Git workflow when contributing to the project:
1. Fork the Repository

If you're looking to contribute, start by forking the repository to your own GitHub account.
2. Clone Your Fork

Clone your forked repository locally:

git clone https://github.com/your-username/stock_xy.git

Navigate to the project directory:

cd stock_xy

3. Create a New Branch

Before making any changes, create a new branch to work on:

git checkout -b feature/your-feature-name

Replace your-feature-name with a descriptive name for your branch (e.g., feature/product-management).
4. Make Changes

Make your changes to the codebase as needed.
5. Commit Your Changes

After making your changes, commit them to your branch:

git add .
git commit -m "Add a clear description of the changes"

6. Push Changes

Push your changes to your fork:

git push origin feature/your-feature-name

7. Create a Pull Request

Go to your repository on GitHub and create a pull request (PR) to merge your branch into the main branch of the original repository.
8. Review & Merge

Once your pull request is reviewed, it will be merged into the main branch.
9. Sync with the Original Repository

After your PR is merged, make sure your fork is up to date with the main repository by fetching the latest changes:

git fetch upstream
git checkout main
git merge upstream/main

Running the Application

To run both the backend and frontend servers locally, follow these steps:
Running the Backend

    Navigate to the backend directory (if not already there):

cd backend

Install the backend dependencies:

npm install

Start the backend server:

    npx nodemon index.js

    The backend will be accessible at http://localhost:5000.

Running the Frontend

    Navigate to the frontend directory (if not already there):

cd frontend

Install the frontend dependencies:

npm install

Start the frontend server:

    npm run dev

    The frontend will be accessible at http://localhost:3000.

Contributing

We welcome contributions to the Stock XY project! If you'd like to contribute, please follow the Git workflow outlined above and ensure that your changes are well-tested. You can contribute by:

    Reporting bugs or issues.
    Adding new features.
    Improving the documentation.
    Refactoring code.

Please ensure that all pull requests adhere to the following guidelines:

    Provide a clear and descriptive commit message.
    Include tests for new features or bug fixes where possible.
    Follow the existing code style and structure.

License

This project is licensed under the MIT License - see the LICENSE file for details.