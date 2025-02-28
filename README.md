# react-hook-storage 🛢️

[![NPM version](https://img.shields.io/npm/v/@fronrich/react-hook-storage)](https://www.npmjs.com/package/@fronrich/react-hook-storage)
[![License: MIT](https://img.shields.io/npm/l/@fronrich/react-hook-storage)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/fronrich/react-hook-storage/ci.yml?branch=main)](https://github.com/fronrich/react-hook-storage/actions)
[![GitHub stars](https://img.shields.io/github/stars/fronrich/react-hook-storage)](https://github.com/fronrich/react-hook-storage/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/fronrich/react-hook-storage)](https://github.com/fronrich/react-hook-storage/issues)

A lightweight React library that leverages `localStorage` for persistent state management through custom hooks and a context provider. Ideal for managing global or complex application state (like an app state or game save state) that persists across page reloads.

---

## Table of Contents

- [react-hook-storage 🛢️](#react-hook-storage-️)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Why Use LocalStorage for State Management?](#why-use-localstorage-for-state-management)
  - [Usage](#usage)
    - [Using `useStorage`](#using-usestorage)
      - [Example: Counter Component](#example-counter-component)
      - [Example: Username Input](#example-username-input)
    - [Using `StorageProvider` \& `useStorageContext`](#using-storageprovider--usestoragecontext)
      - [Example: Wrapping Your Application](#example-wrapping-your-application)
      - [Example: Accessing and Updating Shared State in a Child Component](#example-accessing-and-updating-shared-state-in-a-child-component)
  - [Contributing](#contributing)
  - [License](#license)

---

## Installation

Install via npm:

```bash
npm install react-hook-storage
```

Or using yarn:

```bash
yarn add react-hook-storage
```

---

## Why Use LocalStorage for State Management?

While React's built-in state management (e.g., `useState`, `useReducer`) works well for ephemeral state, it doesn't persist across browser sessions or page refreshes. Leveraging `localStorage` offers several benefits:

- **Persistence:** State is retained even after the user refreshes the page.
- **Global Access:** When combined with React Context, persistent state can be shared across multiple components.
- **Offline Capability:** Retains state even when the application is offline.

---

## Usage

### Using `useStorage`

The `useStorage` hook synchronizes a state variable with `localStorage`. It reads the initial value from `localStorage` based on the specified key and, if none exists, sets it to the provided default value.

#### Example: Counter Component

```jsx
import React from "react";
import { useStorage } from "@fronrich/react-hook-storage";

function Counter() {
  // 'counter' is used as the key in localStorage, with a default value of 0.
  const [count, setCount] = useStorage({ name: "counter", defaultValue: 0 });

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

#### Example: Username Input

```jsx
import React from "react";
import { useStorage } from "@fronrich/react-hook-storage";

function UsernameInput() {
  // Uses 'username' as the key in localStorage with a default empty string.
  const [username, setUsername] = useStorage({
    name: "username",
    defaultValue: "",
  });

  return (
    <div>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}

export default UsernameInput;
```

---

### Using `StorageProvider` & `useStorageContext`

For managing complex, cross-component state (such as an application state or game save state), combine the `StorageProvider` with the `useStorageContext` hook. This approach ensures that the state is shared and synchronized across your components.

#### Example: Wrapping Your Application

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useStorage } from "@fronrich/react-hook-storage";
import { StorageProvider } from "@fronrich/react-hook-storage";
import Dashboard from "./Dashboard";

function Root() {
  // Initialize storage with a complex object representing app state or game save state.
  const [appState, setAppState] = useStorage({
    name: "appState",
    defaultValue: {
      score: 0,
      level: 1,
      userSettings: { theme: "light" },
    },
  });

  return (
    <StorageProvider getter={appState} setter={setAppState}>
      <Dashboard />
    </StorageProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
```

#### Example: Accessing and Updating Shared State in a Child Component

```jsx
import React from "react";
import { useStorageContext } from "@fronrich/react-hook-storage";

function Dashboard() {
  // Access the shared state and its updater from the context.
  const [appState, setAppState] = useStorageContext();

  const updateTheme = () => {
    setAppState({
      ...appState,
      userSettings: { ...appState.userSettings, theme: "dark" },
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(appState, null, 2)}</pre>
      <button onClick={updateTheme}>Set Dark Theme</button>
    </div>
  );
}

export default Dashboard;
```

---

## Contributing

Contributions are welcome and appreciated! If you have suggestions, bug reports, or improvements, please feel free to:

- Open an issue on the [GitHub repository](https://github.com/fronrich/react-hook-storage/issues).
- Submit a pull request.

Please follow the contribution guidelines outlined in the repository.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Created and maintained by [fronrich](https://github.com/fronrich).

Happy coding!
