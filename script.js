const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            isVisible: false,
            pageList: 'main',
            isModalsActive:false,
        }
    },
    methods: {
        handleMessage(event) {
            const data = event?.data;
            switch (data.action) {
                case 'openNUI':
                    this.isVisible = true;
                    break;
                default:
                    break;
            }
        },
    },
    mounted() {
        window.addEventListener('message',this.handleMessage);
    },
    beforeUnmount() {
        window.removeEventListener('message',this.handleMessage);
    }
}).mount('#app')