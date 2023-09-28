<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-indent -->
<template>
    <div class="edit-tag-container">
        <div class="header-section">
            <h3>Update Tag</h3>
        </div>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="updateTag">
                    <div class="mb-3">
                        <label for="tagName" class="form-label">Name</label>
                        <input id="tagName" v-model="tag.tag_name" type="text" class="form-control" required />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Update Tag</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'EditTag',
    data() {
        return {
            tag: {
                name: '',
            }
        };
    },
    async mounted() {
        try {
            const tagId = this.$route.params.id;
            const response = await axios.get(`http://localhost:3000/tags/${tagId}`);

            this.tag.tag_name = response.data.tag_name; // sửa ở đây
        } catch (error) {
            console.error("Error fetching tag:", error);
        }
    },
    methods: {
        async updateTag() {
            const tagId = this.$route.params.id;
            try {
                const response = await axios.put(`http://localhost:3000/tags/${tagId}`, {
                    name: this.tag.tag_name,
                });
                if (response.status === 200) {
                    alert('Tag updated successfully');
                    this.$router.push('/admin/tag-list');
                } else {
                    alert('Failed to update tag. Please try again.');
                }
            } catch (error) {
                console.error("Error updating tag:", error);
                alert('Error updating tag. Please try again.');
            }
        }
    }
};
</script>

<style scoped>
.edit-tag-container {
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
  