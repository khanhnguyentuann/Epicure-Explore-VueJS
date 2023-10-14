<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container my-5">
        <h1 class="mb-4 text-center">Advanced Search</h1>
        <form>
            <div class="mb-4">
                <label for="ingredients" class="form-label">Choose Ingredients:</label>
                <div class="row gy-3">
                    <div v-for="ingredient in sortedIngredients" :key="ingredient.id" class="col-md-3">
                        <div class="form-check">
                            <input type="checkbox" :value="ingredient.name" v-model="selectedIngredients"
                                class="form-check-input" :id="'ingredient-' + ingredient.id">
                            <label class="form-check-label" :for="'ingredient-' + ingredient.id">{{ ingredient.name
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" @click="searchRecipes" class="btn btn-primary mr-3">Search</button>
                <button type="button" @click="resetSelection" class="btn btn-outline-secondary">Reset</button>
            </div>
        </form>
        <div v-if="recipes.length === 0 && hasSearched" class="mt-4 alert alert-warning text-center">
            Chưa có công thức nào với nguyên liệu đã chọn.
        </div>
        <ul class="list-group mt-4" v-else>
            <li v-for="recipe in recipes" :key="recipe.id" class="list-group-item">{{ recipe.name }}</li>
        </ul>
    </div>
</template>


<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const ROUTES = {
    ingredientList: 'search/getAllIngredients',
    searchByIngredients: 'search/searchByIngredients',
};

export default {
    name: "AdvancedSearch",
    setup() {
        const ingredients = ref([]);
        const selectedIngredients = ref([]);
        const recipes = ref([]);
        const hasSearched = ref(false);

        const sortedIngredients = computed(() => {
            return [...ingredients.value].sort((a, b) => a.name.localeCompare(b.name));
        });

        const apiURL = (relativePath, params = '') => {
            return window.baseURL + '/' + relativePath + params;
        };

        const fetchIngredients = async () => {
            try {
                const response = await axios.get(apiURL(ROUTES.ingredientList));
                ingredients.value = response.data.ingredients;
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        const searchRecipes = async () => {
            const ingredientsString = selectedIngredients.value.join(',');
            try {
                const response = await axios.get(apiURL(ROUTES.searchByIngredients, `?ingredients=${ingredientsString}`));
                recipes.value = response.data.recipes;
                hasSearched.value = true;
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        const resetSelection = () => {
            selectedIngredients.value = [];
            recipes.value = [];
        };

        onMounted(() => {
            fetchIngredients();
        });

        return {
            ingredients,
            selectedIngredients,
            recipes,
            searchRecipes,
            apiURL,
            resetSelection,
            sortedIngredients,
            hasSearched
        };
    }
}
</script>

<style scoped>
/* Add any additional styles you want here */
</style>

