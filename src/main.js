import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import { ImageBarcodeReader } from 'vue-barcode-reader'
<script src="https://unpkg.com/html5-qrcode"></script>

createApp(App).use(store).use(router).use(bootstrap).use({ ImageBarcodeReader }).mount('#app')
