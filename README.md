---

# Task Management Application - Frontend

This repository contains the frontend of a Task Management Application built with React and TypeScript. The application interacts with a .NET Core backend, providing users the ability to manage tasks and receive real-time updates using SignalR.

## Features

- **Create, Read, Update, Delete Tasks**: Seamlessly manage tasks with a modern UI.
- **Real-Time Notifications**: Stay updated with real-time notifications for task creation, updates, and deletions using SignalR.
- **Task Status Indicators**: Visual indicators using Material-UI icons to represent the completion status of tasks.
- **Responsive Design**: Optimized for various screen sizes, ensuring a smooth user experience across devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that scales.
- **Material-UI**: Popular React UI framework for creating responsive, attractive UIs.
- **SignalR Client**: For handling real-time updates from the backend.

## Getting Started

### Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/receperdog/task-management-frontend.git
    cd task-management-frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure SignalR Connection**

    Ensure that the SignalR connection is correctly set up in the `signalRConnection.ts` file. The connection URL should match your backend SignalR Hub URL:

    ```typescript
    import * as signalR from '@microsoft/signalr';

    const connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5108/taskhub') // Match this with your backend Hub URL
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.start().catch(err => console.error('SignalR Connection Error: ', err));

    export default connection;
    ```

4. **Start the Development Server**

    ```bash
    npm start
    ```

    The frontend should now be running on `http://localhost:3000`.

## Project Structure

- **`src/components/`**: Contains all React components, such as `TaskListView`, `TaskFormView`, and `TaskDetailView`.
- **`src/services/`**: Includes services for interacting with the backend API and managing SignalR connections.
- **`src/App.tsx`**: The main component that sets up routing and renders different views.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production.

## Clean Up Unnecessary Files

To keep your repository clean, ensure the following files are excluded:

### `.gitignore`

```plaintext
node_modules/
build/
.env
.vscode/
.DS_Store
```

Ensure you do not commit unnecessary files such as `node_modules/`, `build/`, or IDE-specific settings.

## Future Enhancements

- **User Authentication**: Integrate user authentication for personalized task management.
- **Task Prioritization**: Introduce features to set task priorities.
- **Enhanced Notifications**: Extend real-time notifications to include additional events or task types.

## License

This project is licensed under the MIT License.

---
