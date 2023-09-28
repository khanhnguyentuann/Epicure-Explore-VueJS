<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Admin</a>
      <div class="collapse navbar-collapse">
        <ul>
          <!-- Admin account dropdown -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdownUser1" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img :src="userAvatar" alt="User Avatar" width="32" height="32" class="rounded-circle">
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownUser1">
              <li class="hover-li" @click="goTo('/profile')">
                <a type="button" class="dropdown-item">
                  <img :src="userAvatar" alt="User Avatar" width="25" height="25" class="rounded-circle mr-2">
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
        </ul>
      </div>
    </nav>

    <!-- Body -->
    <div class="container-fluid">
      <div class="row">

        <!-- Sidebar -->
        <nav class="col-md-3 bg-light sidebar">
          <div class="position-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Dashboard</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/user-list">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Users</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/tag-list">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Tags</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/ingredient-list">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Ingredients</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/recipes">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Recipes</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/comments">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Comments</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/notifications">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Manage Notifications</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main content -->
        <main role="main" class="col-md-9 ml-sm-auto">
          <router-view />
        </main>

      </div>
    </div>

    <!-- Footer -->
    <footer class="footer py-3 bg-light">
      <div class="container">
        <span class="text-muted">© 8 2023 Admin Dashboard</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { computed } from 'vue';

export default {
  name: 'AdminLayout',
  setup() {
    const userStore = useUserStore();

    return {
      userAvatar: computed(() => {
        return userStore.user ? `http://localhost:3000/${userStore.user.avatar}` : null;
      }),
      userName: computed(() => {
        return userStore.user?.name || '';
      })
    }
  },
  methods: {
    async logout() {
      const userStore = useUserStore();
      userStore.clearData();
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: calc(100vh - 56px);
  overflow-y: auto;
  border-right: 1px solid rgba(0, 0, 0, .125);
}

.dropdown-toggle::after {
  display: none;
}
</style>
