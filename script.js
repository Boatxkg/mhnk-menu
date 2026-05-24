const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            isVisible: false,
            isModalActive: false,
            pageList: 'main',
            isModalsActive: false,
            maxIndexImageSlide: 5,
            currentIndexImage: 0,
            currentIndexModal: 0,
            TimerChangeImage: null,
            settingData:{
                
            }
        }
    },
    methods: {
        onBeforeLeave(el) { },
        onLeave(el, done) { done(); },
        onAfterLeave(el) {
            if (this.nextUi) {
                this.CaseUi = this.pageList;
                this.nextUi = null;
            }
        },
        handleMessage(event) {
            const data = event?.data;
            switch (data.action) {
                case 'openNUI':
                    this.isVisible = true;
                    if (this.isVisible && this.pageList == 'main') {
                        this.AutoChangePage();
                    }
                    break;
                default:
                    break;
            }
        },
        keydown(event) {
            const key = event.code
            if (key === 'Escape') {
                this.isModalActive = false;
            }
        },
        changeImage(index) {
            console.log('click')
            this.currentIndexImage = index;
        },

        AutoChangePage() {
            this.TimerChangeImage = setInterval(() => {
                this.currentIndexImage += 1
                if (this.currentIndexImage >= this.maxIndexImageSlide) {
                    this.currentIndexImage = 0
                }
            }, 10000);
        },
        openModal() {
            this.isModalActive = true;
        },
        changeIndexRoomModal(index) {
            this.currentIndexModal = index;
        }
    },
    computed: {
        slideImage() {
            return {
                transform: `translateX(-${this.currentIndexImage * 115.9}vh)`,
                transition: 'transform 650ms cubic-bezier(0.68, -0.2, 0.32, 1.2)'
            }
        }
    },
    watch:{
        pageList(newValue,oldValue){
            console.log(newValue)
            if(newValue != oldValue){
                if(newValue === 'main'){
                    return this.AutoChangePage();
                }
                if(this.TimerChangeImage){
                    clearInterval(this.TimerChangeImage);
                    this.TimerChangeImage = null;
                    this.currentIndexImage = 0
                }
            }
        }
    },
    mounted() {
        window.addEventListener('message', this.handleMessage);
        window.addEventListener('keydown', this.keydown)
        // this.AutoChangePage();
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleMessage);
        window.removeEventListener('keydown', this.keydown)
        clearInterval(this.TimerChangeImage)
        this.TimerChangeImage = null;
    }
}).mount('#app')