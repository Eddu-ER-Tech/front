<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl">Trend: #{{ $route.params.id }}</h2>
      </div>
      <div v-if="posts.length" class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts" :key="post.id">
        <FeedItem :post="post" />
      </div>
      <div v-else class="p-4 bg-white border border-gray-200 rounded-lg">
        <p>No posts available for this trend.</p>
      </div>
    </div>
   <!-- <div class="main-right col-span-1 space-y-4">
      <PersonasQueQuizaConozcas />
      <TrendsContainer />
    </div>-->
  </div>
</template>

<script>
//import PersonasQueQuizaConozcas from '../components/PersonasQueQuizaConozcas.vue';
import FeedItem from '../components/FeedItem.vue';
//import TrendsContainer from '@/components/TrendsContainer.vue';
import axios from 'axios';

export default {
  name: 'TrendView',
  components: {
   // PersonasQueQuizaConozcas,
    //TrendsContainer,
    FeedItem,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getFeed();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.getFeed();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getFeed() {
      try {
        const response = await axios.get(`/api/posts/?trend=${this.$route.params.id}`);
        console.log('data', response.data);
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
</script>