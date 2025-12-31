# RELIVATOR E-commerce React app

## How to Configure ShadcnUI in React/Vite Project

```js
// First install tailwind CSS
npm install tailwindcss @tailwindcss/vite
```

## Configure in vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## Create a file in `root` directory of project

- named `jsconfig.json`
- then, write this

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Then run the shadcn installation command:

```cmd
npx shadcn@latest init
```
