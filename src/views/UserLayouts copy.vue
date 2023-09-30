<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand ml-2 mr-3" href="#">
                <img src="@/assets/logos/main_logo.png" alt="Logo" width="50" height="40">
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                    <li class="nav-item icon-item" data-toggle="tooltip" data-placement="bottom" title="Trang chủ">
                        <router-link class="nav-link" to="/">
                            <i class="fas bi bi-house-fill"></i>
                        </router-link>
                    </li>
                    <li class="nav-item icon-item" data-toggle="tooltip" data-placement="bottom" title="Tạo công thức">
                        <router-link class="nav-link" to="/create-recipe">
                            <i class="fas bi bi-patch-plus-fill"></i>
                        </router-link>
                    </li>
                    <li class="nav-item icon-item position-relative" data-toggle="tooltip" data-placement="bottom"
                        title="Yêu cầu kết bạn">
                        <router-link class="nav-link" to="/friends/requests">
                            <i class="fas bi bi-person-plus-fill"></i>
                            <span v-if="friendRequestsCount > 0" class="badge-notification">
                                {{ friendRequestsCount }}
                            </span>
                        </router-link>
                    </li>

                </ul>

                <ul class="navbar-nav">
                    <li class="nav-item icon-item" data-toggle="tooltip" data-placement="bottom" title="Trò chuyện">
                        <router-link class="nav-link" to="/">
                            <i class="fas bi bi-wechat"></i>
                        </router-link>
                    </li>
                    <li class="nav-item icon-item" data-toggle="tooltip" data-placement="bottom" title="Thông báo">
                        <router-link class="nav-link" to="/">
                            <i class="fas bi bi-bell-fill"></i>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img v-if="userAvatar" :src="userAvatar" alt="User Avatar" width="32" height="32"
                                class="rounded-circle">
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <li class="hover-li" @click="goTo('/myprofile')">
                        <a type="button" class="dropdown-item">
                            <img v-if="userAvatar" :src="userAvatar" alt="User Avatar" width="32" height="32"
                                class="rounded-circle">
                            <span class="ml-2">{{ userName }}</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-cogs mr-3"></i> Cài đặt
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-question-circle mr-3"></i> Trợ giúp & hỗ trợ
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-desktop mr-3"></i> Màn hình & trợ năng
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-comment-dots mr-3"></i> Đóng góp ý kiến
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#" @click.prevent="logout">
                            <i class="fas fa-sign-out-alt mr-3"></i> Đăng xuất
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li class="container">
                        <p class="mb-0 text-muted small">Quyền riêng tư . Điều khoản . Quảng cáo . Lựa chọn
                            quảng cáo . Cookie . Xem thêm.</p>
                    </li>
            </div>
            </li>
            </ul>

            </div>
        </nav>
    </header>
    <main class="main-content container-fluid h-100">
        <div class="row h-100" style="background-color: rgb(240 242 245);">
            <!-- Cột 1: Layout (Bên trái) -->
            <div class="col-md-3 h-100 overflow-auto">
                <!-- Trang cá nhân -->
                <div @mouseover="hover = 'myprofile'" @mouseout="hover = ''" @click="goTo('/myprofile')"
                    class="hover-div d-flex align-items-center mt-4">
                    <img v-if="userAvatar" :src="userAvatar" alt="User Avatar" width="40" height="40"
                        class="rounded-circle ml-2">
                    <span class="ml-2">{{ userName }}</span>
                </div>

                <!-- Bạn bè -->
                <div @mouseover="hover = 'friends'" @mouseout="hover = ''" @click="goTo('/friends')"
                    class="hover-div d-flex align-items-center">
                    <i class="bi bi-people ml-2" style="font-size: 40px;"></i>
                    <span class="ml-2">Bạn bè</span>
                </div>

                <!-- Yêu thích -->
                <div @mouseover="hover = 'favorites'" @mouseout="hover = ''" @click="goTo('/favorites')"
                    class="hover-div d-flex align-items-center">
                    <i class="bi bi-bookmarks-fill ml-2" style="font-size: 40px;"></i>
                    <span class="ml-2">Yêu thích</span>
                </div>

                <div>
                    <footer class="footer">
                        <div class="container">
                            <p class="mb-0">Quyền riêng tư . Điều khoản . Quảng cáo . Lựa chọn quảng cáo . Cookie . Xem
                                thêm.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>

            <!-- col 2: Main content -->
            <div class="col-md-6 h-100 overflow-auto">
                <router-view />
            </div>

            <!-- col 3: Right layout -->
            <div class="col-md-3 h-100 overflow-auto">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
            </div>
        </div>
    </main>
</template>

<script>
import FriendRequestCard from '@/components/user/FriendRequestCard.vue';
import { useUserStore } from '../store/userStore';
import { useFriendshipStore } from '../store/friendshipStore';
import { computed, onMounted } from 'vue';
import $ from 'jquery';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
    name: 'UserLayout',
    components: {
        FriendRequestCard,
    },
    setup() {
        const userStore = useUserStore();
        const friendshipStore = useFriendshipStore();

        onMounted(async () => {
            await friendshipStore.fetchFriendRequestsCount(userStore.user.id);
            $('[data-toggle="tooltip"]').tooltip();
        });

        return {
            userAvatar: computed(() => {
                return userStore.user && userStore.user.avatar
                    ? `http://localhost:3000/${userStore.user.avatar}` : null;
            }),

            userName: computed(() => {
                return userStore.user?.name || '';
            }),
            friendRequestsCount: computed(() => friendshipStore.friendRequestsCount),
        }
    },
    methods: {
        async logout() {
            const userStore = useUserStore();
            userStore.clearData();
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
        goTo(route) {
            this.$router.push(route);
        },
    }
}
</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 60px;
    background-color: white;
}

.nav-item.icon-item {
    margin: 0 8px;
    /* Điều chỉnh khoảng cách giữa các mục */
}

.nav-item.icon-item .fas {
    font-size: 30px;
    /* Điều chỉnh kích thước biểu tượng */
}

.dropdown-toggle::after {
    display: none;
}

.main-content {
    height: calc(100vh - 60px);
    overflow: hidden;
}

.main-content .col-3,
.main-content .col-6 {
    overflow-y: auto;
    height: 100%;
}

.hover-div {
    cursor: pointer;
    transition: background-color 0.1s;
}

.hover-div:hover {
    background-color: #b6b0b0;
}

.hover-li:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.icon-item .nav-link {
    font-size: 24px;
    /* Điều chỉnh kích thước biểu tượng */
}

.icon-item .nav-link:hover {
    color: #007bff;
    /* Màu sắc khi di chuột qua */
}

@media (max-width: 992px) {

    .navbar .col-lg-3,
    .navbar .col-lg-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

.badge-notification {
    border-radius: 50% !important;
    position: absolute !important;
    bottom: 5px;
    right: 5px;
    font-size: 0.7rem;
    padding: 0.3em 0.5em;
    min-width: 20px;
    text-align: center;
    color: #fff;
    background-color: #dc3545;
    display: inline-block;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    vertical-align: baseline;
}
</style>
