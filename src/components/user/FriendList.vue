<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container mt-3">
        <div class="text-center mb-4">
            <h2>Tất cả bạn bè</h2>
            <!-- Search form -->
            <div class="form-group d-flex justify-content-center mt-3">
                <div class="input-group w-50">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                    </div>
                    <input type="text" class="click form-control" placeholder="Search" aria-label="Search"
                        v-model="searchTerm">
                    <div class="input-group-append" v-if="searchTerm">
                        <span class="click input-group-text cursor-pointer" @click="clearSearch"><i
                                class="fas fa-times"></i></span>
                    </div>
                </div>
            </div>
        </div>

        <ul class="list-group mt-3">
            <p class="text-muted">{{ filteredFriends.length }} người bạn</p>

            <li v-for="friend in filteredFriends" :key="friend.id"
                class="list-group-item d-flex align-items-center shadow-sm rounded" @click="goToUserProfile(friend.id)">
                <img :src="'http://localhost:3000/' + friend.avatar" alt="Friend Avatar" class="rounded-circle mr-3"
                    width="50" height="50">
                <span class="ml-3 font-weight-bold">{{ friend.name }}</span>
            </li>
        </ul>

        <div v-if="filteredFriends.length === 0" class="text-muted text-center mt-3">
            Không tìm thấy kết quả
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/userStore';
import axios from 'axios';
import router from '@/router';

const BASE_URL = 'http://localhost:3000';

export default {
    name: 'FriendList',
    setup() {
        const userStore = useUserStore();
        const friends = ref([]);
        const searchTerm = ref('');

        const filteredFriends = computed(() => {
            return friends.value.filter(friend =>
                friend.name.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        const clearSearch = () => {
            searchTerm.value = '';
        };

        onMounted(async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/friendship/friends`, { params: { userId: userStore.user.id } });
                friends.value = data;
            } catch (error) {
                console.error('Failed to fetch friend list', error);
            }
        });

        const goToUserProfile = (id) => {
            router.push('/otherprofile/' + id);
        };

        return {
            friends,
            goToUserProfile,
            searchTerm,
            filteredFriends,
            clearSearch
        };
    },
};
</script>

<style>
.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.list-group-item:hover {
    background-color: #c9c9d1;
}

.click {
    cursor: pointer;
}
</style>
