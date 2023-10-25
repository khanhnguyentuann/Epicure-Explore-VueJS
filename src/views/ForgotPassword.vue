<!-- eslint-disable vue/attributes-order -->
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
                        <div class="row mb-4 px-3">
                            <h6 class="mb-0 mr-4 mt-2">Forgot Password</h6>
                        </div>
                        <div class="row px-3 mb-4">
                            <div class="line"></div>
                        </div>

                        <!-- Form gửi OTP và Verify OTP -->
                        <form v-if="showOTPIsVisible" @submit.prevent="verifyOTP">
                            <label class="mb-1">
                                <h6 class="mb-0 text-sm">Email Address</h6>
                            </label>
                            <div class="row">
                                <div class="col-md-8">
                                    <input v-model="email" type="email" class="mb-4" name="email"
                                        placeholder="Enter your email address" required />
                                </div>
                                <div class="col-md-4 mb-4 d-flex justify-content-center align-items-center">
                                    <button type="button" @click="sendOTP" :disabled="otpSent"
                                        class="btn btn-blue text-center">
                                        <span v-if="otpSent">Resend in {{ countdown }}s</span>
                                        <span v-else>Send OTP</span>
                                    </button>
                                </div>
                            </div>

                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">OTP Code</h6>
                                </label>
                                <input v-model="otp" type="text" name="otp" placeholder="Enter your OTP" />
                            </div>

                            <div class="row mb-3 px-3 mt-4">
                                <button type="submit" class="btn btn-blue text-center">Verify OTP</button>
                            </div>

                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Remember your password? <a class="text-danger"
                                        @click="redirectToLogin">Login</a></small>
                            </div>
                        </form>

                        <!-- Form reset mật khẩu -->
                        <form v-else @submit.prevent="resetPassword">
                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">New Password</h6>
                                </label>
                                <input v-model="newPassword" type="password" name="newPassword"
                                    placeholder="Enter your new password" />
                            </div>

                            <div class="row px-3">
                                <label class="mb-1">
                                    <h6 class="mb-0 text-sm">Confirm New Password</h6>
                                </label>
                                <input v-model="confirmPassword" type="password" name="confirmPassword"
                                    placeholder="Confirm your new password" />
                            </div>

                            <div class="row mb-3 px-3 mt-4">
                                <button type="submit" class="btn btn-blue text-center">Reset Password</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref('');
        const otp = ref('');
        const router = useRouter();
        const otpSent = ref(false);
        const countdown = ref(60); // 60 giây
        const intervalId = ref(null);
        const newPassword = ref('');
        const confirmPassword = ref('');
        const resetToken = ref('');
        const showOTPIsVisible = ref(true);

        const redirectToLogin = () => {
            router.push('/login');
        };

        const showAlert = (message) => {
            alert(message);
        };

        const handleApiResponse = async (response) => {
            const data = await response.json();

            if (response.ok) {
                showAlert(data.message);
            } else {
                console.error('API error:', data);
                showAlert(data.error || 'An error occurred. Please try again.');
            }
        };

        const sendOTP = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email.value }),
                });

                if (response.ok) {
                    const data = await response.json();
                    showAlert(data.message);

                    otpSent.value = true;
                    intervalId.value = setInterval(() => {
                        countdown.value -= 1;
                        if (countdown.value <= 0) {
                            clearInterval(intervalId.value);
                            otpSent.value = false;
                        }
                    }, 1000); // giảm 1 giây mỗi lần

                } else {
                    const errorData = await response.json();
                    showAlert(errorData.message);
                }

            } catch (error) {
                console.error('Error sending otp:', error);
                showAlert('An error occurred. Please try again.');
            }
        };

        const verifyOTP = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email.value, otp: otp.value }),
                });

                const data = await response.json(); // Lấy dữ liệu JSON từ phản hồi trước

                if (response.ok) {
                    showAlert(data.message);
                    showOTPIsVisible.value = false; // Ẩn form
                    resetToken.value = data.resetToken; // Lấy resetToken từ phản hồi JSON
                } else {
                    // Trong trường hợp có lỗi (ví dụ: mã 400), hiển thị thông báo lỗi từ server
                    showAlert(data.message);
                }

            } catch (error) {
                console.error('Error verifying OTP:', error);
                showAlert('An error occurred. Please try again.');
            }
        };

        const resetPassword = async () => {
            try {
                if (newPassword.value !== confirmPassword.value) {
                    showAlert('Passwords do not match. Please try again.');
                    return;
                }

                const response = await fetch('http://localhost:3000/auth/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resetToken: resetToken.value, newPassword: newPassword.value }),
                });

                await handleApiResponse(response);

                if (response.ok) {
                    redirectToLogin();
                }

            } catch (error) {
                console.error('Error resetting password:', error);
                showAlert('An error occurred. Please try again.');
            }
        };


        return {
            email,
            otp,
            newPassword,
            confirmPassword,
            sendOTP,
            otpSent,
            redirectToLogin,
            verifyOTP,
            resetPassword,
            countdown,
            showOTPIsVisible,
            resetToken
        };
    }
};
</script>

  
<style src="../assets/css/AuthStyles.css" scoped></style>
  