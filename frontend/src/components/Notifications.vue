<script setup>
import { useNotifications } from "@/composables/useNotifications.js";
const { notifications } = useNotifications();
</script>

<template>

  <div class="position-fixed top-0 start-50 translate-middle-x p-3 d-flex flex-column align-items-center gap-2" style="z-index: 1100;width: 100%; max-width: 500px;">
    <TransitionGroup name="toast" tag="div" class="d-flex flex-column align-items-center gap-2">
      <div
          v-for="n in notifications"
          :key="n.id"
          class="toast show align-items-center text-white border-0 text-center shadow-sm"
          style="width: fit-content; max-width: 90vw; padding: 0.75rem 1.5rem; border-radius: 0.5rem;"
          :class="{
        'bg-success': n.type === 'success',
        'bg-danger': n.type === 'error',
        'bg-warning text-dark': n.type === 'warning',
        'bg-info': n.type === 'info'
      }"
          role="alert"
          aria-live="assertive"
          aria-atomic="true">
        <div class="d-flex align-items-center justify-content-between gap-2">
          <div class="toast-body fw-semibold">{{n.message}}</div>
          <button class="btn-close btn-close-white me-2 m-auto" aria-label="Close" @click="notifications.splice(notifications.indexOf(n), 1)"></button>
        </div>
      </div>
    </TransitionGroup>
  </div>

</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>