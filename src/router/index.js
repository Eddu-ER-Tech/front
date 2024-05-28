import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import LoginView from '../views/LoginView.vue';
import FeedView from '../views/FeedView.vue';
import SearchView from '../views/SearchView.vue';
import ProfileView from '../views/ProfileView.vue';
import FriendsView from '../views/FriendsView.vue';
import PostView from '../views/PostView.vue';
import TrendView from '../views/TrendView.vue';
import EditProfileView from '../views/EditProfileView.vue';
import NotificationsView from '../views/NotificationsView.vue';

const routes = [

  {
    path: '/Feed',
    name: 'FeedView',
    component: FeedView
  },
  {
    path: '/Search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/ProfileView/:id',
    name: 'ProfileView',
    component: ProfileView,
    props: true
  },
  {
    path: '/Notifications',
    name: 'NotificationsView',
    component: NotificationsView
  },
  {
    path: '/Profile/edit',
    name: 'EditProfileView',
    component: EditProfileView
  },
  {
    path: '/Profile/:id/friends',
    name: 'FriendsView',
    component: FriendsView,
    props: true
  },
  {
    path: '/Post/:id',
    name: 'PostView',
    component: PostView,
    props: true
  },
  {
    path: '/Trends/:id',
    name: 'TrendView',
    component: TrendView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

