<template>
  <component is="router-link"
             class="nav-item"
             v-bind="$attrs"
             tag="li">
    <a class="nav-link">
      <slot>
        <p>{{name}}</p>
      </slot>
    </a>
  </component>
</template>
<script>
export default {
  name: "base-link" ,
  inheritAttrs: false,
  props: {
    name: String,
    tag: {
      type: String,
      default: "router-link"
    }
  }
};
</script>
<style>
</style>
