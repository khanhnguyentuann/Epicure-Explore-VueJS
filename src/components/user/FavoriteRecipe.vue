<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container mt-3">
        <h2 class="text-center mb-4"
            style="color: #dbe2ef; font-weight: 700; letter-spacing: -0.5px; text-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
            <i class="fas fa-star text-warning mr-2"></i>
            Saved Recipes List
        </h2>

        <div v-if="savedRecipes.length" class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="recipe in savedRecipes" :key="recipe.id" class="col mt-3">
                <div class="card h-100 rounded shadow-sm position-relative"
                    style="background-color: rgba(255, 255, 255, 0.12);">

                    <button type="button" class="btn btn-link text-danger position-absolute m-2 bg-transparent"
                        data-toggle="modal" data-target="#exampleModal" @click="openModal(recipe.id)">
                        <i class="fas fa-times"></i>
                    </button>

                    <router-link :to="'/postdetails/' + recipe.id" class="text-decoration-none text-dark">
                        <img :src="'http://localhost:3000/' + (recipe.firstImage ? recipe.firstImage : recipe.image)"
                            class="card-img-top rounded-top img-fluid" alt="Recipe Image"
                            v-if="recipe.firstImage || recipe.image">

                        <div class="card-body text-light">
                            <h5 class="card-title">{{ recipe.name }}</h5>
                            <div class="row">
                                <p class="card-text col-6 text-light">Cooking Time: {{ recipe.preparationTime }} minutes</p>
                                <p class="card-text col-6 text-light">Serves: {{ recipe.servingFor }} people</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else class="text-center mt-3">
            <span>Favorites list is empty!</span>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to remove this recipe from the favorites list?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="confirmDelete(recipeId)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../store/userStore';
import $ from 'jquery';

const BASE_URL = 'http://localhost:3000';

export default {
    name: 'FavoriteRecipe',
    setup() {
        return {
            userStore: useUserStore(),
        };
    },

    data() {
        return {
            savedRecipes: [],
            recipeToDelete: null,
        };
    },

    async created() {
        await this.fetchSavedRecipes();
    },
    methods: {
        async fetchSavedRecipes() {
            const { userStore } = this;
            const { user: { id: userId }, token } = userStore;

            try {
                const { data } = await axios.get(`${BASE_URL}/favorite`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.savedRecipes = data;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách công thức đã lưu:', error);
            }
        },
        async unsaveRecipe(recipeId) {
            const { user: { id: userId }, token } = this.userStore;

            try {
                await axios.delete(`${BASE_URL}/favorite/${recipeId}`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                await this.fetchSavedRecipes();
            } catch (error) {
                console.error('Lỗi khi hủy lưu công thức:', error);
            }
        },
        openModal(recipeId) {
            this.recipeToDelete = recipeId;
        },
        async confirmDelete() {
            $('#exampleModal').modal('hide');
            if (this.recipeToDelete !== null) {
                await this.unsaveRecipe(this.recipeToDelete);
                this.recipeToDelete = null;
            }
        },
    },
};
</script>

<style scoped>
.card-img-top {
    height: 200px;
    object-fit: cover;
}

.card:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-weight: bold;
}

.card-text {
    color: #555;
    font-size: 13px;
}

.btn-link.position-absolute {
    right: 0;
}

.btn-link.text-danger {
    border: 2px solid white;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
}

.btn-link.text-danger:hover {
    background-color: rgba(255, 255, 255, 0.6);
}

.fas.fa-times {
    font-size: 1.5rem;
}
</style>