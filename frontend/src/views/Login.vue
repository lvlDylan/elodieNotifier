<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100 p-0 overflow-hidden" fluid
               style="background: linear-gradient(135deg, var(--color-green-dark, #1e3c72), #2a5298);">
    <b-card class="p-4 rounded-4 border-0 shadow-lg" style="max-width: 400px;">
      <div class="text-center mb-4">
        <h4 class="fw-bold text-dark">Coucou Elodie !</h4>
        <p class="text-muted small">Connecte toi si tu veux m'envoyer ta petite notification !</p>
      </div>
      <b-form @submit.prevent="handleSubmit()">
        <b-form-group class="mb-3">
          <b-input-group class="modern-input-group">
            <b-input-group-text class="bg-white border-end-0 text-muted ps-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope"
                   viewBox="0 0 16 16">
                <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
              </svg>
            </b-input-group-text>
            <b-form-input
                id="identifierInput"
                v-model="identifier"
                type="text"
                required
                class="border-start-0 py-2 shadow-none"
                placeholder="Nom d'utilisateur"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-input-group class="modern-input-group">
            <b-input-group-text class="bg-white border-end-0 text-muted ps-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-lock"
                   viewBox="0 0 16 16">
                <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
            </b-input-group-text>
            <b-form-input
                id="passwordInput"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="border-start-0 border-end-0 py-2 shadow-none"
                placeholder="Password"
            ></b-form-input>

            <b-button @click="togglePassword" variant="outline-light"
                      class="border border-start-0 text-muted bg-white pe-3" type="button">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-eye-slash" viewBox="0 0 16 16">
                <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path
                    d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-eye" viewBox="0 0 16 16">
                <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </b-button>
          </b-input-group>
        </b-form-group>

        <b-button type="submit" variant="success" class="w-100 py-2 shadow fw-bold text-uppercase" :disabled="loading"
                  style="letter-spacing: 1px;">
          <span v-if="!loading">Se connecter</span>
          <span v-else>
            <b-spinner small></b-spinner> Chargement...
          </span>
        </b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<style>
.modern-input-group {
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}

.modern-input-group:focus-within {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.modern-input-group .input-group-text {
  background-color: white;
  border: none;
}

.modern-input-group .form-control {
  border: none;
}

.modern-input-group .btn {
  border: none;
}

.modern-input-group .form-control:focus,
.modern-input-group .btn:focus {
  box-shadow: none;
}
</style>

<script setup>
import {onMounted, ref} from "vue";
import {
  BButton, BCard, BContainer,
  BForm, BFormGroup, BFormInput,
  BInputGroup, BInputGroupText, BSpinner
} from "bootstrap-vue-next";

import {useNotifications} from "@/composables/useNotifications.js";
import {login} from "@/services/auth.js";
import router from "@/router/router.js";

const {addNotification} = useNotifications();

const identifier = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

async function handleSubmit() {

  if (!identifier.value || !password.value)
    return addNotification("Remplis le nom d'utilisateur et le mot de passe !", "warning");

  try {
    await login(identifier.value, password.value);
    loading.value = true;
    await router.push("/");
  } catch (error) {
    let message = "Erreur inconnue";
    try {
      const parsedError = JSON.parse(error.message);
      message = parsedError.error || parsedError.message || message;
    } catch {
      message = error.message;
    }
    addNotification(message, "error")
  } finally {
    loading.value = false;
  }
}

</script>