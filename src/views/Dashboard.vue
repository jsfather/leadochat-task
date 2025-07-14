<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="welcome-card">
        <div class="welcome-header">
          <h1>خوش آمدید</h1>
          <p class="user-info">
            شما با ایمیل <strong>{{ userEmail }}</strong> وارد شده‌اید
          </p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="card-icon">✓</div>
          <h3>وضعیت حساب</h3>
          <p class="status-active">فعال</p>
        </div>

        <div class="info-card">
          <div class="card-icon">🕒</div>
          <h3>آخرین ورود</h3>
          <p>همین الان</p>
        </div>

        <div class="info-card">
          <div class="card-icon">👤</div>
          <h3>نوع حساب</h3>
          <p>کاربر عادی</p>
        </div>

        <div class="info-card">
          <div class="card-icon">📊</div>
          <h3>آمار کلی</h3>
          <p>در دسترس</p>
        </div>
      </div>

      <div class="actions-card">
        <h3>عملیات</h3>
        <button
          @click="handleLogout"
          :disabled="isLoading"
          class="logout-button"
        >
          {{ isLoading ? "در حال خروج..." : "خروج از حساب" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["userEmail", "isLoading"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      const result = await this.logout();
      if (result.success) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600&display=swap");

* {
  font-family: "Vazirmatn", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-container {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #fef7f0 0%, #f8f4f0 50%, #f0f0f5 100%);
  padding: 2rem;
  direction: rtl;
}

.dashboard-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  text-align: center;
}

.welcome-header h1 {
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.user-info {
  color: #718096;
  font-size: 1.1rem;
  font-weight: 300;
  margin: 0;
}

.user-info strong {
  color: #d69e2e;
  font-weight: 500;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 0.5rem;
}

.info-card h3 {
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.info-card p {
  color: #718096;
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
}

.status-active {
  color: #38a169 !important;
  font-weight: 500 !important;
}

.actions-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2.5rem;
  text-align: center;
}

.actions-card h3 {
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0 0 1.5rem 0;
}

.logout-button {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.logout-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #c53030 0%, #9c2626 100%);
}

.logout-button:disabled {
  background: #cbd5e0;
  color: #a0aec0;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .welcome-card {
    padding: 2rem;
  }

  .welcome-header h1 {
    font-size: 2rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    padding: 1.5rem;
  }

  .actions-card {
    padding: 2rem;
  }
}
</style>
