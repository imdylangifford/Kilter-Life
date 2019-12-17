var slideout = new Vue({
    el: "#slideout-cart",
    data: {
        items: [{}],
        misc: [],
        total: 0,
        price: 0
    },
    methods: {
        clearCart: function(){
            axios.post('/cart/clear.js')
            .then(response => {
                this.updateCart();
            })
        },
        updateCart: function(){
            this.misc = [];
            this.pints = [];
            axios.get('/cart.js')
            .then(response => {
                console.log(response, 'update cart')
                this.total = response.data.total_price;
                this.items = response.data.items;
                this.price = response.data.total_price;
                this.showSpinner = false;
                console.log(this.items, 'items')
            })
        },
        formatCurrency: function (str) {
            var num = str + '';
            num = num.split('');
            if (num.length > 5) {
                num.splice(4, 0, '.')
            } else if (num.length > 4) {
                num.splice(3, 0, '.')
            } else if (num.length > 3) {
                num.splice(2, 0, '.')
            } else {
                num.splice(1, 0, '.')
            }
            return num.join('');
        },
        addOne: function(index, type){
            var slide = this;
            var item = this.items[index]
            item.quantity++;
            axios.post('/cart/add.js', {
                quantity: 1,
                id: item.variant_id,
            })
            .then(response => {
                slide.updateCart();
            })
        },
        minusOne: function(index, type){
            var slide = this;
            var item = this.items[index]
            item.quantity--;
            let data = {}
            data[item.variant_id] = item.quantity;
            axios.post('/cart/update.js', {updates: data})
            .then(response => {
                slide.updateCart()
            })
        },
        deleteItem: function(index, type) {
            var slide = this;
            var item = this.items[index]
            item.quantity--;
            this.showSpinner = true;
            let data = {}
            data[item.variant_id] = 0;
            axios.post('/cart/update.js', {updates: data})
            .then(response => {
                slide.updateCart()
            })
        },
        closeCart: function(){
            $('.slideout-cart-cover').removeClass("opacity-cover");
            $('.c-slideout-cart').removeClass("openCart");
        }
    },
    mounted() {
        this.updateCart();
    }
})

