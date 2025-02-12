import { createApp } from 'vue';
import { isEnvBrowser } from '@/lib/constants';

import App from '@/App.vue';

if (isEnvBrowser) document.body.style.backgroundColor = '#1A1A1A';

createApp(App).mount('body');
