const currentOrder = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null,
};

const availableCombos = [
    { soup: true, main: true, salad: true, drink: true },
    { soup: true, main: true, drink: true },
    { soup: true, salad: true, drink: true },
    { main: true, salad: true, drink: true },
    { main: true, drink: true },
];

let dishes = [];

function showNotification(message) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    const button = document.createElement('button');
    button.className = 'notification-btn';
    button.innerHTML = 'Окей 👌';
    
    notification.appendChild(text);
    notification.appendChild(button);
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    button.addEventListener('click', () => {
        overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function loadDishes() {
    return fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dishes = data.map(dish => ({
                keyword: dish.keyword,
                name: dish.name,
                price: dish.price,
                category: dish.category,
                count: dish.count,
                image: dish.image,
                kind: dish.kind
            }));
            return dishes;
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
            showNotification(
                'Не удалось загрузить меню. Пожалуйста, обновите страницу.'
            );
            return [];
        });
}

function filterDishes(category, kind) {
    const container = document.getElementById(`${category}-dishes`);
    const allCards = container.querySelectorAll('.dish-card');
    
    allCards.forEach(card => {
        const dishKeyword = card.getAttribute('data-dish');
        const dish = dishes.find(d => d.keyword === dishKeyword);
        
        if (dish.kind === kind) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function resetFilter(category) {
    const container = document.getElementById(`${category}-dishes`);
    const allCards = container.querySelectorAll('.dish-card');
    
    allCards.forEach(card => {
        card.style.display = 'flex';
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categorySection = this.closest('.dishes-section');
            const category = categorySection
                .querySelector('.dishes-grid')
                .id
                .split('-')[0];
            const kind = this.getAttribute('data-kind');
            
            const isActive = this.classList.contains('active');
            
            const sectionFilters = categorySection
                .querySelectorAll('.filter-btn');
            sectionFilters.forEach(btn => btn.classList.remove('active'));
            
            if (isActive) {
                resetFilter(category);
            } else {
                this.classList.add('active');
                filterDishes(category, kind);
            }
        });
    });
}

function highlightSelectedDish(selectedDish) {
    const allCardsInCategory = document.querySelectorAll('[data-dish]');
    allCardsInCategory.forEach((card) => {
        const dishKeyword = card.getAttribute('data-dish');
        const dish = dishes.find((d) => d.keyword === dishKeyword);
        if (dish && dish.category === selectedDish.category) {
            card.style.border = '1px solid #eee';
        }
    });

    const selectedCard = document.querySelector(
        `[data-dish="${selectedDish.keyword}"]`
    );
    if (selectedCard) {
        selectedCard.style.border = '2px solid tomato';
    }
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const totalPrice = document.getElementById('total-price');

    let total = 0;
    let hasSelectedItems = false;
    let orderHTML = '';

    const hasAnySelection = currentOrder.soup || 
        currentOrder.main || 
        currentOrder.salad ||
        currentOrder.drink ||
        currentOrder.dessert;

    if (!hasAnySelection) {
        orderHTML = '<h2>Ничего не выбрано</h2>';
    } else {
        if (currentOrder.soup) {
            orderHTML += '<div class="order-item">' +
                '<strong>Суп</strong><br>' +
                `${currentOrder.soup.name} ` +
                `${currentOrder.soup.price}Р</div>`;
            total += currentOrder.soup.price;
            hasSelectedItems = true;
            document.getElementById('soup-input')
                .value = currentOrder.soup.keyword;
        } else {
            orderHTML += '<div class="order-item">' +
                '<strong>Суп</strong><br>' +
                'Блюдо не выбрано</div>';
            document.getElementById('soup-input').value = '';
        }

        if (currentOrder.main) {
            orderHTML += '<div class="order-item">' +
                '<strong>Главное блюдо</strong><br>' +
                `${currentOrder.main.name} ` +
                `${currentOrder.main.price}Р</div>`;
            total += currentOrder.main.price;
            hasSelectedItems = true;
            document.getElementById('main-input')
                .value = currentOrder.main.keyword;
        } else {
            orderHTML += '<div class="order-item">' +
                '<strong>Главное блюдо</strong><br>' +
                'Блюдо не выбрано</div>';
            document.getElementById('main-input').value = '';
        }

        if (currentOrder.salad) {
            orderHTML += '<div class="order-item">' +
                '<strong>Салат/стартер</strong><br>' +
                `${currentOrder.salad.name} ` +
                `${currentOrder.salad.price}Р</div>`;
            total += currentOrder.salad.price;
            hasSelectedItems = true;
            document.getElementById('salad-input')
                .value = currentOrder.salad.keyword;
        } else {
            orderHTML += '<div class="order-item">' +
                '<strong>Салат/стартер</strong><br>' +
                'Блюдо не выбрано</div>';
            document.getElementById('salad-input').value = '';
        }

        if (currentOrder.drink) {
            orderHTML += '<div class="order-item">' +
                '<strong>Напиток</strong><br>' +
                `${currentOrder.drink.name} ` +
                `${currentOrder.drink.price}Р</div>`;
            total += currentOrder.drink.price;
            hasSelectedItems = true;
            document.getElementById('drink-input')
                .value = currentOrder.drink.keyword;
        } else {
            orderHTML += '<div class="order-item">' +
                '<strong>Напиток</strong><br>' +
                'Напиток не выбран</div>';
            document.getElementById('drink-input').value = '';
        }

        if (currentOrder.dessert) {
            orderHTML += '<div class="order-item">' +
                '<strong>Десерт</strong><br>' +
                `${currentOrder.dessert.name} ` +
                `${currentOrder.dessert.price}Р</div>`;
            total += currentOrder.dessert.price;
            hasSelectedItems = true;
            document.getElementById('dessert-input')
                .value = currentOrder.dessert.keyword;
        } else {
            orderHTML += '<div class="order-item">' +
                '<strong>Десерт</strong><br>' +
                'Десерт не выбран</div>';
            document.getElementById('dessert-input').value = '';
        }
    }

    orderSummary.innerHTML = orderHTML;

    if (hasSelectedItems) {
        orderTotal.style.display = 'block';
        totalPrice.textContent = total;
    } else {
        orderTotal.style.display = 'none';
    }
}

function addToOrder(dish) {
    let orderCategory;
    if (dish.category === 'soup') orderCategory = 'soup';
    else if (dish.category === 'main') orderCategory = 'main';
    else if (dish.category === 'salad') orderCategory = 'salad';
    else if (dish.category === 'drink') orderCategory = 'drink';
    else if (dish.category === 'dessert') orderCategory = 'dessert';

    currentOrder[orderCategory] = dish;

    highlightSelectedDish(dish);
    updateOrderSummary();
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}Р</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    const addButton = card.querySelector('.add-btn');
    addButton.addEventListener('click', () => {
        addToOrder(dish);
    });

    return card;
}

function renderDishes() {
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    
    categories.forEach(category => {
        const container = document.getElementById(`${category}-dishes`);
        const categoryDishes = dishes.filter(dish => 
            dish.category === category
        );
        const sortedDishes = categoryDishes.sort((a, b) => 
            a.name.localeCompare(b.name)
        );
        
        container.innerHTML = '';
        
        sortedDishes.forEach(dish => {
            const dishCard = createDishCard(dish);
            container.appendChild(dishCard);
        });
    });
}

function isValidOrder() {
    const currentSelection = {
        soup: !!currentOrder.soup,
        main: !!currentOrder.main,
        salad: !!currentOrder.salad,
        drink: !!currentOrder.drink,
        dessert: !!currentOrder.dessert
    };
    
    const hasAnyMainItem = currentSelection.soup || 
                          currentSelection.main || 
                          currentSelection.salad || 
                          currentSelection.drink;
    
    if (!hasAnyMainItem && !currentSelection.dessert) {
        return { 
            valid: false, 
            message: 'Ничего не выбрано. Выберите блюда для заказа' 
        };
    }
    
    if ((currentSelection.drink || currentSelection.dessert) && 
        !currentSelection.soup && 
        !currentSelection.main && 
        !currentSelection.salad) {
        return { 
            valid: false, 
            message: 'Выберите главное блюдо' 
        };
    }
    
    const needsDrink = 
        (currentSelection.soup && 
         currentSelection.main && 
         currentSelection.salad) ||
        (currentSelection.soup && 
         currentSelection.main) ||
        (currentSelection.soup && 
         currentSelection.salad) ||
        (currentSelection.main && 
         currentSelection.salad);
    
    if (needsDrink && !currentSelection.drink) {
        return { 
            valid: false, 
            message: 'Выберите напиток' 
        };
    }
    
    if (currentSelection.soup && 
        !currentSelection.main && 
        !currentSelection.salad) {
        return { 
            valid: false, 
            message: 'Выберите главное блюдо/салат/стартер' 
        };
    }
    
    if (currentSelection.salad && 
        !currentSelection.soup && 
        !currentSelection.main) {
        return { 
            valid: false, 
            message: 'Выберите суп или главное блюдо' 
        };
    }
    
    const isValidCombo = availableCombos.some(combo => {
        const comboMatches = 
            (!combo.soup || currentSelection.soup) &&
            (!combo.main || currentSelection.main) &&
            (!combo.salad || currentSelection.salad) &&
            (!combo.drink || currentSelection.drink);
        
        return comboMatches;
    });
    
    if (isValidCombo) {
        return { 
            valid: true, 
            message: '' 
        };
    }
    
    return { 
        valid: false, 
        message: 'Выбранные блюда не соответствуют доступным комбинациям ланча' 
    };
}

function initFormValidation() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const orderValidation = isValidOrder();
        
        if (!orderValidation.valid) {
            showNotification(orderValidation.message);
            return;
        }
        
        const requiredFields = form.querySelectorAll('[required]');
        let missingFields = [];
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                missingFields.push(field.name);
            }
        });
        
        if (missingFields.length > 0) {
            showNotification('Заполните все обязательные поля формы');
            return;
        }
        
        form.submit();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadDishes()
        .then(() => {
            renderDishes();
            initFilters();
            initFormValidation();
        })
        .catch(error => {
            console.error('Ошибка инициализации:', error);
            showNotification(
                'Ошибка загрузки данных. Пожалуйста, обновите страницу.'
            );
        });
});