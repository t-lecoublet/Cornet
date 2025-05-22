# DaisyUi vue kit

Vue 3 component library for daisyUI without node_modules limitations.

## Why

DaisyUI is a Tailwind CSS component library that provides a set of pre-designed UI components. However, it is not designed to be used as a Vue component library. This project aims to provide a set of Vue components that are based on daisyUI's design principles and can be easily integrated into Vue applications.
This library is designed to be used as components next to your own components, as a library without being in node_modules. That allows to use and modify the library without having to fork, publish it etc.

## Requirements

- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [DaisyUI](https://daisyui.com/docs/install/)
- [Vue 3](https://vuejs.org/guide/introduction.html)

## Installation

### Method 1: Clone this vue repository

```bash
git clone git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git
```

### Method 2: Download only lib directory from branch lib (for existing projects)

If you want to use the library in an existing project, you can download only the `lib` directory from the [lib](https://gitlab.limos.fr/hub-isima/daisyui-vue-kit/-/tree/lib?ref_type=heads) branch of the repository. This will allow you to use the library without having to clone the entire repository.

At the source of your project, run the following command to clone the `lib` branch of the repository:

```bash
git clone git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git -b lib
```

Install the local directory as a dependency with :

```bash
npm install ./lib
```

OR
Add this line to your dependency file (package.json):

```json
"dependencies": {
  "daisyui-vue-kit": "file:lib"
}
```

Then, run your installation command with your package manager like `npm install` to install the dependencies.

Finally add the vite plugin and import the lib in your css file:

```javascript
// vite.config.js
import vueDaisyUI from 'daisyui-vue-kit/plugin-vite'

// ... Existing code
export default defineConfig({
  plugins: [
    vueDaisyUI({
      showOutput: true
    }),
  ]
})
```

```css
/* your.css */
@import "tailwindcss";
@import "daisyui-vue-kit/css";
@plugin "daisyui";
```

## Storybook

Library also provide storybook stories to test components. So you can install it and run daisyui-vue-kit stories.

See [storybook](https://storybook.js.org/docs/vue/get-started/install) documentation for more information.