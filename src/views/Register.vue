<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0">
            <div class="row d-flex">
                <div class="col-lg-6">
                    <div class="card1 pb-5">
                        <div class="row">
                            <img src="@/assets/logos/main_logo.png" class="logo">
                        </div>
                        <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src="@/assets/images/login-image.jpg" class="image">
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card2 card border-0 px-4 py-5">
                        <div class="row px-3">
                            <h6 class="mb-0 col mr-4 mt-2">Login with </h6>
                            <div class="social-contact ml-4 ml-sm-5 mb-2 col">
                                <span class="fab fa-facebook-f mr-4 text-sm"></span>
                                <span class="fab fa-google-plus-g mr-4 text-sm"></span>
                                <span class="fab fa-linkedin-in mr-4 text-sm"></span>
                                <span class="fab fa-twitter mr-4 mr-sm-5 text-sm"></span>
                            </div>
                        </div>
                        <div class="row px-2 mb-4">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                        <form @submit.prevent="register">
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Username</h6>
                                </label>
                                <input v-model="username" type="text" class="mb-4" name="username"
                                    placeholder="Enter a username" required />
                            </div>
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Email Address</h6>
                                </label>
                                <input v-model="email" type="email" class="mb-4" name="email"
                                    placeholder="Enter a valid email address" required />
                            </div>
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Password</h6>
                                </label>
                                <input v-model="password" type="password" name="password" placeholder="Enter password"
                                    required />
                            </div>
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Confirm Password</h6>
                                </label>
                                <input v-model="confirmPassword" type="password" name="confirmPassword"
                                    placeholder="Confirm password" required />
                            </div>
                            <div class="row mb-3 px-3 mt-4">
                                <button type="submit" class="btn btn-blue text-center">Register</button>
                            </div>
                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Already have an account? <a class="text-danger"
                                        @click="goToLogin">Login</a></small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="bg-blue py-4">
                <div class="row px-3">
                    <div class="social-contact ml-4 ml-sm-5 mb-2">
                        <span class="fab fa-facebook-f mr-4 text-sm"></span>
                        <span class="fab fa-google-plus-g mr-4 text-sm"></span>
                        <span class="fab fa-linkedin-in mr-4 text-sm"></span>
                        <span class="fab fa-twitter mr-4 mr-sm-5 text-sm"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
        async register() {
            const userStore = useUserStore();
            if (this.password !== this.confirmPassword) {
                return alert('Passwords do not match.');
            }
            try {
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, email: this.email, password: this.password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    this.$router.push('/login');
                } else {
                    alert(data.message || 'Failed to register');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        }
    }
};
</script>

<style src="../assets/css/AuthStyles.css" scoped></style>
