<template>
  <div class="restaurant-pictures">
    <div class="thumbnail-picture">
      <img :src="thumbnailImage" alt="restaurant-thumbnail"/>
    </div>
    <div class="additionnal-pictures-container">
      <div class="additionnal-pictures">
        <img :src="additionnalPictures[0]" alt="restaurant-additionnal-picture"/>
        <img :src="additionnalPictures[1]" alt="restaurant-additionnal-picture"/>
      </div>
      <div class="additionnal-pictures">
        <img :src="additionnalPictures[2]" alt="restaurant-additionnal-picture"/>
        <img :src="additionnalPictures[3]" alt="restaurant-additionnal-picture"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RestaurantImages',
    props: {
      thumbnailImage: String,
      additionnalPictures: Array
    }
  }
</script>

<style scoped>
  .restaurant-pictures {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 30vh;
    margin-bottom: 24px;
  }

  .restaurant-pictures img {
    max-height: 30vh;
  }

  .thumbnail-picture {
    margin-right: 6px;
  }

  .thumbnail-picture img {
    height: 30vh;
    object-fit: cover;
  }

  .additionnal-pictures-container {
    flex: 2;
    display: flex;
    flex-direction: row;
  }

  .additionnal-pictures-container .additionnal-pictures:nth-child(1) {
    margin-right: 3px;
  }

  .additionnal-pictures-container .additionnal-pictures:nth-child(2) {
    margin-left: 3px;
  }

  .additionnal-pictures {
    align-self: center;
  }

  .additionnal-pictures img:nth-child(1) {
    margin-bottom: 3px;
  }

  .additionnal-pictures img:nth-child(2) {
    margin-top: 3px;
  }

  .additionnal-pictures img {
    height: 30vh;
    object-position: center;
    object-fit: cover;
  }
</style>
