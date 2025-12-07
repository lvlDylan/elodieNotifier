<template>
  <b-container class="d-flex justify-content-center align-items-center vh-100 p-0 overflow-hidden" fluid
               style="background: linear-gradient(135deg, var(--color-green-dark, #1e3c72), #2a5298);">
    <b-card class="p-4 rounded-4 border-0 shadow-lg" style="max-width: 400px;">
      <div class="text-center mb-4">
        <h4 class="fw-bold text-dark">Elodie</h4>
        <p class="small text-success" v-if="isOnline">Ton copain est sur son ordinateur</p>
        <p class="text-muted small bg-warning" v-else>Ton copain n'est pas sur son ordinateur !</p>
        <b-form @submit.prevent="handleSubmit()">
          <b-form-group>
            <b-input-group class="modern-input-group">
              <b-input-group-text class="bg-white text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z"/>
                </svg>
              </b-input-group-text>
              <b-form-input
                  id="titleInput"
                  v-model="title"
                  type="text"
                  class="border-start-0 py-2 shadow-none"
                  placeholder="Titre du message"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group class="mt-2">
            <b-input-group class="modern-input-group">
              <b-input-group-text class="bg-white text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
              </b-input-group-text>
              <b-form-input
                  id="messageInput"
                  v-model="message"
                  type="text"
                  class="border-start-0 py-2 shadow-none"
                  placeholder="Message"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-button type="submit" variant="success" class="w-100 py-2 shadow fw-bold mt-2" style="letter-spacing: 1px;" v-if="isOnline">Envoyer</b-button>
          <b-button type="submit" variant="success" class="w-100 py-2 shadow fw-bold mt-2 bg-dark" style="letter-spacing: 1px;" v-else disabled>Envoyer</b-button>
        </b-form>
      </div>
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
import {send} from "@/services/message.js";
import {isOnlineFunc} from "@/services/status.js";
import router from "@/router/router.js";

const {addNotification} = useNotifications();

const isOnline = ref(false);
const message = ref("");
const title = ref("");

async function handleSubmit() {
  try {
    await send(title.value, message.value);
    addNotification("Message envoyé ✅", "success");
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
  }
}

onMounted(async () => {
  try {
    isOnline.value = await isOnlineFunc();
  } catch (error) {
    let message = "Erreur inconnue";
    try {
      const parsedError = JSON.parse(error.message);
      message = parsedError.error || parsedError.message || message;
    } catch {
      message = error.message;
    }
    addNotification(message, "error");
  }
});

</script>