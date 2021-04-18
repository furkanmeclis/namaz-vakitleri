<template>
  <div id="app">

    <router-view></router-view>
    <Settings />
  </div>
</template>

<script>

import Settings from "./components/Settings";
export default {
  name: 'App',
  components:{
    Settings
  }
}
</script>


