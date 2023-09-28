import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/userStore';
import UserLayout from '../views/UserLayouts.vue';
import AdminLayout from '../views/AdminLayouts.vue';
import RecipeList from '../components/admin/recipes/Recipes.vue';
import CommentList from '../components/admin/comments/Comments.vue';
import NotificationPanel from '../components/admin/notifications/Notifications.vue';
import UserList from '../components/admin/users/UserList.vue';
import AddUser from '../components/admin/users/AddUser.vue';
import EditUser from '../components/admin/users/EditUser.vue';
import TagList from '../components/admin/tags/TagList.vue';
import AddTag from '../components/admin/tags/AddTag.vue';
import EditTag from '../components/admin/tags/EditTag.vue';
import IngredientList from '../components/admin/ingredients/IngredientList.vue';
import AddIngredient from '../components/admin/ingredients/AddIngredient.vue';
import EditIngredient from '../components/admin/ingredients/EditIngredient.vue';

import CreateRecipe from '../components/user/CreateRecipe.vue';
import RecipeNewsFeed from '../components/user/RecipeNewsFeed.vue';
import MyProfile from '../components/user/MyProfile.vue';
import OtherProfile from '../components/user/OtherProfile.vue';
import FriendList from '../components/user/FriendList.vue';
import FriendRequest from '../components/user/FriendRequest.vue';
import FavoriteRecipe from '../components/user/FavoriteRecipe.vue';
import FavoriteRecipeDetail from '../components/user/FavoriteRecipeDetail.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/',
    component: UserLayout,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        if (userStore.user.role === 'admin') {
          next('/admin');
        } else {
          next();
        }
      } else {
        next('/login');
      }
    },
    children: [
      {
        path: '',
        name: 'RecipeNewsFeed',
        component: RecipeNewsFeed
      },
      {
        path: 'create-recipe',
        name: 'CreateRecipe',
        component: CreateRecipe
      },
      {
        path: '/myprofile',
        name: 'MyProfile',
        component: MyProfile
      },
      {
        path: '/otherprofile/:userId',
        name: 'OhterProfile',
        component: OtherProfile,
        props: true
      },
      {
        path: 'friends',
        name: 'FriendList',
        component: FriendList
      },
      {
        path: '/friends/requests',
        name: 'FriendRequest',
        component: FriendRequest
      },
      {
        path: 'favorites',
        name: 'FavoriteRecipe',
        component: FavoriteRecipe
      },
      {
        path: 'favorites/:id',
        name: 'FavoriteRecipeDetail',
        component: FavoriteRecipeDetail,
      },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        if (userStore.user.role === 'user') {
          next('/');
        } else {
          next();
        }
      } else {
        next('/login');
      }
    },
    children: [
      {
        path: 'user-list',
        name: 'UserList',
        component: UserList
      },
      {
        path: 'user-list/add-user',
        name: 'AddUser',
        component: AddUser
      },
      {
        path: 'user-list/edit-user/:id',
        name: 'EditUser',
        component: EditUser
      },
      {
        path: 'tag-list',
        name: 'TagList',
        component: TagList
      },
      {
        path: 'tag-list/add-tag',
        name: 'AddTag',
        component: AddTag
      },
      {
        path: 'tag-list/edit-tag/:id',
        name: 'EditTag',
        component: EditTag
      },
      {
        path: 'ingredient-list',
        name: 'IngredientList',
        component: IngredientList
      },
      {
        path: 'ingredient-list/add-ingredient',
        name: 'AddIngredient',
        component: AddIngredient
      },
      {
        path: 'ingredient-list/edit-ingredient/:id',
        name: 'EditIngredient',
        component: EditIngredient
      },
      {
        path: 'comments',
        name: 'CommentList',
        component: CommentList
      },
      {
        path: 'notifications',
        name: 'NotificationPanel',
        component: NotificationPanel
      },
      {
        path: 'recipes',
        name: 'RecipeList',
        component: RecipeList
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
