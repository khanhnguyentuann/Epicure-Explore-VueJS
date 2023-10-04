import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/userStore';

const isSignedIn = () => {
  const userStore = useUserStore();
  return userStore.isAuthenticated;
};

const isAdmin = () => {
  const userStore = useUserStore();
  return userStore.user.role === 'admin';
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFoundView.vue'),
  },
  {
    path: '/',
    component: () => import('../views/UserLayouts.vue'),
    children: [
      {
        path: '',
        name: 'RecipeNewsFeed',
        component: () => import('../components/user/RecipeNewsFeed.vue'),
      },
      {
        path: 'create-recipe',
        name: 'CreateRecipe',
        component: () => import('../components/user/CreateRecipe.vue')
      },
      {
        path: '/myprofile',
        name: 'MyProfile',
        component: () => import('../components/user/MyProfile.vue')
      },
      {
        path: '/otherprofile/:userId',
        name: 'OtherProfile',
        component: () => import('../components/user/OtherProfile.vue'),
        props: true
      },
      {
        path: 'friends',
        name: 'FriendList',
        component: () => import('../components/user/FriendList.vue')
      },
      {
        path: '/friends/requests',
        name: 'FriendRequest',
        component: () => import('../components/user/FriendRequest.vue')
      },
      {
        path: 'favorites',
        name: 'FavoriteRecipe',
        component: () => import('../components/user/FavoriteRecipe.vue')
      },
      {
        path: 'favorites/:id',
        name: 'FavoriteRecipeDetail',
        component: () => import('../components/user/FavoriteRecipeDetail.vue'),
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/AdminLayouts.vue'),
    children: [
      {
        path: 'user-list',
        name: 'UserList',
        component: () => import('../components/admin/users/UserList.vue')
      },
      {
        path: 'user-list/add-user',
        name: 'AddUser',
        component: () => import('../components/admin/users/AddUser.vue')
      },
      {
        path: 'user-list/edit-user/:id',
        name: 'EditUser',
        component: () => import('../components/admin/users/EditUser.vue')
      },
      {
        path: 'tag-list',
        name: 'TagList',
        component: () => import('../components/admin/tags/TagList.vue')
      },
      {
        path: 'tag-list/add-tag',
        name: 'AddTag',
        component: () => import('../components/admin/tags/AddTag.vue')
      },
      {
        path: 'tag-list/edit-tag/:id',
        name: 'EditTag',
        component: () => import('../components/admin/tags/EditTag.vue')
      },
      {
        path: 'ingredient-list',
        name: 'IngredientList',
        component: () => import('../components/admin/ingredients/IngredientList.vue')
      },
      {
        path: 'ingredient-list/add-ingredient',
        name: 'AddIngredient',
        component: () => import('../components/admin/ingredients/AddIngredient.vue')
      },
      {
        path: 'ingredient-list/edit-ingredient/:id',
        name: 'EditIngredient',
        component: () => import('../components/admin/ingredients/EditIngredient.vue')
      },
      {
        path: 'comments',
        name: 'CommentList',
        component: () => import('../components/admin/comments/Comments.vue')
      },
      {
        path: 'notifications',
        name: 'NotificationPanel',
        component: () => import('../components/admin/notifications/Notifications.vue')
      },
      {
        path: 'recipes',
        name: 'RecipeList',
        component: () => import('../components/admin/recipes/Recipes.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    if (!isSignedIn()) {
      next('/login');
    } else if (!isAdmin()) {
      next('/');
    } else {
      next();
    }
  } else if (to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot-password' && !isSignedIn()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
