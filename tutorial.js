// Shopping cart functions

var coffeeShoppingCart = {};
coffeeShoppingCart.cart = [];

coffeeShoppingCart.Item = function(name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};



coffeeShoppingCart.addItemToCart = function(name,price,count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            this.saveCart(); //this. represents the owner of the object which is coffeeShoppingCart
            return;
        }
    }
    var item = new this.Item(name,price,count);
    this.cart.push(item);
    this.saveCart();
};

//following function sets item count on an item
coffeeShoppingCart.setCountForItem = function(name, count){
    for (var i in this.cart) {
        if(this.cart[i].name === name) {
            this.cart[i].count = count;
            break;
        }
    }
    this.saveCart();
};

// following function removes 1 item

coffeeShoppingCart.removeItemFromCart = function (name){
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count --;
            if (this.cart[i].count === 0) {
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
}; 


// following function removes all items from cart
coffeeShoppingCart.removeItemFromCartAll = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
};

//clears cart
coffeeShoppingCart.clearCart = function() {
    this.cart = [];
    this.saveCart();
};

// return total count
coffeeShoppingCart.countCart = function() {
    var totalCount = 0;
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
};

// return total cost
coffeeShoppingCart.totalCart = function() {
    totalCost = 0;
    for (var i in this.cart) {
        totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2);
};

// array of Item - decoupling, retuns an array (lesson 12)
coffeeShoppingCart.listCart = function() {
    var cartCopy = [];
    for ( var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {} ;
        for (var property in item) {
            itemCopy[property] = item[property];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};

/* saves the cart locally, makes it able to show the 
cart on a multipage site. JSON is used to 
make the array of objects into a string
which is preferred by the browser when locally
storing it.*/
coffeeShoppingCart.saveCart = function() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}
/*
Again, we use JSON to convert back from a string
to the original form of the array of objects.
Now the locally stored shoppingCart will be loaded
and ready to use/view after one has switched/closed pages on
a site.
*/
coffeeShoppingCart.loadCart = function() {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

coffeeShoppingCart.loadCart();