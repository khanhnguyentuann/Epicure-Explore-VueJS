<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <!-- Khi không có bài viết -->
    <p v-if="!userRecipes.length" class="text-center mt-5">Bạn chưa đăng bài viết nào!</p>

    <!-- Hiển thị danh sách bài đăng của người dùng -->
    <div v-for="recipe in userRecipes" :key="recipe.id" class="recipe-card card mb-4 p-3">

        <!-- Post Header -->
        <div class="d-flex align-items-center mb-1">
            <img :src="apiURL(recipe.user.avatar)" alt="User Avatar" class="user-avatar">
            <span class="ml-3 font-weight-bold">
                {{ recipe.user.name }}
            </span>

            <span class="ml-2 text-muted">{{ formatTime(recipe.timeAgo) }}</span>

            <div class="ml-auto dropdown">
                <button class="btn btn-light btn-sm" type="button" data-toggle="dropdown">
                    ...
                </button>
                <div class="click dropdown-menu">
                    <a class="dropdown-item" v-if="!recipe.isSaved" @click="saveRecipe(recipe.id)">Lưu bài
                        viết</a>
                    <a class="dropdown-item" v-else @click="unsaveRecipe(recipe.id)">Hủy lưu bài viết</a>
                    <a class="dropdown-item" href="#" @click.prevent="deleteRecipe(recipe.id)">Xóa bài viết</a>
                </div>
            </div>
        </div>

        <hr>

        <!-- Post Content -->
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
                        <img :src="apiURL(image)" class="d-block w-100" alt="Recipe image" style="height: 333px">
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
                        <img :src="apiURL(comment.userAvatar)" alt="User Avatar" class="rounded-circle shadow-1-strong me-3"
                            width="40" height="40">
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
                    <img :src="apiURL(userStore.user.avatar)" class="rounded-circle mr-2" width="40">

                    <textarea class="form-control" v-model="newCommentText[recipe.id]" rows="3"
                        placeholder="Viết bình luận..."></textarea>

                    <button class="btn btn-primary btn-sm ml-2" @click="addComment(recipe)">Gửi</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { useUserStore } from '../../store/userStore';
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';

const ROUTES = {
    myProfile: userId => `myprofile/${userId}`,
    favorite: 'favorite',
    unlike: id => `newsfeed/unlike/${id}`,
    like: id => `newsfeed/like/${id}`,
    comment: id => `newsfeed/${id}/comments`,
    save: id => `favorite/${id}`,
    unsave: id => `favorite/${id}`,
};

export default {
    name: 'MyPostCard',
    setup() {
        const userStore = useUserStore();
        const userRecipes = ref([]);
        const { user } = userStore;
        const showSteps = ref({});
        const newCommentText = ref({});
        const showComments = ref({});

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        onMounted(async () => {
            await loadUserRecipes(user, userRecipes);
            await loadFavoriteRecipes(user, userRecipes);
        });

        const loadUserRecipes = async ({ id: userId } = {}, userRecipes) => {
            try {
                const { data } = await axios.get(apiURL(ROUTES.myProfile(userId)));
                userRecipes.value = data;
            } catch (error) {
                console.error('Lỗi khi tải công thức của người dùng:', error?.response?.data?.message || error.message);
            }
        }

        const loadFavoriteRecipes = async ({ id: userId }, userRecipes) => {
            try {
                const { data } = await axios.get(apiURL(ROUTES.favorite), { params: { userId } });
                const savedRecipes = new Set(data.map(recipe => recipe.id));
                userRecipes.value = userRecipes.value.map(recipe => ({
                    ...recipe,
                    isSaved: savedRecipes.has(recipe.id),
                    isLiked: recipe.isLikedByCurrentUser,
                    likesCount: recipe.totalLikes,
                    comments: recipe.comments || [],
                }));

                for (const recipe of userRecipes.value) {
                    try {
                        const { data: commentsData } = await axios.get(apiURL(ROUTES.comment(recipe.id)));
                        recipe.comments = commentsData;
                    } catch (error) {
                        console.error(`Error loading comments for recipe ${recipe.id}:`, error);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài viết đã lưu:', error);
            }
        }

        const formatTime = time => {
            moment.locale('vi');
            return moment(time).fromNow();
        };

        const toggleComments = async recipe => {
            await nextTick();
            showComments.value[recipe.id] = !showComments.value[recipe.id];
        };

        const toggleLike = async recipe => {
            try {
                if (recipe.isLiked) {
                    await axios.delete(apiURL(ROUTES.unlike(recipe.id)), {
                        data: { sender_id: userStore.user.id }
                    });
                    recipe.isLiked = false;
                    recipe.likesCount -= 1;
                } else {
                    await axios.post(apiURL(ROUTES.like(recipe.id)), {
                        sender_id: userStore.user.id,
                    });
                    recipe.isLiked = true;
                    recipe.likesCount += 1;
                }
            } catch (error) {
                console.error('Lỗi khi thích/bỏ thích bài viết:', error);
            }
        };

        const addComment = async recipe => {
            try {
                const { data } = await axios.post(apiURL(ROUTES.comment(recipe.id)), {
                    userId: userStore.user.id,
                    content: newCommentText.value[recipe.id],
                });

                recipe.comments.push(data);
                newCommentText.value[recipe.id] = '';
                reloadComments(recipe.id);
            } catch (error) {
                console.error('Lỗi khi thêm bình luận:', error);
            }
        };

        const reloadComments = async recipeId => {
            try {
                const { data: commentsData } = await axios.get(apiURL(ROUTES.comment(recipeId)));
                const recipe = userRecipes.value.find(r => r.id === recipeId);
                if (recipe) {
                    recipe.comments = commentsData;
                }
            } catch (error) {
                console.error(`Error loading comments for recipe ${recipeId}:`, error);
            }
        };

        const deleteRecipe = async recipeId => {
            try {
                await axios.delete(apiURL(ROUTES.myProfile(userStore.user.id) + `/${recipeId}`));
                userRecipes.value = userRecipes.value.filter(recipe => recipe.id !== recipeId);
            } catch (error) {
                console.error('Lỗi khi xóa bài viết:', error);
            }
        };

        const saveRecipe = async recipeId => {
            try {
                await axios.post(apiURL(ROUTES.save(recipeId)), {
                    userId: userStore.user.id,
                });
                updateRecipeSaveStatus(recipeId, true);
            } catch (error) {
                console.error('Lỗi khi lưu bài viết:', error);
            }
        };

        const unsaveRecipe = async recipeId => {
            try {
                await axios.delete(apiURL(ROUTES.unsave(recipeId)), {
                    params: { userId: userStore.user.id }
                });
                updateRecipeSaveStatus(recipeId, false);
            } catch (error) {
                console.error('Lỗi khi hủy lưu bài viết:', error);
            }
        };

        const updateRecipeSaveStatus = (recipeId, isSaved) => {
            const recipe = userRecipes.value.find(r => r.id === recipeId);
            if (recipe) {
                recipe.isSaved = isSaved;
            }
        };

        const difficultyToStars = (difficulty) => {
            const difficultyMap = { 'dễ': 1, 'trung bình': 2, 'khó': 3 };
            return difficultyMap[difficulty] || 1;
        };

        const getMainIngredientsArray = (ingredients = []) => {
            return ingredients.map(ingredient => ({
                name: ingredient.name,
                amount: ingredient.amount
            }));
        };

        const getHashtags = (tags = []) => {
            return tags.length
                ? tags.map(tag => `#${tag}`).join(', ')
                : '';
        };

        return {
            userRecipes,
            userStore,
            showSteps,
            toggleComments,
            loadUserRecipes,
            newCommentText,
            showComments,
            addComment,
            loadFavoriteRecipes,
            apiURL,
            toggleLike,
            formatTime,
            getMainIngredientsArray,
            getHashtags,
            deleteRecipe,
            difficultyToStars,
            saveRecipe,
            unsaveRecipe,
        };
    }
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