<!-- eslint-disable vue/attributes-order -->
<template>
    <div class="container mt-3">
        <h3 class="display-4">Tìm kiếm theo Title:</h3>
        <form @submit.prevent="searchByTitle" class="mb-3">
            <div class="inner-form">
                <div class="input-field first-wrap">Title</div>
                <div class="input-field second-wrap">
                    <div class="input-field second-wrap position-relative">
                        <input id="search" type="text" placeholder="Enter Title?" v-model="title" />
                        <span v-if="title" class="clear-btn position-absolute" @click="clearSearch">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                </div>
                <div class="input-field third-wrap">
                    <button class="btn-search" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
        <div v-if="recipes.length > 0">
            <h2 class="display-6">Search Results:</h2>
            <ul class="list-group">
                <li class="list-group-item" v-for="recipe in recipes" :key="recipe.id">
                    {{ recipe.name }}
                </li>
            </ul>
        </div>
        <!-- Thêm thông báo khi không có kết quả -->
        <div v-else-if="searchAttempted" class="alert alert-warning mt-3" role="alert">
            <p>No results found for the title "{{ title }}"</p>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

const ROUTES = {
    searchByTitle: `search/searchByTitle`,
};

export default {
    name: "TitleSearch",
    setup() {
        const title = ref('');
        const recipes = ref([]);
        const searchAttempted = ref(false);

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        const searchByTitle = async () => {
            searchAttempted.value = true;
            try {
                const response = await axios.get(apiURL(ROUTES.searchByTitle), {
                    params: { title: title.value }
                });
                recipes.value = response.data.recipes;
            } catch (error) {
                console.error('An error occurred while fetching data: ', error);
            }
        };

        const clearSearch = () => {
            title.value = '';
        };

        // Thêm cảnh quan sát cho biến 'title'
        watch(title, (newVal) => {
            if (newVal === '') {
                searchAttempted.value = false;
                recipes.value = []; // Xoá các kết quả tìm kiếm
            }
        });

        return {
            apiURL,
            searchByTitle,
            searchAttempted,
            clearSearch,
            title,
            recipes
        };
    }
}
</script>

<style scoped>
form {
    width: 100%;
    margin-bottom: 0;
}

.inner-form {
    background: #fff;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, .15);
    border-radius: 3px;
}

.input-field.first-wrap {
    border-right: 3px solid rgba(162, 141, 141, 0.1);
    height: 100%;
    padding: 10px 32px;
}

.input-field {
    height: 68px;
}

.input-field.second-wrap {
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.inner-form .input-field input {
    height: 100%;
    border: 0;
    width: 100%;
    padding: 10px 32px;
}

.inner-form .input-field.third-wrap {
    width: 74px;
}

.inner-form .input-field.third-wrap .btn-search {
    height: 100%;
    width: 100%;
    color: #fff;
    border: 0;
    cursor: pointer;
    background: #63c76a;
    transition: all .2s ease-out, color .2s ease-out;
}

/* Clearserach ---------- */
.position-relative {
    position: relative;
}

.position-absolute {
    position: absolute;
}

.clear-btn {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>