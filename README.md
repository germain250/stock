# Stock XY - Stock Management System

Welcome to the **Stock XY** project! This stock management system is built using **Node.js** and **MongoDB** for the backend, with a **Vue.js** frontend. The system handles product management, stock-in, stock-out operations, and more.

## Table of Contents

1. [Installation](#installation)
2. [Git Workflow](#git-workflow)
3. [Running the Application](#running-the-application)
4. [Contributing](#contributing)
5. [License](#license)

---

## Installation

To get started with **Stock XY**, follow these steps to set up both the **backend** and **frontend**.

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/germain250/stock_xy.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd stock_xy/backend
    ```

3. Install the backend dependencies:

    ```bash
    npm install
    ```

4. Start the backend server using **nodemon**:

    ```bash
    npx nodemon index.js
    ```

    The backend API will be running on `http://localhost:5000` (or another port if configured).

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm run dev
    ```

    The frontend will be running on `http://localhost:3000`.

---

## Git Workflow

To contribute to the project, follow this Git workflow for smooth collaboration:

1. **Fork the Repository:**  
   Start by forking the repository to your own GitHub account.

2. **Clone Your Fork:**  
   Clone your forked repository locally:

    ```bash
    git clone https://github.com/your-username/stock_xy.git
    ```

   Navigate to the project directory:

    ```bash
    cd stock_xy
    ```

3. **Create a New Branch:**  
   Before making any changes, create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Changes:**  
   Make the necessary changes to the codebase.

5. **Commit Your Changes:**  
   After making your changes, commit them:

    ```bash
    git add .
    git commit -m "Add a clear description of the changes"
    ```

6. **Push Changes:**  
   Push your changes to your fork:

    ```bash
    git push origin feature/your-feature-name
    ```

7. **Create a Pull Request:**  
   Go to your repository on GitHub and create a pull request (PR) to merge your branch into the main branch of the original repository.

8. **Review & Merge:**  
   Once your pull request is reviewed, it will be merged into the main branch.

9. **Sync with the Original Repository:**  
   After your PR is merged, update your fork with the latest changes from the main repository:

    ```bash
    git fetch upstream
    git checkout main
    git merge upstream/main
    ```

---

## Running the Application

Follow these steps to run both the **backend** and **frontend** servers locally:

### Running the Backend

1. Navigate to the backend directory (if not already there):

    ```bash
    cd backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npx nodemon index.js
    ```

    The backend will be accessible at `http://localhost:5000`.

### Running the Frontend

1. Navigate to the frontend directory (if not already there):

    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm run dev
    ```

    The frontend will be accessible at `http://localhost:3000`.

---

## Contributing

We welcome contributions to **Stock XY**! If you'd like to contribute, please follow the Git workflow outlined above and ensure that your changes are well-tested. You can contribute by:

- Reporting bugs or issues.
- Adding new features.
- Improving the documentation.
- Refactoring code.

Please adhere to the following guidelines for pull requests:

- Provide a clear and descriptive commit message.
- Include tests for new features or bug fixes where possible.
- Follow the existing code style and structure.

---

## License

This project is licensed under the **MIT License**. See the LICENSE file for more details.
