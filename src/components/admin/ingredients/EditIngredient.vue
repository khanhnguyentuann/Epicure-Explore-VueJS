<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-indent -->
<template>
    <div class="edit-ingredient-container">
        <div class="header-section">
            <h3>Update Ingredient</h3>
        </div>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="updateIngredient">
                    <div class="mb-3">
                        <label for="ingredientName" class="form-label">Name</label>
                        <input id="ingredientName" v-model="ingredient.name" type="text" class="form-control" required />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Update Ingredient</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'EditIngredients',
    data() {
        return {
            ingredient: {
                name: '',
            }
        };
    },
    async mounted() {
        try {
            const ingredientId = this.$route.params.id;
            const response = await axios.get(`http://localhost:3000/ingredients/${ingredientId}`);

            this.ingredient.name = response.data.name;
        } catch (error) {
            console.error("Error fetching ingredient:", error);
        }
    },
    methods: {
        async updateIngredient() {
            const ingredientId = this.$route.params.id;
            try {
                const response = await axios.put(`http://localhost:3000/ingredients/${ingredientId}`, {
                    name: this.ingredient.name,
                });
                if (response.status === 200) {
                    alert('Ingredient updated successfully');
                    this.$router.push('/admin/ingredient-list');
                } else {
                    alert('Failed to update ingredient. Please try again.');
                }
            } catch (error) {
                console.error("Error updating ingredient:", error);
                alert('Error updating ingredient. Please try again.');
            }
        }
    }
};
</script>

<style scoped>
.edit-ingredient-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.header-section {
    margin-bottom: 2rem;
    text-align: center;
}
</style>
  