<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/attributes-order -->
<template>
    <div class="row mb-4 profile-header">
        <div class="col-md-4 text-center">
            <img :src="userAvatar" alt="User Avatar" width="150" height="150" class="rounded-circle">
        </div>
        <div class="col-md-8 d-flex flex-column justify-content-center">
            <h2>{{ userName }}</h2>
        </div>
        <div class="ml-auto">
            <button class="btn btn-light" v-if="friendshipStatus === 'none'" @click="sendFriendRequest">
                Thêm bạn bè
            </button>
            <button class="btn btn-light" v-if="friendshipStatus === 'pending' && requestDirection === 'outgoing'"
                @click="cancelRequest">
                Huỷ lời mời
            </button>
            <button class="btn btn-light" @click="acceptRequest"
                v-if="friendshipStatus === 'pending' && requestDirection === 'incoming'">
                Chấp nhận lời mời
            </button>
            <button class="btn btn-light" @click="cancelRequest"
                v-if="friendshipStatus === 'pending' && requestDirection === 'incoming'">
                Xoá lời mời
            </button>
            <button class="btn btn-light" @click="unfriend" v-if="friendshipStatus === 'accepted'">
                Hủy kết bạn
            </button>
            <button class="btn btn-light" disabled v-if="friendshipStatus === 'accepted'">
                Bạn bè
            </button>
            <button class="btn btn-light">
                Nhắn tin
            </button>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore';
import { useFriendshipStore } from '../../store/friendshipStore';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
    props: {
        userId: {
            type: String,
            required: true,
        },
        userAvatar: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const userStore = useUserStore();
        const friendshipStore = useFriendshipStore();

        const friendshipStatus = computed(() => friendshipStore.friendshipStatus);
        const requestDirection = computed(() => friendshipStore.requestDirection);

        async function sendFriendRequest() {
            try {
                await axios.post(`${BASE_URL}/friendship/send-request`, { userId1: userStore.user.id, userId2: props.userId });
                friendshipStore.setFriendshipStatus('pending');
                friendshipStore.setRequestDirection('outgoing');
            } catch (error) {
                handleErrors('Failed to send friend request', error);
            }
        }

        async function acceptRequest() {
            try {
                await axios.post(`${BASE_URL}/friendship/accept-request`, { userId1: userStore.user.id, userId2: props.userId });
                friendshipStore.setFriendshipStatus('accepted');
                alert('Cả hai đã trở thành bạn bè!');
            } catch (error) {
                handleErrors('Failed to accept friend request', error);
            }
        }

        async function cancelRequest() {
            try {
                await axios.delete(`${BASE_URL}/friendship/cancel-request`, { params: { userId1: userStore.user.id, userId2: props.userId } });
                friendshipStore.setFriendshipStatus('none');
            } catch (error) {
                handleErrors('Failed to cancel friend request', error);
            }
        }

        async function unfriend() {
            try {
                if (window.confirm('Bạn có chắc chắn muốn hủy kết bạn không?')) {
                    await axios.delete(`${BASE_URL}/friendship/unfriend`, {
                        params: { userId1: userStore.user.id, userId2: props.userId }
                    });

                    friendshipStore.setFriendshipStatus('none');
                    alert('Đã hủy kết bạn');
                }
            } catch (error) {
                handleErrors('Failed to unfriend', error);
            }
        }

        function handleErrors(message, error) {
            console.error(message, error);
        }

        return {
            friendshipStatus,
            requestDirection,
            sendFriendRequest,
            acceptRequest,
            cancelRequest,
            unfriend,
        };
    },
};
</script>

<style scoped>
.profile-header {
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.profile-header {
    background-color: #f5f6f7;
}
</style>
