<template>
    <div>
        <h1>You can view your images here</h1>
        <!-- <Gallery
            :images="images"
            :imageWidth="720"
            :imageHeight="auto"
            :popUpMaxWidth="720"
            :mdCols="4"
            :smCols="4"
            :xsCols="6"
            :lgCols="2"
        /> -->
    </div>
</template>


<script>
// import Gallery from "vuejs-image-gallery"
// const axios = require('axios')

// async function load_blob_image(src) {
//             const config = { url: src, method: "get", responseType: "blob" }
//             const response = await axios.request(config)
//             return response.data // the blob
// }

export default {
    name: 'view-images',
    data() {
        return {
            urls: [],
            load_image_url_endpoint: "",
            images: [
            ]
        }
    },
    // components: {
    //     Gallery
    // },
    mounted() {
        this.load_all_image()
    },

    methods: {
        async load_all_image() {
            this.images.push({
                id: 0,
                img_src: "https://marathon-pictures.s3.amazonaws.com/pictures/60236175.jpg"
                })
            this.images.push({
                id: 1,
                img_src: "https://marathon-pictures.s3.amazonaws.com/pictures/52792200.jpg"
                })
        }
    }
}
</script>