<template>
    <div>
      <div v-if="trends.length" class="row-sm d-flex flex-column mb-3 container-publicacion bg-light">
        <div class="text-center mt-5">
          <strong>
            <h1>Trends</h1>
          </strong>
        </div>
        <div class="row" v-for="trend in trends" :key="trend.id">
          <div class="col mt-5 ms-4 mb-0">
            <strong><p>#{{ trend.hashtag }}</p></strong>
            <p>{{ trend.occurences }} Posts</p>
          </div>
          <div class="col mt-5 mb-5 ms-5">
            <RouterLink :to="{ name: 'TrendView', params: { id: trend.hashtag } }" class="btn btn-outline-primary">
              Explorar
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-5">
        <p>No trends available</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrendsContainer',
  
    data() {
      return {
        trends: []
      };
    },
  
    mounted() {
      this.getTrends();
    },
  
    methods: {
      async getTrends() {
        try {
          const response = await this.$http.get('/api/posts/trends/');
          console.log(response.data);
          this.trends = response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>