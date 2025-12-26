const API_KEY = '6a48b49a-943d-4bd4-868c-94a15212daff';
const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const LOCAL_STORAGE_KEY = 'foodConstructOrder';

let allDishes = [];
let selectedDishes = {};

function checkAuthError(response) {
    if (response.status === 401) {
        showNotification(
            'Необходима авторизация. Проверьте API Key.',
            'error'
        );
        return true;
    }
    return false;
}

function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`);
        
        if (checkAuthError(response)) {
            return [];
        }
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки заказов');
        }
        
        return await response.json();
    } catch (error) {
        showNotification('Ошибка загрузки заказов', 'error');
        return [];
    }
}

async function checkOrderLimit() {
    try {
        const orders = await loadOrders();
        return orders.length < 10;
    } catch (error) {
        console.error('Ошибка проверки лимита заказов:', error);
        return true;
    }
}

function getDishByCategory(category) {
    const selectedIds = Object.keys(selectedDishes);
    for (const dishId of selectedIds) {
        const dish = allDishes.find(d => d.id == dishId);
        if (dish && (dish.category === category || 
                     (category === 'main' && 
                      (dish.category === 'main_course' || 
                       dish.category === 'main-course')))) {
            return dish;
        }
    }
    return null;
}

function renderOrderItems() {
    const container = document.getElementById('order-items-list');
    const selectedIds = Object.keys(selectedDishes);
    
    if (selectedIds.length === 0) {
        container.innerHTML = `
            <div class="empty-order">
                <p>Ничего не выбрано. Чтобы добавить блюда в заказ, 
                перейдите на страницу <a href="index.html">Собрать ланч</a>.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'dishes-grid';
    
    selectedIds.forEach(dishId => {
        const dish = allDishes.find(d => d.id == dishId);
        if (!dish) return;
        
        const item = document.createElement('div');
        item.className = 'dish-card';
        item.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}Р</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button class="remove-btn" data-id="${dish.id}">Удалить</button>
        `;
        
        const removeButton = item.querySelector('.remove-btn');
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeDishFromOrder(dish.id);
        });
        
        gridContainer.appendChild(item);
    });
    
    container.appendChild(gridContainer);
}

function updateOrderSummary() {
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    let totalPrice = 0;
    
    categories.forEach(category => {
        const dish = getDishByCategory(category);
        const summaryElement = document.getElementById(`${category}-summary`);
        
        if (dish) {
            summaryElement.textContent = `${dish.name} ${dish.price}Р`;
            totalPrice += dish.price;
        } else {
            summaryElement.textContent = category === 'main' ? 
                'Не выбрано' : 'Не выбран';
        }
    });
    
    document.getElementById('total-price').textContent = totalPrice;
}

function removeDishFromOrder(dishId) {
    delete selectedDishes[dishId];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedDishes));
    renderOrderItems();
    updateOrderSummary();
}

function validateCombo() {
    const hasSoup = !!getDishByCategory('soup');
    const hasMain = !!getDishByCategory('main');
    const hasSalad = !!getDishByCategory('salad');
    const hasDrink = !!getDishByCategory('drink');
    
    const combos = [
        { soup: true, main: true, salad: true, drink: true },
        { soup: true, main: true, drink: true },
        { soup: true, salad: true, drink: true },
        { main: true, salad: true, drink: true },
        { main: true, drink: true }
    ];
    
    return combos.some(combo => {
        return (!combo.soup || hasSoup) &&
               (!combo.main || hasMain) &&
               (!combo.salad || hasSalad) &&
               (!combo.drink || hasDrink);
    });
}

function getSelectedCombo() {
    const hasSoup = !!getDishByCategory('soup');
    const hasMain = !!getDishByCategory('main');
    const hasSalad = !!getDishByCategory('salad');
    const hasDrink = !!getDishByCategory('drink');
    
    const combos = [
        { soup: true, main: true, salad: true, drink: true },
        { soup: true, main: true, drink: true },
        { soup: true, salad: true, drink: true },
        { main: true, salad: true, drink: true },
        { main: true, drink: true }
    ];
    
    return combos.find(combo => {
        return (!combo.soup || hasSoup) &&
               (!combo.main || hasMain) &&
               (!combo.salad || hasSalad) &&
               (!combo.drink || hasDrink);
    });
}

async function loadAllDishes() {
    try {
        const response = await fetch(`${API_URL}/dishes?api_key=${API_KEY}`);
        
        if (checkAuthError(response)) {
            return;
        }
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки блюд');
        }
        
        allDishes = await response.json();
    } catch (error) {
        const errorMsg = 'Не удалось загрузить меню: ' + error.message;
        showNotification(errorMsg, 'error');
    }
}

function loadSelectedDishes() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
        selectedDishes = JSON.parse(saved);
    }
}

async function submitOrder(event) {
    event.preventDefault();
    
    const canCreateOrder = await checkOrderLimit();
    if (!canCreateOrder) {
        showNotification(
            'Достигнут лимит в 10 заказов. ' +
            'Удалите старые заказы перед созданием нового.',
            'error'
        );
        return;
    }
    
    const form = document.getElementById('order-submit-form');
    const formData = new FormData(form);
    
    const orderData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        subscribe: formData.get('subscribe') ? 1 : 0,
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: formData.get('delivery_type')
    };
    
    if (orderData.delivery_type === 'by_time') {
        const deliveryTime = formData.get('delivery_time');
        if (!deliveryTime) {
            showNotification('Укажите время доставки', 'error');
            return;
        }
        
        const now = new Date();
        const [hours, minutes] = deliveryTime.split(':').map(Number);
        const deliveryDate = new Date();
        deliveryDate.setHours(hours, minutes, 0, 0);
        
        if (deliveryDate < now) {
            showNotification(
                'Время доставки не может быть раньше текущего времени',
                'error'
            );
            return;
        }
        
        orderData.delivery_time = deliveryTime;
    }
    
    const comment = formData.get('comments');
    if (comment) {
        orderData.comment = comment;
    }
    
    const soupDish = getDishByCategory('soup');
    if (soupDish) orderData.soup_id = soupDish.id;
    
    const mainDish = getDishByCategory('main');
    if (mainDish) orderData.main_course_id = mainDish.id;
    
    const saladDish = getDishByCategory('salad');
    if (saladDish) orderData.salad_id = saladDish.id;
    
    const drinkDish = getDishByCategory('drink');
    if (drinkDish) {
        orderData.drink_id = drinkDish.id;
    } else {
        showNotification('Напиток обязателен для заказа', 'error');
        return;
    }
    
    const dessertDish = getDishByCategory('dessert');
    if (dessertDish) orderData.dessert_id = dessertDish.id;
    
    if (!mainDish) {
        const selectedCombo = getSelectedCombo();
        if (selectedCombo && selectedCombo.main) {
            showNotification(
                'Главное блюдо обязательно для выбранного комбо',
                'error'
            );
            return;
        }
    }
    
    if (!validateCombo()) {
        showNotification(
            'Состав заказа не соответствует доступным комбо',
            'error'
        );
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (checkAuthError(response)) {
            return;
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Ошибка отправки заказа');
        }
        
        const result = await response.json();
        const successMsg = 'Заказ успешно оформлен! ID заказа: ' + result.id;
        showNotification(successMsg, 'success');
        
        setTimeout(() => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            window.location.href = 'index.html';
        }, 3000);
        
    } catch (error) {
        const errorMsg = 'Ошибка при оформлении заказа: ' + error.message;
        showNotification(errorMsg, 'error');
    }
}

function initEventListeners() {
    const form = document.getElementById('order-submit-form');
    form.addEventListener('submit', submitOrder);
    
    const deliveryTypeRadios = document.querySelectorAll(
        'input[name="delivery_type"]'
    );
    const deliveryTimeInput = document.getElementById('delivery_time');
    
    deliveryTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const checkedRadio = document.querySelector(
                'input[name="delivery_type"]:checked'
            );
            deliveryTimeInput.disabled = checkedRadio.value !== 'by_time';
        });
    });
    
    deliveryTimeInput.disabled = true;
}

async function initOrderPage() {
    await loadAllDishes();
    loadSelectedDishes();
    renderOrderItems();
    updateOrderSummary();
    initEventListeners();
}

document.addEventListener('DOMContentLoaded', initOrderPage);