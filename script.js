// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://via.placeholder.com/300x200?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://via.placeholder.com/300x200?text=Speaker"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://via.placeholder.com/300x200?text=Backpack"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 29.99,
        image: "https://via.placeholder.com/300x200?text=Mouse"
    },
    {
        id: 6,
        name: "USB-C Cable",
        price: 15.99,
        image: "https://via.placeholder.com/300x200?text=USB+Cable"
    }
];

// Cart functionality
let cart = [];

// Display products
function displayProducts() {
    const productContainer = document.getElementById('product-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productContainer.appendChild(productCard);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add item to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    // In a real app, you might want to show a notification here
    alert(`${product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Cart icon click event (would show cart modal in a real app)
    document.querySelector('.cart-icon').addEventListener('click', () => {
        alert(`Cart has ${cart.reduce((total, item) => total + item.quantity, 0)} items`);
    });
});
