<template>
  <md-card class="md-elevation-0">
    <md-card-header>
      <div class="md-title">Notes</div>
      <div class="md-subhead"><b>Note moyenne:</b> {{averageGrade}}/5</div>
    </md-card-header>
    <md-card-content>
      <span class="section-text">{{grades.length}} notes</span>
      <md-list>
        <md-list-item v-for="grade in grades" v-bind:key="grade.date">{{convertGrade(grade.score)}}/5 <span>le <b>{{formatDate(grade.date)}}</b></span></md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: 'RestaurantGrades',
    props: {
      averageGrade: Number,
      maxGrade: Number,
      grades: Array
    },
    methods: {
      formatDate(date) {
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('fr-FR');
      },
      convertGrade(grade) {
        return Math.round(((5 * grade) / this.maxGrade) * 2) / 2;
      }
    }
  }
</script>

<style scoped>
  .section-text {
    font-size: 1.1em;
    font-weight: bold;
  }
</style>
