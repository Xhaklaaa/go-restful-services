import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.js';
import Toast  from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Set global variables
window.global = window.global || {};
window.global.api_location = 'http://localhost:9090'; // Specify your server URL
window.global.api_location = 'http://localhost:9000';

const app = createApp(App);

// Use the router
app.use(router);

// Use the Toast plugin with custom options
app.use(Toast, {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: true,
    icon: true,
    rtl: false,
  });

// Mount the app
app.mount('#app');