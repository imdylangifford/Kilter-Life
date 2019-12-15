Vue.config.devtools = true

var shopPage = new Vue({
    el: "#shop",
    data: {
        products: [],
        activeProduct: {
            title: 'blank'
        }
    },
    methods: {
        getAccent: function(title){
            if(title !== undefined){
                if(title.includes('Peace')){
                    return 'peace-accent'
                } else if(title.includes('Sleep')){
                    return 'sleep-accent'
                } else if(title.includes('Comfort')){
                    return 'comfort-accent'
                } else {
                    return 'focus-accent'
                }
            }
        },
        getTagline: function(title){
                if(title == 'Peace'){
                    return 'Struggling with Anxiety?'
                } else if(title == 'Sleep'){
                    return "Can't get your rest?"
                } else if(title == 'Comfort'){
                    return 'Dealing with Pain?'
                } else {
                    return 'Unable to Concentrate?'
                }
        },
        getIcon: function(title) {
            if(title !== undefined){
                if(title.includes('Peace')){
                    return 'https://ucarecdn.com/e37242fa-90f2-49c3-abd2-9c1c359f8120/happiness.png'
                } else if(title.includes('Sleep')){
                    return 'https://ucarecdn.com/a9058dc3-b994-4ed3-a96d-bd6c01c4007c/moon.png'
                } else if(title.includes('Comfort')){
                    return 'https://ucarecdn.com/5b16b137-13bf-4eeb-b73c-b0741cd770e5/heartbeat.png'
                } else {
                    return 'https://ucarecdn.com/8a0b8510-5cc9-459e-be33-bc52ff482e52/idea.png'
                }
            }
        },
        optionClick: function(title) {
            // window.scrollTo(0,0);
            if(title !== undefined){
                if(title.includes('Peace')){
                    this.activeProduct = this.products[0]
                } else if(title.includes('Sleep')){
                    this.activeProduct = this.products[1]
                } else if(title.includes('Focus')){
                    this.activeProduct = this.products[2]
                } else {
                    this.activeProduct = this.products[3]
                }
            }
        },
        addToCart: function(){
            axios.post('/cart/add.js', {
                quantity: 1,
                id: this.activeProduct.variants[0].id,
            })
            .then(response => {
                slideout.updateCart();
                openCart();
                console.log('cart response', response)
            })
        }
    },
    mounted() {
        axios.get('https://kilterlife.myshopify.com/collections/tinctures/products.json')
        .then( response => {
            this.products = response.data.products;
            if(window.location.href.includes('anxiety')){
                this.activeProduct = this.products[0]
            }else if(window.location.href.includes('sleep')){
                this.activeProduct = this.products[1]
            }else if(window.location.href.includes('focus')){
                this.activeProduct = this.products[2]
            } else {
                this.activeProduct = this.products[3]
            }
            setTimeout(function(){
                SPR.registerCallbacks();
                SPR.initRatingHandler();
                SPR.initDomEls();
                SPR.loadProducts();
                SPR.loadBadges();
            }, 500)
        })
    }
})