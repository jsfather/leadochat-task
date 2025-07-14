import { createStore } from "vuex";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";

export default createStore({
  state: {
    user: null,
    loading: false,
    error: null,
    autoLogoutTimer: null,
    authInitialized: false,
  },

  mutations: {
    SET_USER(state: any, user: any) {
      state.user = user;
    },
    SET_LOADING(state: any, loading: boolean) {
      state.loading = loading;
    },
    SET_ERROR(state: any, error: string | null) {
      state.error = error;
    },
    SET_AUTO_LOGOUT_TIMER(state: any, timer: any) {
      state.autoLogoutTimer = timer;
    },
    SET_AUTH_INITIALIZED(state: any, initialized: boolean) {
      state.authInitialized = initialized;
    },
  },

  actions: {
    async login({ commit, dispatch }: any, { email, password }: any) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("SET_USER", userCredential.user);
        dispatch("startAutoLogoutTimer");
        return { success: true };
      } catch (error: any) {
        commit("SET_ERROR", error.message);
        return { success: false, error: error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async register({ commit, dispatch }: any, { email, password }: any) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("SET_USER", userCredential.user);
        dispatch("startAutoLogoutTimer");
        return { success: true };
      } catch (error: any) {
        commit("SET_ERROR", error.message);
        return { success: false, error: error.message };
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async logout({ commit, state }: any) {
      try {
        if (state.autoLogoutTimer) {
          clearTimeout(state.autoLogoutTimer);
          commit("SET_AUTO_LOGOUT_TIMER", null);
        }

        await signOut(auth);
        commit("SET_USER", null);
        return { success: true };
      } catch (error: any) {
        commit("SET_ERROR", error.message);
        return { success: false, error: error.message };
      }
    },

    initAuth({ commit, dispatch }: any) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          commit("SET_USER", user);
          commit("SET_AUTH_INITIALIZED", true);
          if (user) {
            dispatch("startAutoLogoutTimer");
          }
          resolve(user);
        });
      });
    },

    startAutoLogoutTimer({ commit, dispatch, state }: any) {
      if (state.autoLogoutTimer) {
        clearTimeout(state.autoLogoutTimer);
      }

      // auto logout after 30 minutes
      const timer = setTimeout(() => {
        dispatch("logout");
      }, 1800000);

      commit("SET_AUTO_LOGOUT_TIMER", timer);
    },
  },

  getters: {
    isAuthenticated: (state: any) => !!state.user,
    currentUser: (state: any) => state.user,
    userEmail: (state: any) => state.user?.email,
    isLoading: (state: any) => state.loading,
    error: (state: any) => state.error,
  },
});
