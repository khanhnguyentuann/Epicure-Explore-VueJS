<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="user-profile container mt-3">
        <MyInfoCard />
        <ul class="nav nav-tabs" id="profileTabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts"
                    aria-selected="true">Bài đăng</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="friends-tab" data-toggle="tab" href="#friends" role="tab" aria-controls="friends"
                    aria-selected="true">Bạn bè</a>
            </li>
        </ul>

        <div class="tab-content" id="profileTabsContent">
            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                <MyPostCard />
            </div>
            <div class="tab-pane fade" id="friends" role="tabpanel" aria-labelledby="friends-tab">
                <MyFriendCard />
            </div>
        </div>
    </div>
</template>

<script>
import MyInfoCard from './MyInfoCard.vue';
import MyPostCard from './MyPostCard.vue';
import MyFriendCard from './MyFriendCard.vue';

export default {
    name: 'MyProfile',
    components: {
        MyInfoCard,
        MyPostCard,
        MyFriendCard
    },
};
</script>


<style scoped>
.user-profile {
    max-width: 800px;
    margin: 0 auto;
}
</style>