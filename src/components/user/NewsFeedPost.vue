<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card card mb-4 p-3">
        <!-- Post Header -->
        <div class="d-flex align-items-center mb-1">
            <img :src="'http://localhost:3000/' + recipe.user.avatar" alt="User Avatar" class="click user-avatar"
                @click="goToUserProfile(recipe.user_id)">
            <span class="click ml-3 font-weight-bold" @click="goToUserProfile(recipe.user_id)">
                {{ recipe.user.name }}
            </span>

            <span class="ml-2 text-muted">{{ formatTime(recipe.created_at) }}</span>
            <div class="ml-auto dropdown">
                <button class="btn btn-light btn-sm" type="button" data-toggle="dropdown">
                    ...
                </button>
                <div class="click dropdown-menu">
                    <a class="dropdown-item" v-if="!recipe.isSaved" @click="saveRecipe(recipe.id)">Lưu bài viết</a>
                    <a class="dropdown-item" v-else @click="unsaveRecipe(recipe.id)">Hủy lưu bài viết</a>
                    <a class="dropdown-item" v-if="userStore.user && recipe.user_id === userStore.user.id"
                        @click="deleteRecipe(recipe.id)">Xoá bài viết</a>

                </div>
            </div>
        </div>

        <hr>

        <!-- Post Body -->
        <div class="card-body p-0">
            <h5 class="card-title mb-3 text-center">{{ recipe.name }}</h5>
            <div class="row">
                <p class="col-6 font-weight-bold">
                    Độ khó:
                    <i v-for="n in difficultyToStars(recipe.difficulty)" :key="n" class="fas fa-star"></i>
                </p>

                <p class="col-6 text-right font-weight-bold">
                    <i class="fas fa-users mr-2"></i>
                    Dành cho: {{ recipe.servingFor }} người
                </p>
            </div>

            <p class="font-weight-bold">
                <i class="fas fa-utensils mr-2"></i>
                Nguyên liệu chính:
            </p>
            <div class="row ml-2 mb-3">
                <div class="col-4 font-italic" v-for="ingredient in getMainIngredientsArray(recipe.ingredients)"
                    :key="ingredient.name">
                    > {{ ingredient.name }}: {{ ingredient.amount }}
                </div>
            </div>


            <!-- Carousel hiển thị ảnh bài viết -->
            <div v-if="recipe.images && recipe.images.length" :id="`carousel-${recipe.id}`" class="carousel slide"
                data-ride="carousel">
                <ol class="carousel-indicators">
                    <li v-for="(image, index) in recipe.images" :key="index" :data-target="`#carousel-${recipe.id}`"
                        :data-slide-to="index" :class="{ 'active': index === 0 }"></li>
                </ol>
                <div class="carousel-inner">
                    <div v-for="(image, index) in recipe.images" :key="index"
                        :class="{ 'carousel-item': true, 'active': index === 0 }">
                        <img :src="'http://localhost:3000/' + image" class="d-block w-100" alt="Recipe image"
                            style="height: 333px">
                    </div>
                </div>
                <a class="carousel-control-prev" :href="`#carousel-${recipe.id}`" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" :href="`#carousel-${recipe.id}`" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>


            <div class="row mt-3">
                <p class="col-6 font-weight-bold">
                    <i class="fas fa-clock"></i>
                    Thời gian chuẩn bị: {{ recipe.preparationTime }} phút
                </p>
                <p class="col-6 text-right font-weight-bold">
                    <i class="fas fa-clock"></i>
                    Thời gian chế biến: {{ recipe.cookingTime }} phút
                </p>
            </div>

            <div class="text-justify mb-3">
                <p class="font-weight-bold mb-2">
                    <i class="fas fa-list-ul"></i> Các bước chế biến:
                </p>

                <span class="click font-weight-bold font-italic text-primary mb-2 d-block" v-if="!showSteps[recipe.id]"
                    @click="showSteps[recipe.id] = true">Xem thêm</span>

                <div v-if="showSteps[recipe.id]">
                    <ul class="list-group list-group-flush">
                        <li v-for="(step, index) in recipe.steps" :key="index" class="list-group-item">
                            <strong>Bước {{ index + 1 }}:</strong> {{ step }}
                        </li>
                    </ul>
                    <span class="click font-weight-bold font-italic text-primary mt-2 d-block"
                        @click="showSteps[recipe.id] = false">Ẩn bớt</span>
                </div>
            </div>

            <div class="row" v-if="getHashtags(recipe.tags).length">
                <div class="col-3 font-weight-bold">
                    <i class="fas fa-hashtag"></i> Hashtags:
                </div>
                <div class="col-9">
                    {{ getHashtags(recipe.tags) }}
                </div>
            </div>
        </div>

        <!-- Post Footer -->
        <div class="card-footer mt-3">

            <div class="row">
                <div class="col-6">
                    <i class="btn" :class="{ 'btn-primary': recipe.isLiked, '': !recipe.isLiked }">
                        <i class="fas fa-thumbs-up"></i>
                        {{ recipe.likesCount }} Thích
                    </i>
                </div>

                <div class="col-6 text-right">
                    <i class="far fa-comment"></i>
                    {{ recipe.commentsCount }} Bình luận
                </div>
            </div>

            <div class="row mt-3 text-center">
                <div class="col-4">
                    <button class="btn btn-hover" @click="toggleLike(recipe)">
                        <i class="far fa-thumbs-up"></i> Thích
                    </button>
                </div>

                <div class="col-4">
                    <button class="btn btn-hover" @click="toggleComments(recipe)">
                        <i class="far fa-comment-alt"></i> Bình luận
                    </button>
                </div>

                <div class="col-4">
                    <button class="btn btn-hover">
                        <i class="fas fa-share"></i> Chia sẻ
                    </button>
                </div>
            </div>

        </div>

        <div class="card mt-3" v-if="showComments[recipe.id]">

            <div class="card-header">
                <i class="far fa-comment-alt mr-2"></i>
                <span class="ml-2">Bình luận</span>
            </div>

            <div class="card-body">
                <div v-for="comment in recipe.comments" :key="comment.id">
                    <div class="d-flex flex-start mb-2">
                        <img :src="'http://localhost:3000/' + comment.userAvatar" alt="User Avatar"
                            class="rounded-circle shadow-1-strong me-3" width="40" height="40">
                        <div class="flex-grow-1 flex-shrink-1 ml-3">
                            <div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p class="mb-1">
                                        <strong>{{ comment.userName }}</strong>
                                        - <span class="small">{{ formatTime(comment.created_at) }}</span>
                                    </p>
                                </div>
                                <p class="small mb-0">
                                    {{ comment.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <div class="d-flex align-items-center">
                    <img :src="userAvatar" class="rounded-circle mr-2" width="40">

                    <textarea class="form-control" v-model="newCommentText[recipe.id]" rows="3"
                        placeholder="Viết bình luận..."></textarea>

                    <button class="btn btn-primary btn-sm ml-2" @click="addComment(recipe)">Gửi</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../store/userStore';
import { computed, watch } from 'vue';
import moment from 'moment';
import 'moment/locale/vi';

const BASE_URL = 'http://localhost:3000';
const ROUTES = {
    newsfeedAll: `${BASE_URL}/newsfeed/all`,
    favorite: `${BASE_URL}/favorite`,
    comment: id => `${BASE_URL}/newsfeed/${id}/comments`,
    delete: id => `${BASE_URL}/newsfeed/delete/${id}`,
    save: id => `${BASE_URL}/favorite/${id}`,
};

export default {
    name: 'NewsFeedPost',
    setup() {
        const userStore = useUserStore();
        const { user } = userStore;

        return {
            userAvatar: computed(() => `${BASE_URL}/${user?.avatar}`),
            userName: computed(() => user?.name),
            userStore,
        };
    },
    data() {
        return {
            recipes: [],
            newCommentText: {},
            showComments: {},
            showSteps: {},
        };
    },
    async mounted() {
        try {
            const userId = this.userStore.user.id;
            const [{ data: recipesData }, { data: favoriteData }] = await Promise.all([
                axios.get(ROUTES.newsfeedAll, { params: { userId } }),
                axios.get(ROUTES.favorite, { params: { userId } }),
            ]);

            const savedRecipes = new Set(favoriteData.map(recipe => recipe.id));

            this.recipes = recipesData.map(recipe => ({
                ...recipe,
                isSaved: savedRecipes.has(recipe.id),
                isLiked: recipe.isLikedByCurrentUser,
                likesCount: recipe.totalLikes,
                comments: recipe.comments || [],
            }));

            for (const recipe of this.recipes) {
                try {
                    const { data: commentsData } = await axios.get(ROUTES.comment(recipe.id));
                    recipe.comments = commentsData;
                } catch (error) {
                    console.error(`Error loading comments for recipe ${recipe.id}:`, error);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải công thức:', error);
        }
    },
    methods: {
        formatTime(time) {
            moment.locale('vi');
            return moment(time).fromNow();
        },
        toggleComments(recipe) {
            this.$nextTick(() => {
                this.showComments[recipe.id] = !this.showComments[recipe.id];
            });
        },
        async toggleLike(recipe) {
            try {
                if (recipe.isLiked) {
                    await axios.delete(`${BASE_URL}/newsfeed/unlike/${recipe.id}`, {
                        data: { userId: this.userStore.user.id }
                    });
                    recipe.isLiked = false;
                    recipe.likesCount -= 1;
                } else {
                    await axios.post(`${BASE_URL}/newsfeed/like/${recipe.id}`, {
                        userId: this.userStore.user.id,
                    });
                    recipe.isLiked = true;
                    recipe.likesCount += 1;
                }
            } catch (error) {
                console.error('Lỗi khi thích/bỏ thích bài viết:', error);
            }
        },

        async addComment(recipe) {
            try {
                const { data } = await axios.post(`${BASE_URL}/newsfeed/${recipe.id}/comments`, {
                    userId: this.userStore.user.id,
                    content: this.newCommentText[recipe.id],
                });

                recipe.comments.push(data);
                this.newCommentText[recipe.id] = '';
                this.reloadComments(recipe.id);
            } catch (error) {
                console.error('Lỗi khi thêm bình luận:', error);
            }
        },

        async reloadComments(recipeId) {
            try {
                const { data: commentsData } = await axios.get(ROUTES.comment(recipeId));
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (recipe) {
                    recipe.comments = commentsData;
                }
            } catch (error) {
                console.error(`Error loading comments for recipe ${recipeId}:`, error);
            }
        },

        async deleteRecipe(recipeId) {
            try {
                await axios.delete(`${BASE_URL}/newsfeed/delete/${recipeId}`);
                this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
            } catch (error) {
                console.error('Lỗi khi xoá bài viết:', error);
            }
        },
        async saveRecipe(recipeId) {
            try {
                await axios.post(`${BASE_URL}/favorite/${recipeId}`, {
                    userId: this.userStore.user.id,
                });
                this.updateRecipeSaveStatus(recipeId, true);
            } catch (error) {
                console.error('Lỗi khi lưu bài viết:', error);
            }
        },
        async unsaveRecipe(recipeId) {
            try {
                await axios.delete(`${BASE_URL}/favorite/${recipeId}`, {
                    params: { userId: this.userStore.user.id }
                });
                this.updateRecipeSaveStatus(recipeId, false);
            } catch (error) {
                console.error('Lỗi khi xóa bài viết khỏi danh sách đã lưu:', error);
            }
        },
        updateRecipeSaveStatus(recipeId, isSaved) {
            const recipe = this.recipes.find(r => r.id === recipeId);
            if (recipe) {
                recipe.isSaved = isSaved;
            }
        },

        difficultyToStars(difficulty) {
            const difficultyMap = { 'dễ': 1, 'trung bình': 2, 'khó': 3 };
            return difficultyMap[difficulty] || 1;
        },

        getMainIngredientsArray(ingredients = []) {
            return ingredients.map(ingredient => ({
                name: ingredient.name,
                amount: ingredient.amount
            }));
        },

        getHashtags(tags = []) {
            return tags.length
                ? tags.map(tag => `#${tag}`).join(', ')
                : '';
        },
        goToUserProfile(userId) {
            if (userId === this.userStore.user.id) {
                this.$router.push('/myprofile');
            } else {
                this.$router.push(`/otherprofile/${userId}`);
            }
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

.btn-hover:hover {
    background-color: #e2e6ea;
}

.click {
    cursor: pointer;
}

.liked {
    color: blue;
}

.recipe-card {
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.recipe-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.star-container {
    display: flex;
    align-items: center;
    min-height: 38px;
}

i.fas.fa-star {
    color: gold;
}

i.far.fa-star {
    color: lightgray;
}
</style>