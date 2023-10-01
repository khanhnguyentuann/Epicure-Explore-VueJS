<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="app-layout">
    <!-- Header -->
    <header class="app-layout-navbar">
      <div class="navbar-left">
        <a class="ml-2 mr-3" href="#">
          <img src="@/assets/logos/main_logo.png" alt="Logo" width="50" height="40">
        </a>
        <div class="d-flex align-items-center justify-content-center">
          <strong>Admin Dashboard</strong>
        </div>
      </div>
      <div class="navbar-center">Center</div>
      <div class="navbar-right">
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdownUser1" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="32" height="32" class="rounded-circle">
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownUser1">
            <li class="hover-li" @click="goTo('/profile')">
              <a type="button" class="dropdown-item">
                <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="25" height="25"
                  class="rounded-circle mr-2">
                <span class="ml-2">{{ userName }}</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="logout">
                <i class="fas fa-sign-out-alt mr-3"></i> Đăng xuất
              </a>
            </li>
          </div>
        </div>
      </div>
    </header>
    <!-- Body -->
    <div class="app-layout-content">

      <div class="app-layout-sidebar">
        <div class="sidebar-menu">
          <div @click="navigateTo('/admin', 'Dashboard')"
            :class="['sidebar-item', selectedTab === 'Dashboard' ? 'selected' : '']">
            <i class="icon fas fa-tachometer-alt"></i>
            <div>Dashboard</div>
          </div>
          <div @click="navigateTo('/admin/tag-list', 'Tags')"
            :class="['sidebar-item', selectedTab === 'Tags' ? 'selected' : '']">
            <i class="icon fas fa-tags"></i>
            <div>Tags</div>
          </div>
          <div @click="navigateTo('/admin/user-list', 'Users')"
            :class="['sidebar-item', selectedTab === 'Users' ? 'selected' : '']">
            <i class="icon fas fa-users"></i>
            <div>Users</div>
          </div>
          <div @click="navigateTo('/admin/ingredient-list', 'Ingredients')"
            :class="['sidebar-item', selectedTab === 'Ingredients' ? 'selected' : '']">
            <i class="icon fas fa-leaf"></i>
            <div>Ingredients</div>
          </div>
          <div @click="navigateTo('/admin/recipes', 'Recipes')"
            :class="['sidebar-item', selectedTab === 'Recipes' ? 'selected' : '']">
            <i class="icon fas fa-utensils"></i>
            <div>Recipes</div>
          </div>
          <div @click="navigateTo('/admin/comments', 'Comments')"
            :class="['sidebar-item', selectedTab === 'Comments' ? 'selected' : '']">
            <i class="icon fas fa-comments"></i>
            <div>Comments</div>
          </div>
        </div>
      </div>

      <div class="app-layout-page p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AdminLayout',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const selectedTab = ref('Dashboard');

    const apiURL = (relativePath) => {
      return window.baseURL + '/' + relativePath;
    };

    const navigateTo = (route, tabName) => {
      router.push(route);
      selectedTab.value = tabName;
    };

    const logout = async () => {
      userStore.clearData();
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      router.push('/login');
    };

    const userName = computed(() => {
      return userStore.user?.name || '';
    });

    return {
      apiURL,
      userStore,
      userName,
      selectedTab,
      navigateTo,
      logout
    };
  }
}
</script>

<style scoped>
.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout-navbar {
  height: 73px;
  padding: 0.1rem 1rem;
  background-color: rgb(255, 255, 255);
  color: rgb(38, 40, 36);
  fill: rgb(38, 40, 36);
  box-shadow: 0 .25rem .5rem 0 rgba(0, 0, 0, 0.12);
  z-index: 2;
  display: grid;
  grid-template: "left center right" /1fr auto 1fr;
  align-items: center;

}

.navbar-left {
  display: flex;
  grid-area: left;
}

.navbar-center {
  display: flex;
  justify-content: center;
  grid-area: center;
}

.navbar-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  grid-area: right;
}

.sidebar-menu {
  width: 16rem;
  padding: 2rem 0;
}

.app-layout-content {
  display: flex;
  height: calc(100vh - 4rem);
  flex: 1;
}

.app-layout-sidebar {
  position: relative;
  height: 100%;
  background-color: rgb(236, 240, 241);
}

.sidebar-item {
  display: flex;
  align-items: center;
  display: flex;
  padding: 15px;
  min-height: 58px;
  transition: all 0.2s ease-in;
}

.sidebar-item:hover {
  background-color: #b3d4fc;
}

.sidebar-item.selected {
  background-color: #154EC1;
  color: #fff;
}

.icon {
  font-size: 19px;
  height: 19px;
  line-height: 19px;
  width: 1.5rem;
  display: flex;
  margin-right: 15px;
}

.app-layout-page {
  flex-grow: 2;
  overflow-y: scroll;
  background-color: #f6f6f6;
}

.nav-link.dropdown-toggle::after {
  display: none;
}
</style>
