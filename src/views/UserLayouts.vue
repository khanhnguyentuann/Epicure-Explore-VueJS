<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="app-layout">
        <!-- Header -->
        <header class="app-layout-navbar">
            <div class="navbar-left">
                <a class="ml-2 mr-3" href="#">
                    <img src="@/assets/logos/main_logo.png" alt="Logo" width="50" height="40">
                </a>
                <div class="d-flex align-items-center justify-content-center">
                    <strong>Epicure Explore</strong>
                </div>
            </div>
            <div class="navbar-center">

                <!-- Trang chủ -->
                <div @click="navigateTo('/', 'NewsFeed')"
                    :class="['navbar-center-item', selectedTab === 'NewsFeed' ? 'selected' : '']" data-toggle="tooltip"
                    data-placement="bottom" title="Trang chủ">
                    <i class="bi bi-house-fill"></i>
                </div>

                <!-- Đăng bài -->
                <div @click="navigateTo('/create-recipe', 'CreatePost')"
                    :class="['navbar-center-item', selectedTab === 'CreatePost' ? 'selected' : '']" data-toggle="tooltip"
                    data-placement="bottom" title="Tạo bài viết">
                    <i class="bi bi-patch-plus-fill"></i>
                </div>

                <!-- Yêu cầu kết bạn -->
                <div @click="navigateTo('/friends/requests', 'FriendRequest')"
                    :class="['navbar-center-item', selectedTab === 'FriendRequest' ? 'selected' : '']" data-toggle="tooltip"
                    data-placement="bottom" title="Yêu cầu kết bạn">
                    <i class="bi bi-person-plus-fill"></i>
                    <span v-if="friendRequestsCount > 0" class="badge-notification">
                        {{ friendRequestsCount }}
                    </span>
                </div>

                <!-- Message -->
                <div @click="navigateTo('/', 'Message')"
                    :class="['navbar-center-item', selectedTab === 'Message' ? 'selected' : '']" data-toggle="tooltip"
                    data-placement="bottom" title="Trò chuyện">
                    <i class="bi bi-wechat"></i>
                </div>

                <!-- Thông báo -->
                <div @click="navigateTo('/', 'Notification')"
                    :class="['navbar-center-item', selectedTab === 'Notification' ? 'selected' : '']" data-toggle="tooltip"
                    data-placement="bottom" title="Thông báo">
                    <i class="bi bi-bell-fill"></i>
                    <span v-if="likeNotificationCount > 0" class="badge-notification">
                        {{ likeNotificationCount }}
                    </span>
                </div>
            </div>
            <div class="navbar-right">
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="Profile" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="40" height="40"
                            class="rounded-circle">
                    </a>

                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="Profile">
                        <li class="hover-li" @click="goTo('/myprofile')">
                            <a type="button" class="dropdown-item">
                                <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="32" height="32"
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
                </div>
            </div>
        </header>
        <!-- Body -->
        <div class="app-layout-content">

            <div class="app-layout-sidebar col-3">
                <div class="sidebar-menu">
                    <!-- Trang cá nhân -->
                    <div @click="navigateTo('/myprofile', 'MyProfile')"
                        :class="['sidebar-item', selectedTab === 'MyProfile' ? 'selected' : '']">
                        <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="40" height="40"
                            class="rounded-circle mr-2">
                        <div>{{ userName }}</div>
                    </div>

                    <!-- Bạn bè -->
                    <div @click="navigateTo('/friends', 'Friends')"
                        :class="['sidebar-item', selectedTab === 'Friends' ? 'selected' : '']">
                        <i class="bi bi-person-check-fill mr-2"></i>
                        <div>Bạn bè</div>
                    </div>

                    <!-- Yêu thích -->
                    <div @click="navigateTo('/favorites', 'Favorites')"
                        :class="['sidebar-item', selectedTab === 'Favorites' ? 'selected' : '']">
                        <i class="bi bi-bookmarks-fill mr-2"></i>
                        <div>Yêu thích</div>
                    </div>
                    <!-- Nhóm -->
                    <div @click="navigateTo('/', 'Groups')"
                        :class="['sidebar-item', selectedTab === 'Groups' ? 'selected' : '']">
                        <i class="bi bi-people-fill mr-2"></i>
                        <div>Nhóm</div>
                    </div>
                    <!-- Bảng Feed -->
                    <div @click="navigateTo('/', 'NewsFeed')"
                        :class="['sidebar-item', selectedTab === 'NewsFeed' ? 'selected' : '']">
                        <i class="bi bi-newspaper mr-2"></i>
                        <div>Bảng Feed</div>
                    </div>
                    <!-- Videos -->
                    <div @click="navigateTo('/', 'Videos')"
                        :class="['sidebar-item', selectedTab === 'Videos' ? 'selected' : '']">
                        <i class="bi bi-play-circle-fill mr-2"></i>
                        <div>Video</div>
                    </div>
                    <!-- Sự kiện -->
                    <div @click="navigateTo('/', 'Events')"
                        :class="['sidebar-item', selectedTab === 'Events' ? 'selected' : '']">
                        <i class="bi bi-calendar-event-fill mr-2"></i>
                        <div>Sự kiện</div>
                    </div>
                    <!-- Trang -->
                    <div @click="navigateTo('/', 'Pages')"
                        :class="['sidebar-item', selectedTab === 'Pages' ? 'selected' : '']">
                        <i class="bi bi-flag-fill mr-2"></i>
                        <div>Trang</div>
                    </div>
                    <!-- Kỷ niệm -->
                    <div @click="navigateTo('/', 'Memories')"
                        :class="['sidebar-item', selectedTab === 'Memories' ? 'selected' : '']">
                        <i class="bi bi-clock-history mr-2"></i>
                        <div>Kỷ niệm</div>
                    </div>
                    <footer class="footer mt-3">
                        <div class="container">
                            <p class="mb-0">Quyền riêng tư . Điều khoản . Quảng cáo . Lựa chọn quảng cáo . Cookie . Xem
                                thêm.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>

            <div class="app-layout-page col-6">
                <router-view />
            </div>

            <div class="app-layout-right-sidebar col-3">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
                <FriendRequestCard />
                <hr class="my-4 hr-thick">
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { useFriendshipStore } from '../store/friendshipStore';
import $ from 'jquery';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FriendRequestCard from '@/components/user/FriendRequestCard.vue';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const ROUTES = {
    notificationcount: `notification/like-notifications-count`,
};

export default {
    name: 'UserLayout',
    components: {
        FriendRequestCard,
    },
    setup() {
        const userStore = useUserStore();
        const friendshipStore = useFriendshipStore();
        const router = useRouter();
        const selectedTab = ref('MyProfile');
        const likeNotificationCount = ref(0);

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        const navigateTo = (route, tabName) => {
            router.push(route);
            selectedTab.value = tabName;
        };

        onMounted(async () => {
            await friendshipStore.fetchFriendRequestsCount(userStore.user.id);
            await fetchLikeNotificationsCount();
            $('[data-toggle="tooltip"]').tooltip();
        });

        const fetchLikeNotificationsCount = async () => {
            try {
                const userId = userStore.user.id;
                const response = await axios.get(apiURL(ROUTES.notificationcount), { params: { userId } });

                if (response.data && response.data.count !== undefined) {
                    likeNotificationCount.value = response.data.count;
                }
            } catch (error) {
                console.error("Có lỗi khi tải số thông báo 'like':", error);
            }
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

        const friendRequestsCount = computed(() => {
            return friendshipStore.friendRequestsCount;
        });

        return {
            apiURL,
            fetchLikeNotificationsCount,
            likeNotificationCount,
            userStore,
            userName,
            friendRequestsCount,
            selectedTab,
            navigateTo,
            logout
        };
    }
}
</script>

<style scoped>
.app-layout-navbar {
    position: relative;
    height: 73px;
    padding: 0.1rem 1rem;
    background-color: rgb(255, 255, 255);
    color: rgb(38, 40, 36);
    fill: rgb(38, 40, 36);
    box-shadow: 0 .25rem .5rem 0 rgba(0, 0, 0, 0.12);
    z-index: 2;
    display: grid;
    grid-template: "left center right" /1fr auto 1fr;
}

.navbar-left {
    display: flex;
    grid-area: left;
    align-items: center;
}

.navbar-center {
    display: flex;
    justify-content: center;
    grid-area: center;
}

.navbar-center-item {
    background-color: #E4E6EB;
    border-radius: 50%;
    align-items: center;
    margin-right: 10px;
    display: flex;
    padding: 20px;
    transition: all 0.2s ease-in;
}

.navbar-center-item.selected {
    background-color: #154EC1;
    color: #fff;
}

.badge-notification {
    border-radius: 50% !important;
    position: relative;
    bottom: 19px;
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
    margin-right: -25.22px;
}

.navbar-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-area: right;
    align-items: center;
}

.sidebar-menu {
    padding: 2rem 0;
    border-radius: 5px;
}

.sidebar-item {
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 15px;
    min-height: 58px;
    transition: all 0.2s ease-in;
}

.sidebar-item:hover {
    background-color: rgb(68 73 80 / 15%);
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

i.bi.bi-house-fill,
i.bi.bi-patch-plus-fill,
i.bi.bi-person-plus-fill,
i.bi.bi-wechat,
i.bi.bi-bell-fill,
i.bi.bi-person-check-fill.mr-2,
i.bi.bi-people-fill.mr-2,
i.bi.bi-newspaper.mr-2,
i.bi.bi-play-circle-fill.mr-2,
i.bi.bi-calendar-event-fill.mr-2,
i.bi.bi-flag-fill.mr-2,
i.bi.bi-clock-history.mr-2,
i.bi.bi-bookmarks-fill.mr-2 {
    font-size: 30px;
    width: 30px;
    height: 30px;
}

i.bi.bi-house-fill::before,
i.bi.bi-patch-plus-fill::before,
i.bi.bi-person-plus-fill::before,
i.bi.bi-wechat::before,
i.bi.bi-bell-fill::before,
i.bi.bi-person-check-fill.mr-2::before,
i.bi.bi-people-fill.mr-2::before,
i.bi.bi-newspaper.mr-2::before,
i.bi.bi-play-circle-fill.mr-2::before,
i.bi.bi-calendar-event-fill.mr-2::before,
i.bi.bi-flag-fill.mr-2::before,
i.bi.bi-clock-history.mr-2::before,
i.bi.bi-bookmarks-fill.mr-2::before {
    vertical-align: top;
}


.app-layout-content {
    background-color: #F0F2F5;
    box-sizing: border-box;
    display: flex;
    height: calc(100vh - 73px);
    flex: 1;
}

/* Ẩn scrollbar  */
.app-layout-sidebar,
.app-layout-page,
.app-layout-right-sidebar {
    overflow-y: hidden;
}

/* Hiện scrollbar khi hover */
.app-layout-sidebar:hover,
.app-layout-page:hover,
.app-layout-right-sidebar:hover {
    overflow-y: overlay;
}

/* Ẩn nút tam giác (caret) */
.nav-link.dropdown-toggle::after {
    display: none;
}
</style>
