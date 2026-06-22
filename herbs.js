// Dados dos produtos - Ervas Naturais
const products = [
    {
        id: 1,
        name: "Camomila",
        category: "cha",
        price: 24.90,
        emoji: "🌼",
        benefits: "Relaxamento e sono",
        description: "Chá de camomila premium para noites tranquilas"
    },
    {
        id: 2,
        name: "Gengibre",
        category: "tempero",
        price: 18.50,
        emoji: "🟠",
        benefits: "Imunidade e digestão",
        description: "Gengibre fresco ralado, perfeito para chás e receitas"
    },
    {
        id: 3,
        name: "Mel com Própolis",
        category: "medicinal",
        price: 32.90,
        emoji: "🍯",
        benefits: "Garganta e imunidade",
        description: "Mel puro com própolis para fortalecer a imunidade"
    },
    {
        id: 4,
        name: "Aloe Vera",
        category: "skincare",
        price: 28.00,
        emoji: "🌿",
        benefits: "Hidratação da pele",
        description: "Gel de aloe vera 100% puro para cuidados com a pele"
    },
    {
        id: 5,
        name: "Eucalipto",
        category: "aroma",
        price: 22.50,
        emoji: "🌳",
        benefits: "Respiração e aroma",
        description: "Óleo essencial de eucalipto para difusor"
    },
    {
        id: 6,
        name: "Menta Fresca",
        category: "cha",
        price: 19.90,
        emoji: "🌱",
        benefits: "Digestão e frescor",
        description: "Folhas de menta orgânica desidratadas"
    },
    {
        id: 7,
        name: "Cúrcuma",
        category: "tempero",
        price: 25.90,
        emoji: "🟡",
        benefits: "Inflamação e antioxidante",
        description: "Pó de cúrcuma premium para culinária e chás"
    },
    {
        id: 8,
        name: "Chá de Gengibre e Limão",
        category: "cha",
        price: 21.00,
        emoji: "🍵",
        benefits: "Energia e imunidade",
        description: "Mistura pronta de gengibre desidratado com limão"
    },
    {
        id: 9,
        name: "Lavanda",
        category: "aroma",
        price: 26.50,
        emoji: "💜",
        benefits: "Relaxamento profundo",
        description: "Óleo essencial de lavanda para aromaterapia"
    },
    {
        id: 10,
        name: "Açafrão",
        category: "tempero",
        price: 45.00,
        emoji: "🟨",
        benefits: "Sabor premium",
        description: "Açafrão persa de qualidade extra"
    },
    {
        id: 11,
        name: "Chá Verde",
        category: "cha",
        price: 20.90,
        emoji: "💚",
        benefits: "Antioxidante e energia",
        description: "Chá verde puro japonês de alta qualidade"
    },
    {
        id: 12,
        name: "Rosa Mosqueta",
        category: "skincare",
        price: 35.90,
        emoji: "🌹",
        benefits: "Regeneração da pele",
        description: "Óleo de rosa mosqueta para rugas e cicatrizes"
    },
    {
        id: 13,
        name: "Cânfora",
        category: "aroma",
        price: 23.50,
        emoji: "❄️",
        benefits: "Respiração clara",
        description: "Cristais de cânfora natural para difusor"
    },
    {
        id: 14,
        name: "Óleo de Argan",
        category: "skincare",
        price: 55.00,
        emoji: "🏜️",
        benefits: "Hidratação luxuosa",
        description: "Óleo de argan marroquino puro para pele e cabelo"
    },
    {
        id: 15,
        name: "Hibisco",
        category: "cha",
        price: 17.90,
        emoji: "🌺",
        benefits: "Pressão e antioxidante",
        description: "Chá de hibisco refrescante com propriedades naturais"
    },
    {
        id: 16,
        name: "Cápsulas de Vitaminas Naturais",
        category: "medicinal",
        price: 39.90,
        emoji: "💊",
        benefits: "Saúde completa",
        description: "Suplemento de vitaminas naturais em cápsulas"
    }
];

// Carrinho de compras
let cart = [];

// Função para renderizar os produtos
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">Nenhum produto encontrado.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-benefits">✓ ${product.benefits}</div>
                <div class="product-quantity">
                    <label>Quantidade:</label>
                    <input type="number" class="quantity-input" value="1" min="1" max="10">
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, this)">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Função para obter o nome da categoria
function getCategoryName(categoryCode) {
    const categories = {
        'cha': 'Chás',
        'tempero': 'Temperos',
        'medicinal': 'Medicinais',
        'skincare': 'Cuidados com Pele',
        'aroma': 'Aromaterapia'
    };
    return categories[categoryCode] || categoryCode;
}

// Função para filtrar produtos
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let filtered = products.filter(product => {
        // Filtrar por busca
        const matchesSearch = product.name.toLowerCase().includes(searchInput) ||
                            product.benefits.toLowerCase().includes(searchInput);

        // Filtrar por categoria
        const matchesCategory = !categoryFilter || product.category === categoryFilter;

        // Filtrar por preço
        let matchesPrice = true;
        if (priceFilter) {
            if (priceFilter === '0-30') {
                matchesPrice = product.price >= 0 && product.price <= 30;
            } else if (priceFilter === '30-60') {
                matchesPrice = product.price > 30 && product.price <= 60;
            } else if (priceFilter === '60+') {
                matchesPrice = product.price > 60;
            }
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(filtered);
}

// Função para adicionar ao carrinho
function addToCart(productId, productName, productPrice, button) {
    const quantityInput = button.previousElementSibling.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value) || 1;

    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
        });
    }

    updateCartCount();
    showNotification(`${productName} adicionado ao carrinho!`);
    quantityInput.value = 1;
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Função para abrir o carrinho
function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    } else {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div>Quantidade: ${item.quantity}</div>
                    <div class="cart-item-price">R$ ${itemTotal.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItems.appendChild(cartItem);
        });

        document.getElementById('totalPrice').textContent = total.toFixed(2);
    }

    cartModal.style.display = 'block';
}

// Função para fechar o carrinho
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Função para remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart(); // Atualizar a visualização
}

// Função de checkout
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Compra finalizada com sucesso!\nTotal: R$ ${total.toFixed(2)}\n\nObrigado por comprar com a NaturaHerbs!`);
    
    cart = [];
    updateCartCount();
    closeCart();
    renderProducts();
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #2d5016, #6ba82e);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();

    // Adicionar event listeners aos filtros
    document.getElementById('searchInput').addEventListener('keyup', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);

    // Adicionar evento ao formulário de contato
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado por entrar em contato! Responderemos em breve.');
        this.reset();
    });

    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        const cartModal = document.getElementById('cartModal');
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    };
});

// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
