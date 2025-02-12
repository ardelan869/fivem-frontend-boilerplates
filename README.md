# 🚀 FiveM Frontend Boilerplates

A collection of frontend boilerplates for developing FiveM UIs with popular frameworks like [React](https://react.dev/), [Vue](https://vuejs.org/), and [Solid](https://solidjs.com/).

> [!NOTE]
> Inspired by and based on [FiveM React Boilerplate Lua](https://github.com/project-error/fivem-react-boilerplate-lua)

## ✨ Features

This boilerplate includes a set of helpful libraries (`/lib`) to make your development smoother and more efficient.

---

### 🔧 `/constants`

- **`isEnvBrowser: boolean`**  
  Determines if the current environment is a browser.  
  _Usage: Conditionally execute code depending on the environment._

- **`noop: () => void`**  
  A no-op function that does nothing.  
  _Usage: Useful as a placeholder or default callback._

---

### 🎨 `/css`

- **`vh: (i: number) => string`**  
  Converts a number (representing `px`) to a `vh` (viewport height) value.  
  _Example: `vh(100)` returns `"9.2593vmin"`_

- **`vw: (i: number) => string`**  
  Converts a number (representing `px`) to a `vw` (viewport width) value.  
  _Example: `vw(50)` returns `"4.6296vmin"`_

- **`vmin: (i: number) => string`**  
  Converts a number (representing `px`) to a `vmin` value (smallest viewport dimension).  
  _Example: `vmin(25)` returns `"2.3148vmin"`_

---

### 🛠️ `/hooks`

- **`useEvent: (event: string, callback: (...args: unknown[]) => void) => void`**  
  Listens to the specified window events and runs the callback.  
  _Example: `useEvent("click", handleClick)` to capture click events._

- **`useNuiEvent: (action: string, callback: (...args: unknown[]) => void) => void`**  
  Listens for a Nui event and triggers the provided callback.  
  _Example: `useNuiEvent("actionName", handleNuiEvent)`_

- **`useDebugData: (events: { action: string; data: any }[], timer?: number) => void`**  
  Similar to `debugData`, but wrapped inside a `useEffect` (React) or `onMount` (Vue/Solid) hook.  
  _Example: Use this for triggering debug events in the browser environment._

- **`useOutsideClick: <T extends HTMLElement>(ref: React.RefObject<T>, handler: (event: MouseEvent) => void) => void`**  
  Calls the `handler` function when a click occurs outside the referenced element.  
  _Example: Close a dropdown when clicking outside of it._

- **`useDebounce: <T>(value: T, delay = 500) => T`**  
  Returns a debounced version of the given `value`.  
  _Example: Prevent excessive API calls by debouncing user input._

---

### ⌨️ `/keys`

- **`useKeyEvent(action: 'keydown' | 'keyup', key: string | string[], handler: (data: KeyboardEvent) => void, options?: { ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean, metaKey?: boolean }) => void`**  
  Adds a keydown or keyup event listener to the window.  
  _Example: Capture keypresses like `useKeyEvent('keydown', 'Enter', handleKeyPress)`_

- **`useKeyUp(key: string | string[], handler: (data: KeyboardEvent) => void, options?: { ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean, metaKey?: boolean }) => void`**  
  Adds a keyup event listener.  
  _Example: Detect when the user releases a key like `useKeyUp('Escape', handleClose)`_

- **`useKeyDown(key: string | string[], handler: (data: KeyboardEvent) => void, options?: { ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean, metaKey?: boolean }) => void`**  
  Adds a keydown event listener.  
  _Example: Detect when the user presses a key like `useKeyDown('F1', handleToggleMenu)`_

---

## 📚 Documentation

Each of these hooks and utilities is designed to streamline frontend development for FiveM, providing built-in compatibility with Nui events and efficient handling of UI logic.

For further information and examples, please refer to the respective libraries' documentation:

- [React](https://react.dev/)
- [Vue](https://vuejs.org/)
- [Solid](https://solidjs.com/)

---

Feel free to explore and contribute! 😊
