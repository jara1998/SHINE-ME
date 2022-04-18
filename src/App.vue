<template>
  <div>
    <button @click="to_uploader">upload your images</button>
    <button @click="view_images">View images</button>
    <router-view></router-view>
  </div>
</template>



<script type="text/javascript">
export default {
  name: 'App',
  components: {},
  data() {
    return {
    }
  },
  methods: {
    to_uploader () {
        this.$router.push("./upload-image")
        console.log("redirecting")
    },
    view_images () {
        this.$router.push("./view-images")
        console.log("redirecting")
    }
  }
  
}
</script>

<style>
html {
  min-height: 100%;
}
body {
  padding: 2em;
  /* background: linear-gradient(-45deg, #7ccea9, #ffffff); */
  background-color: #7ccea9;
  min-height: 100%;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1em;
}
.input-area {
  width: 28em;
  background-color: white;
  border-radius: 0.25em;
  text-align: left;
  padding: 2em;
  margin: 2em auto;
}
pre {
  overflow: auto;
  background-color: lightgrey;
  padding: 10px;
}
</style>
© 2022 GitHub, Inc.