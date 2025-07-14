<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="header">
        <h1>ثبت نام</h1>
        <p>حساب کاربری جدید ایجاد کنید</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="input-group">
          <label for="email">ایمیل</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            :class="{ 'error': v$.email.$error }"
            placeholder="example@email.com"
            @blur="v$.email.$touch()"
          />
          <div v-if="v$.email.$error" class="error-text">
            <span v-if="v$.email.required.$invalid">ایمیل الزامی است</span>
            <span v-if="v$.email.email.$invalid">لطفا ایمیل معتبر وارد کنید</span>
          </div>
        </div>

        <div class="input-group">
          <label for="password">رمز عبور</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            :class="{ 'error': v$.password.$error }"
            placeholder="حداقل ۸ کاراکتر"
            @blur="v$.password.$touch()"
          />
          <div v-if="v$.password.$error" class="error-text">
            <span v-if="v$.password.required.$invalid">رمز عبور الزامی است</span>
            <span v-if="v$.password.minLength.$invalid">رمز عبور باید حداقل ۸ کاراکتر باشد</span>
          </div>
        </div>

        <div class="input-group">
          <label for="confirmPassword">تکرار رمز عبور</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            :class="{ 'error': v$.confirmPassword.$error }"
            placeholder="رمز عبور را مجددا وارد کنید"
            @blur="v$.confirmPassword.$touch()"
          />
          <div v-if="v$.confirmPassword.$error" class="error-text">
            <span v-if="v$.confirmPassword.required.$invalid">تکرار رمز عبور الزامی است</span>
            <span v-if="v$.confirmPassword.sameAsPassword.$invalid">رمزهای عبور مطابقت ندارند</span>
          </div>
        </div>

        <div v-if="error" class="error-alert">
          {{ error }}
        </div>

        <button
          type="submit"
          class="submit-button"
          :disabled="v$.$invalid || isLoading"
        >
          {{ isLoading ? 'در حال ثبت نام...' : 'ثبت نام' }}
        </button>

        <p class="link-text">
          حساب کاربری دارید؟ <router-link to="/login">وارد شوید</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SignupPage',
  computed: {
    ...mapGetters(['isLoading', 'error'])
  },
  methods: {
    ...mapActions(['register'])
  },
  setup() {
    const formData = reactive({
      email: '',
      password: '',
      confirmPassword: ''
    })

    const rules = computed(() => ({
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(formData.password)
      }
    }))

    const v$ = useVuelidate(rules, formData)

    return {
      formData,
      v$
    }
  },
  methods: {
    ...mapActions(['register']),
    async handleSubmit() {
      const result = await this.v$.$validate()
      if (result) {
        const registerResult = await this.register({
          email: this.formData.email,
          password: this.formData.password
        })

        if (registerResult.success) {
          this.$router.push('/dashboard')
        }
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600&display=swap');

* {
  font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.signup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef7f0 0%, #f8f4f0 50%, #f0f0f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  direction: rtl;
}

.signup-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  width: 100%;
  max-width: 420px;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header h1 {
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.header p {
  color: #718096;
  font-size: 0.95rem;
  font-weight: 300;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 0.25rem;
}

input {
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1rem;
  background: #fafafa;
  outline: none;
  direction: ltr;
}

input::placeholder {
  color: #a0aec0;
  font-weight: 300;
}

input:focus {
  border-color: #d69e2e;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.1);
}

input.error {
  border-color: #e53e3e;
  background: #fef5f5;
}

.error-text {
  color: #e53e3e;
  font-size: 0.85rem;
  font-weight: 400;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
}

.error-alert {
  background: #fef5f5;
  color: #e53e3e;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid #fed7d7;
}

.link-text {
  text-align: center;
  margin-top: 1.5rem;
  color: #718096;
  font-size: 0.9rem;
}

.link-text a {
  color: #d69e2e;
  text-decoration: none;
  font-weight: 500;
}

.link-text a:hover {
  text-decoration: underline;
}

.submit-button {
  background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
}

.submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #b7791f 0%, #975a16 100%);
}

.submit-button:disabled {
  background: #cbd5e0;
  color: #a0aec0;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 480px) {
  .signup-container {
    padding: 1rem;
  }

  .signup-card {
    padding: 2rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }
}
</style>