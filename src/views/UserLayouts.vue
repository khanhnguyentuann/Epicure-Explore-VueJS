<!-- eslint-disable vue/html-quotes -->
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
                <div class="form">
                    <i class="fa fa-search"></i>
                    <input type="text" class="form-control form-input text-white" placeholder="Search title..."
                        @keyup.enter="redirectToTitleSearch('TitleSearch')" v-model="searchTitle">
                    <span class="left-pan"><i class="fa fa-microphone"></i></span>
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
                    :class="['navbar-center-item', selectedTab === 'FriendRequest' ? 'selected' : '', 'position-relative']"
                    data-toggle="tooltip" data-placement="bottom" title="Yêu cầu kết bạn">
                    <i class="bi bi-person-plus-fill"></i>
                    <span v-if="friendRequestsCount > 0"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style="top: 17%; right: 10%;">
                        {{ friendRequestsCount }}
                    </span>
                </div>

                <!-- Message -->
                <div @click="navigateTo('/conversations', 'Conversations')"
                    :class="['navbar-center-item', selectedTab === 'Conversations' ? 'selected' : '', 'position-relative']"
                    data-toggle="tooltip" data-placement="bottom" title="Trò chuyện">
                    <i class="bi bi-wechat"></i>
                    <span
                        class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                        style="top: 17%; right: 10%;">
                    </span>
                </div>
            </div>
            <div class="navbar-right">
                <div @click="selectTab('Notification')"
                    :class="['navbar-center-item', selectedTab === 'Notification' ? 'selected' : '', 'position-relative']"
                    data-toggle="tooltip" data-placement="bottom" title="Thông báo" id="bell">
                    <i class="bi bi-bell-fill"></i>
                    <span v-if="likeNotificationCount > 0"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style="top: 17%; right: 10%;">
                        {{ likeNotificationCount }}
                    </span>
                </div>

                <div :style="notificationStyle" class="notifications" id="box">
                    <h2>Thông báo</h2>
                    <div type="button" class="btn btn-secondary" style="width:90%; margin-left: 5%;" @click="markAllAsRead">
                        <i class="bi bi-check2-all"></i> Đánh dấu tất cả là đã đọc
                    </div>
                    <div v-if="likeNotifications.length > 0">
                        <div v-for="notification in likeNotifications" :key="notification.id" class="notifications-item">
                            <img :src="apiURL(notification.last_sender_avatar)" alt="User Avatar">
                            <div class="text">
                                <p>{{ notification.message }}</p>
                                <small>{{ formatTime(notification.last_like_time) }}</small>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="no-notifications">
                            <p class="text-center">Không có thông báo nào chưa đọc.</p>
                        </div>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="Profile" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="40" height="40"
                            class="rounded-circle">
                    </a>

                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="Profile">
                        <li class="hover-li" @click="navigateTo('/myprofile', 'MyProfile')">
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

            <div class="app-layout-sidebar col-3 col-sm-3">
                <div class="sidebar-menu" ref="contentBox">
                    <!-- User Profile -->
                    <div @click="navigateTo('/myprofile', 'MyProfile')"
                        :class="['sidebar-item', selectedTab === 'MyProfile' ? 'selected' : '']">
                        <img :src="apiURL(userStore.user?.avatar)" alt="User Avatar" width="40" height="40"
                            class="rounded-circle mr-2">
                        <div>{{ userName }}</div>
                    </div>

                    <!-- Friends -->
                    <div @click="navigateTo('/friends', 'Friends')"
                        :class="['sidebar-item', selectedTab === 'Friends' ? 'selected' : '']">
                        <i class="bi bi-person-check-fill mr-2"></i>
                        <div>Friends</div>
                    </div>

                    <!-- Favorites -->
                    <div @click="navigateTo('/favorites', 'Favorites')"
                        :class="['sidebar-item', selectedTab === 'Favorites' ? 'selected' : '']">
                        <i class="bi bi-bookmarks-fill mr-2"></i>
                        <div>Favorites</div>
                    </div>

                    <!-- News Feed -->
                    <div @click="navigateTo('/', 'NewsFeed')"
                        :class="['sidebar-item', selectedTab === 'NewsFeed' ? 'selected' : '']">
                        <i class="bi bi-newspaper mr-2"></i>
                        <div>News Feed</div>
                    </div>

                    <div class='dashboard-nav-dropdown'>
                        <div class="dashboard-nav-dropdown-toggle">
                            <i class="bi bi-search mr-2"></i>
                            <div>Search</div>
                        </div>
                        <div class='dashboard-nav-dropdown-menu'>
                            <div @click="navigateTo('/tagsearch', 'TagSearch')"
                                :class="['dashboard-nav-dropdown-item', selectedTab === 'TagSearch' ? 'selected' : '']">
                                Search by hashtag
                            </div>
                            <div @click="navigateTo('/titlesearch', 'TitleSearch')"
                                :class="['dashboard-nav-dropdown-item', selectedTab === 'TitleSearch' ? 'selected' : '']">
                                Search by title
                            </div>
                            <div @click="navigateTo('/advancedsearch', 'AdvancedSearch')"
                                :class="['dashboard-nav-dropdown-item', selectedTab === 'AdvancedSearch' ? 'selected' : '']">
                                Advanced search
                            </div>
                        </div>
                    </div>

                    <footer class="footer mt-2">
                        <div class="container">
                            <p class="mb-0 text-muted small">Privacy . Terms . Ads . Ad Choices . Cookies . More.
                            </p>
                        </div>
                    </footer>
                </div>
                <div class="scroll-box" ref="scrollBox">
                    <div class="scroll-content"></div>
                </div>
            </div>

            <div class="app-layout-page col-9 col-sm-9 col-lg-6">
                <div class="page-content" ref="pagecontentBox">
                    <router-view />
                </div>
                <div class="page-scroll-box" ref="pagescrollBox">
                    <div class="page-scroll-content"></div>
                </div>
            </div>

            <div cclass="app-layout-right-sidebar col-3 d-none d-lg-block col-lg-3">
                <div class="rightsidebar-content" ref="rightsidebarcontentBox">
                    <FriendRequestCard />
                    <hr class="my-4 hr-thick">
                </div>
                <!-- <div class="rightsidebar-scroll-box" ref="rightsidebarscrollBox">
                    <div class="rightsidebar-scroll-content"></div>
                </div> -->
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
import moment from 'moment';
import 'moment/locale/vi';

const ROUTES = {
    notificationcount: `notification/like-notifications-count`,
    notifications: `notification/unread-like-notifications`,
    markallasread: `notification/mark-all-as-read`,
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
        const isNotificationVisible = ref(false);
        const likeNotifications = ref([]);
        const contentBox = ref(null);
        const scrollBox = ref(null);
        const searchTitle = ref('');

        const pagecontentBox = ref(null);
        const pagescrollBox = ref(null);

        const rightsidebarcontentBox = ref(null);
        const rightsidebarscrollBox = ref(null);

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        const formatTime = (time) => {
            moment.locale('vi');
            return moment(time).fromNow();
        };

        const navigateTo = (route, tabName) => {
            router.push(route);
            selectedTab.value = tabName;
            isNotificationVisible.value = false;
        }

        const selectTab = (tabName) => {
            selectedTab.value = tabName;
            if (tabName === 'Notification') {
                isNotificationVisible.value = !isNotificationVisible.value;
            } else {
                isNotificationVisible.value = false;
            }
        };

        onMounted(async () => {
            await initializeFriendshipStore();
            await initializeLikeNotifications();
            initializeTooltips();
            synchronizeScrolling();
            setScrollContentHeight();

            // Đoạn mã này để theo dõi sự thay đổi
            const observeHeightChange = (elementSelector, callback) => {
                const element = document.querySelector(elementSelector);
                if (element) {
                    const observer = new MutationObserver(() => {
                        callback();
                    });

                    observer.observe(element, {
                        attributes: true, // theo dõi sự thay đổi của các thuộc tính
                        childList: true,  // theo dõi sự thay đổi của các node con
                        subtree: true,     // theo dõi sự thay đổi trong toàn bộ cây con của node
                        characterData: true // theo dõi sự thay đổi của dữ liệu ký tự của node
                    });
                }
            };

            observeHeightChange('.sidebar-menu', setScrollContentHeight);
            observeHeightChange('.page-content', setScrollContentHeight);
            observeHeightChange('.rightsidebar-content', setScrollContentHeight);
            $('#Profile').dropdown();
            $(document).ready(function () {
                $(".dashboard-nav-dropdown-toggle").click(function () {
                    $(this).closest(".dashboard-nav-dropdown")
                        .toggleClass("show")
                        .find(".dashboard-nav-dropdown")
                        .removeClass("show");
                    $(this).parent()
                        .siblings()
                        .removeClass("show");
                });
                $(".menu-toggle").click(function () {
                    $(".dashboard").toggleClass("dashboard-compact");
                });
            });
        });

        const initializeFriendshipStore = async () => {
            await friendshipStore.fetchFriendRequestsCount(userStore.user.id);
        };

        const initializeLikeNotifications = async () => {
            await fetchLikeNotificationsCount();
            await fetchUnreadLikeNotifications();
        };

        const initializeTooltips = () => {
            $('[data-toggle="tooltip"]').tooltip();
        };

        const synchronizeScrolling = () => {
            scrollBox.value.addEventListener('scroll', function () {
                contentBox.value.scrollTop = scrollBox.value.scrollTop;
            });

            pagescrollBox.value.addEventListener('scroll', function () {
                pagecontentBox.value.scrollTop = pagescrollBox.value.scrollTop;
            });

            // rightsidebarscrollBox.value.addEventListener('scroll', function () {
            //     rightsidebarcontentBox.value.scrollTop = rightsidebarscrollBox.value.scrollTop;
            // });
        };

        const setScrollContentHeight = () => {
            const sidebarMenu = document.querySelector('.sidebar-menu');
            const scrollContent = document.querySelector('.scroll-content');
            if (sidebarMenu && scrollContent) {
                scrollContent.style.height = `${sidebarMenu.scrollHeight}px`;
            }

            const pageContent = document.querySelector('.page-content');
            const pagescrollContent = document.querySelector('.page-scroll-content');
            if (pageContent && pagescrollContent) {
                pagescrollContent.style.height = `${pageContent.scrollHeight}px`;
            }

            // const rightsidebarContent = document.querySelector('.rightsidebar-content');
            // const rightsidebarscrollContent = document.querySelector('.rightsidebar-scroll-content');
            // if (rightsidebarContent && rightsidebarscrollContent) {
            //     rightsidebarscrollContent.style.height = `${rightsidebarContent.scrollHeight}px`;
            // }
        };

        const fetchUnreadLikeNotifications = async () => {
            try {
                const userId = userStore.user.id;
                const response = await axios.get(apiURL(ROUTES.notifications), { params: { userId } });

                if (response.data) {
                    likeNotifications.value = response.data.map(notification => {
                        const count = notification.count;
                        const lastLikeTime = notification.last_like_time;
                        let message = "";
                        switch (count) {
                            case 1:
                                message = `${notification.last_sender_name} đã thích công thức của bạn.`;
                                break;
                            case 2:
                                message = `${notification.last_sender_name} và ${notification.second_last_sender_name} đã thích công thức của bạn.`;
                                break;
                            case 3:
                                message = `${notification.last_sender_name}, ${notification.second_last_sender_name} và ${notification.third_last_sender_name} đã thích công thức của bạn.`;
                                break;
                            default:
                                message = `${notification.last_sender_name} và ${count - 1} người khác đã thích công thức của bạn.`;
                                break;
                        }
                        return {
                            ...notification,
                            message,
                            lastLikeTime
                        };
                    });
                }
            } catch (error) {
                console.error("Có lỗi khi tải thông báo 'like':", error);
            }
        };

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

        const markAllAsRead = async () => {
            try {
                await axios.post(apiURL(ROUTES.markallasread), {
                    userId: userStore.user.id
                });
                likeNotificationCount.value = 0;
                likeNotifications.value = [];
            } catch (error) {
                console.error("Có lỗi khi đánh dấu tất cả thông báo là đã đọc:", error);
            }
        };

        const notificationStyle = computed(() => {
            if (isNotificationVisible.value) {
                return {
                    height: 'auto',
                    opacity: '1'
                };
            } else {
                return {
                    height: '0px',
                    opacity: '0'
                };
            }
        });

        const logout = async () => {
            userStore.clearData();
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            router.push('/login');
        };

        const redirectToTitleSearch = (tabName) => {
            router.push({ name: 'TitleSearch', query: { title: searchTitle.value } });
            selectedTab.value = tabName;
            isNotificationVisible.value = false;
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
            likeNotifications,
            fetchUnreadLikeNotifications,
            likeNotificationCount,
            userStore,
            userName,
            friendRequestsCount,
            selectedTab,
            notificationStyle,
            navigateTo,
            selectTab,
            logout,
            formatTime,
            contentBox,
            scrollBox,
            pagecontentBox,
            pagescrollBox,
            rightsidebarcontentBox,
            rightsidebarscrollBox,
            markAllAsRead,
            searchTitle,
            redirectToTitleSearch
        };
    }
}
</script>

<style scoped>
.app-layout-navbar {
    position: relative;
    height: 73px;
    padding: 0.1rem 1rem;
    color: rgb(38, 40, 36);
    background: rgb(18, 18, 18);
    box-shadow: rgba(255, 255, 255, 0.12) 0px 1px 1px;
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
    color: rgba(255, 255, 255, .9);
    align-items: center;
    margin-right: 10px;
    display: flex;
    padding: 10px;
}

.navbar-center-item.selected {
    color: rgba(255, 59, 92, 1);
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

.app-layout-content {
    background-color: rgb(18, 18, 18);
    color: rgba(255, 255, 255, .9);
    box-sizing: border-box;
    display: flex;
    height: calc(100vh - 73px);
    flex: 1;
}

.app-layout-sidebar,
.app-layout-page,
.app-layout-right-sidebar {
    position: relative;
    display: flex;
}

.sidebar-menu,
.page-content,
.rightsidebar-content {
    width: 100%;
    height: 100%;
    padding-right: 10px;
    overflow: hidden;
    position: relative;
    flex-grow: 1;
}

.scroll-box,
.page-scroll-box,
.rightsidebar-scroll-box {
    height: 100%;
    width: 20px;
    overflow-y: hidden;
    position: absolute;
    right: 0;
    z-index: 1;
}

.sidebar-menu {
    padding-top: 20px;
    border-radius: 5px;
}

.scroll-box:hover,
.page-scroll-box:hover,
.rightsidebar-scroll-box:hover {
    overflow-y: scroll;
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
    color: rgba(255, 59, 92, 1);
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
i.bi.bi-search.mr-2,
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
i.bi.bi-search.mr-2::before,
i.bi.bi-bookmarks-fill.mr-2::before {
    vertical-align: top;
}

/* Ẩn nút tam giác (caret) */
.nav-link.dropdown-toggle::after {
    display: none;
}

.notifications {
    width: 300px;
    position: absolute;
    top: 90px;
    right: 30px;
    border-radius: 5px 0px 5px 5px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.notifications h2 {
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #eee;
    color: #999
}

.notifications h2 span {
    color: #f00
}

.notifications-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 6px 9px;
    margin-bottom: 0px;
    cursor: pointer
}

.notifications-item:hover {
    background-color: #eee
}

.notifications-item img {
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 9px;
    border-radius: 50%;
    margin-top: 2px
}

.notifications-item .text h4 {
    color: #777;
    font-size: 16px;
    margin-top: 3px
}

.notifications-item .text p {
    color: #aaa;
    font-size: 12px
}

/* search */
.form {
    width: 265px;
    position: relative;
}

.form .fa-search {

    position: absolute;
    top: 20px;
    left: 20px;
    color: #9ca3af;

}

.form span {
    color: rgba(255, 255, 255, 0.9);
    position: absolute;
    right: 17px;
    top: 13px;
    padding: 2px;
    border-left: 1px solid #d1d5db;

}

.left-pan i {
    padding-left: 10px;
}

.form-input {
    background: rgba(255, 255, 255, 0.12);
    height: 55px;
    text-indent: 33px;
    border-radius: 10px;
}

.form-input:focus {

    box-shadow: none;
    border: none;
}

/* Css for submenu */
.dashboard-nav-dropdown {
    border-radius: 18px;
    padding: 15px;
    min-height: 58px;
    transition: all 0.2s ease-in;
}

.dashboard-nav-dropdown:hover {
    background-color: rgb(68 73 80 / 15%);
}

.dashboard-nav-dropdown.show>.dashboard-nav-dropdown-toggle {
    font-weight: bold;
}

.dashboard-nav-dropdown.show>.dashboard-nav-dropdown-toggle:after {
    transform: none;
}

.dashboard-nav-dropdown.show>.dashboard-nav-dropdown-menu {
    display: flex;
}

.dashboard-nav-dropdown-toggle:after {
    content: "";
    margin-left: auto;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(81, 81, 81, 0.8);
    transform: rotate(90deg);
}

.dashboard-nav .dashboard-nav-dropdown-toggle:after {
    border-top-color: rgba(255, 255, 255, 0.72);
}

.dashboard-nav-dropdown-menu {
    display: none;
    flex-direction: column;
}

.dashboard-nav-dropdown-toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
}


.dashboard-nav-dropdown-item {
    min-height: 40px;
    padding: 8px 20px 8px 70px;
    display: flex;
    align-items: center;
    transition: ease-out 0.5s;
}

.dashboard-nav-dropdown-item:hover {
    background: rgba(255, 255, 255, 0.04);
}

.dashboard-nav-dropdown-item.selected {
    color: rgba(255, 59, 92, 1);
}
</style>
