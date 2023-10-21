<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/attributes-order -->
<template>
    <div class="mt-3">
        <div class="click thought-box card mb-4 p-3"
            style="background-color: rgb(18, 18, 18); background: rgba(255, 255, 255, 0.12);" @click="goToCreateRecipe">
            <div class="d-flex align-items-center">
                <img :src="userAvatar" alt="User Avatar" class="user-avatar">
                <span class="ml-3 font-weight-bold">{{ userName }} ơi, bạn đang nghĩ gì thế!</span>
            </div>
        </div>

        <NewsFeedPost />
    </div>
</template>

<script>
import NewsFeedPost from './NewsFeedPost.vue';
import { useUserStore } from '../../store/userStore';
import { computed } from 'vue';

const BASE_URL = 'http://localhost:3000';

export default {
    name: 'RecipeNewsFeed',
    components: {
        NewsFeedPost,
    },
    setup() {
        const userStore = useUserStore();
        const { user } = userStore;

        return {
            userAvatar: computed(() => `${BASE_URL}/${user?.avatar}`),
            userName: computed(() => user?.name),
            userStore,
        };
    },
    methods: {
        goToCreateRecipe() {
            this.$router.push('/create-recipe');
        },
    },
};
</script>

<style scoped>
.user-avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 50%;
}

.click {
    cursor: pointer;
}
</style>