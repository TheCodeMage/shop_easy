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

let cart = [];

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display products
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products

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
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Cart Modal ပြသမယ့် function
function showCartModal() {
    // Remove any existing modal first
    document.querySelectorAll('.cart-modal').forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'cart-modal';

    if (cart.length === 0) {
        modal.innerHTML = '<p>Your cart is empty</p>';
    } else {
        let html = '<h3>Your Cart</h3><ul>';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <li>
                    ${item.name} - 
                    $${item.price.toFixed(2)} x 
                    ${item.quantity} = 
                    $${itemTotal.toFixed(2)}
                    <button class="remove-item" data-id="${item.id}">×</button>
                </li>
            `;
        });

        html += `</ul><p class="cart-total">Total: $${total.toFixed(2)}</p>`;
        html += '<button class="checkout-btn">Checkout</button>';
        modal.innerHTML = html;

        // Remove item buttons အတွက် event listener တွေထည့်မယ်
        modal.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });

        // Checkout button အတွက် event listener
        modal.querySelector('.checkout-btn').addEventListener('click', checkout);
    }

    // Modal close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
}

// Item ဖယ်ရှားမယ့် function
function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    showCartModal(); // Modal ကို update လုပ်မယ်
}

// Checkout function
function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    saveCartToStorage();
    updateCartCount();
    document.querySelectorAll('.cart-modal').forEach(modal => {
        document.body.removeChild(modal);
    });
}

// Notification ပြမယ့် function
function showNotification(message) {
    // Remove any existing notification first
    document.querySelectorAll('.notification').forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    displayProducts();

    // Cart icon click event
    document.querySelector('.cart-icon').addEventListener('click', showCartModal);
});
