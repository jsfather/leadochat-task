<template>
  <div id="app">
    <header v-if="isAuthenticated" class="header">
      <div class="header-content">
        <div class="logo-section">
          <h2>تسک لیدوچت</h2>
          <span class="subtitle">پنل کاربری</span>
        </div>
        <div class="user-section">
          <span class="user-email">{{ userEmail }}</span>
          <button @click="handleLogout" class="logout-btn">خروج</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isAuthenticated", "userEmail"]),
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Vazirmatn", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #fef7f0 0%, #f8f4f0 50%, #f0f0f5 100%);
  direction: rtl;
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(214, 158, 46, 0.1);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  min-height: 80px;
}

.logo-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logo-section h2 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #718096;
  font-size: 0.85rem;
  font-weight: 300;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.5rem 1rem;
  background: rgba(214, 158, 46, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(214, 158, 46, 0.2);
}

.logout-btn {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(229, 62, 62, 0.2);
  font-family: inherit;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #c53030 0%, #9c2626 100%);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    min-height: auto;
  }

  .logo-section h2 {
    font-size: 1.25rem;
  }

  .user-section {
    width: 100%;
    justify-content: space-between;
  }

  .user-email {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .logout-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
