# Role Management System

This is a simple Role Management System built using React that allows users to manage roles and assign permissions. The system persists roles in the browser's `localStorage`, ensuring that data remains intact even after a page reload.

## Features

- **Persistent Data**: Roles and permissions are saved in `localStorage`, allowing data to persist across page reloads.
- **Role Creation**: You can add new roles by specifying a name and selecting from a set of available permissions (`Read`, `Write`, `Delete`).
- **Permission Management**: Each role can have multiple permissions, and users can toggle permissions on or off for each role.
- **Validation**: 
  - Role names cannot be empty.
  - Duplicate role names are prevented.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

## Usage

### Managing Roles

1. **Viewing Existing Roles**: The roles are displayed in a table with the role name and the assigned permissions.
   
2. **Adding a New Role**:
   - Enter a **role name** in the input field.
   - Select the **permissions** (Read, Write, Delete) by checking the corresponding checkboxes.
   - Click **Add Role** to create the new role.

3. **Role Validation**:
   - If the role name is empty, you will be alerted.
   - If the role already exists, you will be alerted.

4. **Data Persistence**: After adding a role, the data is automatically saved to `localStorage`. Upon reloading the page, the roles will persist.

### Example:
When you add a role called "Admin" with the permissions `Read` and `Write`, the table will update, and the role will be saved in `localStorage`. If you reload the page, the "Admin" role will still appear with the `Read` and `Write` permissions.

## Code Structure

- **Role Management Component**: 
   - The `Roles` component is responsible for displaying the list of roles, adding new roles, and managing permissions.
   - **State Variables**:
     - `roles`: Stores the list of roles.
     - `permissionsList`: A predefined list of permissions (`Read`, `Write`, `Delete`).
     - `newRole`: Stores the new role’s name and selected permissions.

- **Hooks**:
   - `useEffect`: 
     - Loads roles from `localStorage` when the component mounts.
     - Saves the updated roles to `localStorage` whenever roles change.

## Technologies Used

- **React**: The front-end library for building the user interface.
- **localStorage**: Used to persist role data across page reloads.
- **Tailwind CSS**: Used for styling the components.

## Example Screenshot

![Roles Management](./screenshot.png)

## Contributing

Feel free to open issues or pull requests if you have any suggestions, improvements, or bug fixes. If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).
```

### Key Sections in the README:
1. **Introduction**: Provides an overview of the project and its main functionality.
2. **Features**: Lists the primary features, such as persistent data storage and role creation.
3. **Installation**: Details the steps to clone, install dependencies, and run the project locally.
4. **Usage**: Describes how to manage roles, including validation and persistence.
5. **Code Structure**: A quick explanation of how the code is organized, focusing on React state and hooks.
6. **Technologies Used**: Lists React, localStorage, and Tailwind CSS as the main technologies used.
7. **Contributing**: Encourages others to contribute to the project and provides guidelines.
8. **License**: Mentions that the project is open-source and licensed under the MIT License.

Make sure to replace the `screenshot.png` link with an actual screenshot of your application if available. Let me know if you need further help!
