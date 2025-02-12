<template>Hello World</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
</script>

<style lang="scss">
@import url('transitions.scss');

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box !important;
  -webkit-user-drag: none;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body,
html {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}

body {
  display: grid;
  place-items: center;

  line-height: 1;
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
</style>
