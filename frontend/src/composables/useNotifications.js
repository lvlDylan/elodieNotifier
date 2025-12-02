import { ref } from "vue";

const notifications = ref([]);

export function useNotifications() {
    function addNotification(message, type = "info", timeout = 2000) {
        const id = Date.now();
        notifications.value.push({id, message, type});

        setTimeout(() => {
            notifications.value = notifications.value.filter((item) => item.id !== id);
        }, timeout)
    }

    return {notifications, addNotification};
}