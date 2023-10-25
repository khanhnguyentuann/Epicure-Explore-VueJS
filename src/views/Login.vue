<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-indent -->
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
                        <div class="row mb-4 px-3">
                            <h6 class="mb-0 mr-4 mt-2">Sign in with</h6>
                            <!-- <div class="facebook text-center mr-3">
                                <div class="fa fa-facebook"></div>
                            </div>
                            <div class="twitter text-center mr-3">
                                <div class="fa fa-twitter"></div>
                            </div>
                            <div class="linkedin text-center mr-3">
                                <div class="fa fa-linkedin"></div>
                            </div> -->
                        </div>
                        <div class="row px-3 mb-4">
                            <div class="line"></div>
                            <small class="or text-center">Or</small>
                            <div class="line"></div>
                        </div>
                        <form @submit.prevent="login">
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
                            <div class="row px-3 mb-4">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input id="chk1" type="checkbox" name="chk" class="custom-control-input">
                                    <label for="chk1" class="custom-control-label text-sm">Remember me</label>
                                </div>
                                <a href="#" class="ml-auto mb-0 text-sm" @click="goToForgotPassword">Forgot Password?</a>
                            </div>
                            <div class="row mb-3 px-3">
                                <button type="submit" class="btn btn-blue text-center">Login</button>
                            </div>
                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Don't have an account? <a class="text-danger"
                                        @click="goToRegister">Register</a></small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="bg-blue py-4">
                <div class="row px-3">
                    <!-- <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2023. All rights reserved.</small> -->
                    <div class="social-contact ml-4 ml-sm-auto">
                        <span class="fa fa-facebook mr-4 text-sm"></span>
                        <span class="fa fa-google-plus mr-4 text-sm"></span>
                        <span class="fa fa-linkedin mr-4 text-sm"></span>
                        <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
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
            email: "",
            password: ""
        };
    },
    methods: {
        goToRegister() {
            this.$router.push('/register');
        },
        goToForgotPassword() {
            this.$router.push('/forgot-password');
        },

        async login() {
            const userStore = useUserStore();
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: this.email, password: this.password })
                });

                const data = await response.json();

                if (response.ok) {
                    userStore.setToken(data.token);
                    userStore.setUser(data.user);

                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));


                    if (data.user.role === 'admin') {
                        this.$router.push('/admin');
                    } else {
                        this.$router.push('/');
                    }
                } else {
                    alert(data.message || 'Failed to login');
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        },
    }
};
</script>

<style src="../assets/css/AuthStyles.css" scoped></style>

  