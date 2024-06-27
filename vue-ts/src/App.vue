<template>
  <h1>Hello World</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style lang="scss">
@import './utils.scss', './transitions.scss';

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  -webkit-user-drag: none;
}

body,
html {
  width: 100vw;
  height: 100vh;
}

body {
  display: grid;
  place-items: center;
}

a,
input,
button,
textarea {
  all: unset;
}

[contenteditable] {
  outline: none;
  border: none;
}

button:hover {
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
}

::-webkit-scrollbar,
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  display: none;
}

.scroll-drag {
  &:hover {
    cursor: -webkit-grab;
  }

  &:active {
    cursor: -webkit-grabbing;
  }
}
</style>
