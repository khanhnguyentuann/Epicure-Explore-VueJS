<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-6">
                <h2>Friend Requests <span style="color: red;">{{ friendRequests.length }}</span></h2>
            </div>
            <div class="col-6 text-right">
                Sort by:
                <select v-model="sortOrder" @change="sortFriendRequests">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>

        <ul class="list-group">
            <li v-if="friendRequests.length === 0" class="d-flex justify-content-center mt-3">
                You have no friend requests!
            </li>
            <li v-else v-for="request in friendRequests" :key="request.user_id1"
                style="background-color: rgba(255, 255, 255, 0.12);"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div @click="goToOtherProfile(request.user_id1)">
                    <img :src="'http://localhost:3000/' + request.avatar" alt="User Avatar" width="50" height="50"
                        class="mr-3 rounded-circle">
                    <span class="ml-1 font-weight-bold">
                        {{ request.name }}
                    </span>
                    <span class="ml-2 text-muted">{{ request.timeAgo }}</span>
                </div>
                <div>
                    <button @click="acceptRequest(request.user_id1)" class="btn btn-primary mr-2">Accept Request</button>
                    <button @click="declineRequest(request.user_id1)" class="btn btn-secondary">Decline Request</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import { useFriendshipStore } from '../../store/friendshipStore';
import { ref, onMounted, watch } from 'vue';

import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'http://localhost:3000';

export default {
    name: 'FriendRequest',
    setup() {
        const userStore = useUserStore();
        const friendshipStore = useFriendshipStore();
        const friendRequests = ref([]);
        const router = useRouter();
        const sortOrder = ref('newest');

        const goToOtherProfile = (userId) => {
            router.push(`/otherprofile/${userId}`);
        };

        const sortFriendRequests = () => {
            if (sortOrder.value === 'newest') {
                friendRequests.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else {
                friendRequests.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
        };



        watch(() => sortOrder.value, sortFriendRequests);

        onMounted(async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/friendship/requests`, { params: { userId: userStore.user.id } });
                friendRequests.value = data.map(request => ({
                    ...request,
                    timeAgo: moment(request.created_at).fromNow(),
                }));

                sortFriendRequests();
            } catch (error) {
                console.error('Failed to fetch friend requests', error);
            }
        });

        async function acceptRequest(userId) {
            try {
                await axios.post(`${BASE_URL}/friendship/accept-request`, { userId1: userStore.user.id, userId2: userId });
                friendshipStore.setFriendshipStatus('accepted');
                alert('Cả hai đã trở thành bạn bè!');
                friendRequests.value = friendRequests.value.filter(request => request.user_id1 !== userId);
            } catch (error) {
                console.error('Failed to accept friend request', error);
            }
        }


        async function declineRequest(userId) {
            try {
                await axios.delete(`${BASE_URL}/friendship/cancel-request`, { params: { userId1: userStore.user.id, userId2: userId } });
                friendshipStore.setFriendshipStatus('none');
                alert('Đã hủy yêu cầu kết bạn');
                friendRequests.value = friendRequests.value.filter(request => request.user_id1 !== userId);
            } catch (error) {
                console.error('Failed to cancel friend request', error);
            }
        }

        return {
            friendRequests,
            acceptRequest,
            declineRequest,
            goToOtherProfile,
            sortFriendRequests,
            sortOrder
        };
    },
};
</script>

<style scoped>
.click {
    cursor: pointer;
}
</style>