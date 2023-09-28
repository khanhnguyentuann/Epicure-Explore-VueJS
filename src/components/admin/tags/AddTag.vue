<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-indent -->
<template>
    <div class="add-tag-container">
        <div class="header-section">
            <h3>Add Tag</h3>
        </div>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="addCategory">
                    <div class="mb-3">
                        <label for="tagName" class="form-label">Name the tag</label>
                        <input id="tagName" v-model="name" type="text" class="form-control" required>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Add Tag</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
        };
    },
    methods: {
        async addCategory() {
            try {
                const response = await axios.post('http://localhost:3000/tags', {
                    name: this.name,
                });
                if (response.status === 201) {
                    alert('Tag added successfully');
                    this.$router.push('/admin/tag-list');
                } else {
                    alert('Failed to add tag. Please try again.');
                }
            } catch (error) {
                console.error("Error adding tag:", error);
                alert('Error adding tag. Please try again.');
            }
        }
    }
};
</script>
  
<style scoped>
.add-tag-container {
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