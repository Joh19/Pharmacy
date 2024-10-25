const products = [
    { id: 1, name: 'Aspirin', price: 10, image: 'images/aspirin.jpg' },
    { id: 2, name: 'Ibuprofen', price: 15, image: 'images/ibuprofen.jpg' },
    { id: 3, name: 'Paracetamol', price: 5, image: 'images/paracetamol.jpg' },
    { id: 4, name: 'Antihistamine', price: 20, image: 'images/antihistamine.jpg' },
    { id: 5, name: 'Cough Syrup', price: 12, image: 'images/cough_syrup.jpg' },
    // Add more products as needed
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display products
function displayProducts() {
    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}


// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
    alert(`${product.name} added to cart`);
}

// Function to update cart count
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item'; // Add a class for styling
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}


// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    updateCartCount();
    displayCartItems();
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('products')) {
        displayProducts();
    }
    if (document.getElementById('cart-items')) {
        displayCartItems(); // Load cart items on the cart page
    }
});
