<template>
  <div>
    <top-toolbar/>
    <div class="router-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import TopToolbar from './components/TopToolbar';

  export default {
    name: 'App',
    components: { TopToolbar }
  }
</script>

<style>
  .router-container {
    padding: 30px;
  }

  #nprogress .bar {
    background: var(--md-theme-default-primary) !important;
  }
</style>
