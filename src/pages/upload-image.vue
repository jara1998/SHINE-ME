<template>
      <div>
    <h1>S3 Uploader</h1>

      <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange">
      </div>
      <div v-else>
        <img :src="image" />
        <button v-if="!uploadURL" @click="removeImage">Remove image</button>
        <button v-if="!uploadURL" @click="uploadImage">Upload image</button>
        <button v-if="uploadURL" @click="reset_upload_status">Upload another image</button>
      </div>
      <h2 v-if="uploadURL">Success! Image uploaded to bucket.</h2>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
const axios = require('axios')
const MAX_IMAGE_SIZE = 5000000
const API_ENDPOINT = 'https://9kc7jq1mp2.execute-api.us-east-1.amazonaws.com/default/getPresignedURL'

export default {
    name: 'upload-image',
    data() {
        return {
          image: '',
          uploadURL: ''
        }
    },

    methods: {      
      reset_upload_status () {
        this.image = ''
        this.uploadURL = ''
      },
      
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
      },
      createImage (file) {
        // var image = new Image()
        let reader = new FileReader()
        reader.onload = (e) => {
          console.log('length: ', e.target.result.includes('data:image/jpeg'))
          if (!e.target.result.includes('data:image/jpeg')) {
            return alert('Wrong file type - JPG only.')
          }
          if (e.target.result.length > MAX_IMAGE_SIZE) {
            return alert('Image is loo large - 1Mb maximum')
          }
          this.image = e.target.result
        }
        reader.readAsDataURL(file)
      },


      removeImage: function () {
        console.log('Remove clicked')
        this.image = ''
      },


      uploadImage: async function () {
        console.log('Upload clicked:' + API_ENDPOINT)
        // Get the presigned URL
        const response = await axios({
          method: 'GET',
          url: API_ENDPOINT
        })
        console.log('Response: ', response.data)
        console.log('Uploading: ', this.image)



        let binary = atob(this.image.split(',')[1])
        let array = []
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i))
        }
        let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})

        var body = new FormData();
        body.append('file', blobData);  
        const result = await fetch(response.data.uploadURL, {
          method: 'PUT',
          body: body
        })
        console.log('Result: ', result)
        // Final URL for the user doesn't need the query string params
        // use this to link pic info in dynamodb
        this.uploadURL = response.data.uploadURL.split('?')[0]
        console.log(this.uploadURL)
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
