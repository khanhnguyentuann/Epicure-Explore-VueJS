<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/attributes-order -->
<template>
    <div class="container mt-3">
        <div class="form">
            <i class="fa fa-search"></i>

            <div class="input-field second-wrap position-relative">
                <input type="text" class="form-control form-input" placeholder="Type the title!" v-model="title"
                    @keyup.enter="searchByTitle">
                <span v-if="title" class="clear-btn position-absolute" @click="clearSearch">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        </div>

        <!-- Thông báo kết quả tìm kiếm cho tiêu đề cụ thể -->
        <div v-if="searchAttempted" class="mt-3">
            <p>Search results for the title: "{{ title }}"</p>
        </div>

        <div v-if="recipes.length > 0">
            <ul class="list-group">
                <li class="list-group-item"
                    style="background-color: rgb(18, 18, 18); background: rgba(255, 255, 255, 0.12);"
                    v-for="recipe in recipes" :key="recipe.id">
                    {{ recipe.name }}
                </li>
            </ul>
        </div>
        <!-- Thông báo khi không có kết quả -->
        <div v-else-if="searchAttempted" class="alert alert-warning mt-3" role="alert">
            No results found.
        </div>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const ROUTES = {
    searchByTitle: `search/searchByTitle`,
};

export default {
    name: "TitleSearch",
    setup() {
        const title = ref('');
        const recipes = ref([]);
        const searchAttempted = ref(false);
        const router = useRouter();

        const apiURL = (relativePath) => {
            return window.baseURL + '/' + relativePath;
        };

        onMounted(() => {
            const titleFromQuery = router.currentRoute.value.query.title;
            if (titleFromQuery) {
                title.value = titleFromQuery;
                searchByTitle();
            }
        });

        const searchByTitle = async () => {
            searchAttempted.value = true;
            try {
                const response = await axios.get(apiURL(ROUTES.searchByTitle), {
                    params: { title: title.value }
                });
                recipes.value = response.data.recipes;
                // Cập nhật URL sau khi tìm kiếm
                router.push({ path: '/titlesearch', query: { title: title.value } });
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        };

        const clearSearch = () => {
            title.value = '';
        };

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

/* search */
.form {
    width: 100%;
    position: relative;
}

.form .fa-search {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #9ca3af;
}

.form-input {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    height: 55px;
    text-indent: 33px;
    border-radius: 10px;
}

.form-input:focus {
    box-shadow: none;
    border: none;
}
</style>