<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container">
        <button @click="goBack" class="btn btn-secondary mb-3">Quay lại</button>

        <div class="card" style="color: #FFFFFF;background-color: #343a40;">
            <div class="card-header">
                <h1>{{ recipe.name }}</h1>
            </div>
            <div class="card-body">
                <p><strong>ID công thức:</strong> {{ recipe.id }}</p>
                <p><strong>Người tạo:</strong> {{ recipe.creator }}</p>
                <p><strong>Thời gian chuẩn bị:</strong> {{ recipe.preparationTime }}</p>
                <p><strong>Thời gian chế biến:</strong> {{ recipe.cookingTime }}</p>
                <p><strong>Dành cho:</strong> {{ recipe.servingFor }}</p>
                <p><strong>Mức độ khó:</strong> {{ recipe.difficulty }}</p>
                <p><strong>Ngày tạo:</strong> {{ formatDate(recipe.created_at) }}</p>
                <p>
                    <strong>Các bước chế biến:</strong>
                <ul v-if="recipe.steps && recipe.steps.length">
                    <li v-for="step in recipe.steps" :key="step">{{ step }}</li>
                </ul>

                </p>

                <h5>Các nguyên liệu chính:</h5>
                <ul v-if="recipe.ingredients && recipe.ingredients.length">
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">{{ ingredient.name }} - {{
                        ingredient.amount }}</li>
                </ul>

                <h5>Hashtags:</h5>
                <ul v-if="recipe.tags && recipe.tags.length">
                    <li v-for="tag in recipe.tags" :key="tag">{{ tag }}</li>
                </ul>

                <h5>Hình ảnh minh hoạ:</h5>
                <div v-if="recipe.images && recipe.images.length">
                    <img v-for="image in recipe.images" :key="image" :src="apiURL(image)" class="img-fluid"
                        alt="Recipe Image">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const ROUTES = {
    RecipeDetail: id => `recipes/${id}`,
};

export default {
    name: 'RecipesDetail',
    setup() {
        const recipe = ref({});
        const route = useRoute();
        const router = useRouter();

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        const goBack = () => {
            router.back();  // điều hướng quay lại trang trước
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        };

        const fetchRecipeDetails = async () => {
            const recipeId = route.params.id;  // Lấy ID từ URL bằng cách sử dụng useRoute
            try {
                const response = await axios.get(apiURL(ROUTES.RecipeDetail(recipeId)));
                recipe.value = response.data;
                if (recipe.value.steps) {
                    recipe.value.steps = JSON.parse(recipe.value.steps);
                }
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        onMounted(fetchRecipeDetails);

        return {
            recipe,
            apiURL,
            formatDate,
            goBack
        };
    }
};
</script>
