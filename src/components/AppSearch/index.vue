<template>
    <div class="sys-search">
      <slot></slot>
      <hr style="margin-top: 0px"/>
    </div>
</template>

<script>
    export default {
        name: "app-search"
    }
</script>

<style scoped>
  .sys-search{
    margin-bottom: 10px;
  }
</style>
