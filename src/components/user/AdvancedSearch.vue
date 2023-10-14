<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container my-5">
        <div class="bordered-container">
            <form>
                <div class="mb-4">
                    <label for="ingredients" class="form-label">Enter Ingredient Name:</label>
                    <input v-model="ingredientQuery" @input="filterIngredients" type="text"
                        placeholder="Type to search ingredients..." class="form-control mb-3">
                    <div class="row gy-3">
                        <div v-for="ingredient in filteredIngredients" :key="ingredient.id" class="col-md-3">
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
        </div>
        <div v-if="searchedIngredients" class="mt-4">
            Search results for ingredients: "{{ searchedIngredients }}"
        </div>
        <div v-if="recipes.length === 0 && hasSearched" class="mt-4 alert alert-warning text-center">
            No recipes found with the selected ingredients.
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
        const ingredientQuery = ref('');
        const selectedIngredients = ref([]);
        const recipes = ref([]);
        const hasSearched = ref(false);
        const searchedIngredients = ref('');

        const filteredIngredients = computed(() => {
            return ingredients.value
                .filter(ing => ing.name.toLowerCase().includes(ingredientQuery.value.toLowerCase()))
                .slice(0, 24);
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
            searchedIngredients.value = ingredientsString;
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
            ingredientQuery,
            filteredIngredients,
            selectedIngredients,
            recipes,
            searchRecipes,
            apiURL,
            resetSelection,
            hasSearched,
            searchedIngredients
        };
    }
}
</script>

<style scoped>
.bordered-container {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
}
</style>
