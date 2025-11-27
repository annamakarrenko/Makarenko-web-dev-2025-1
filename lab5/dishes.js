const dishes = [
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'images/soups/gazpacho.jpg',
        kind: 'veg'
    },
    {
        keyword: 'mushroom_cream',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'images/soups/mushroom_soup.jpg',
        kind: 'veg'
    },
    {
        keyword: 'norwegian',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'images/soups/norwegian_soup.jpg',
        kind: 'fish'
    },
    {
        keyword: 'tom_yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500 г',
        image: 'images/soups/tomyum.jpg',
        kind: 'fish'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350 г',
        image: 'images/soups/chicken.jpg',
        kind: 'meat'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425 г',
        image: 'images/soups/ramen.jpg',
        kind: 'meat'
    },

    {
        keyword: 'fried_potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '250 г',
        image: 'images/main_course/friedpotatoeswithmushrooms1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья с мясным рагу и соусом бешамель',
        price: 385,
        category: 'main',
        count: '310 г',
        image: 'images/main_course/lasaghna.jpg',
        kind: 'meat'
    },
    {
        keyword: 'chicken_cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        count: '280 г',
        image: 'images/main_course/chickencutletsandmashedpotatoes.jpg',
        kind: 'meat'
    },
    {
        keyword: 'fish_cutlet',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main',
        count: '270 г',
        image: 'images/main_course/fishrice.jpg',
        kind: 'fish'
    },
    {
        keyword: 'pizza_margarita',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main',
        count: '470 г',
        image: 'images/main_course/pizza.jpg',
        kind: 'veg'
    },
    {
        keyword: 'pasta_shrimp',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        count: '280 г',
        image: 'images/main_course/shrimppasta.jpg',
        kind: 'fish'
    },

    {
        keyword: 'korean_salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        count: '250 г',
        image: 'images/salads_starters/saladwithegg.jpg',
        kind: 'veg'
    },
    {
        keyword: 'tuna_salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        count: '250 г',
        image: 'images/salads_starters/tunasalad.jpg',
        kind: 'fish'
    },
    {
        keyword: 'caesar_chicken',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        count: '220 г',
        image: 'images/salads_starters/caesar.jpg',
        kind: 'meat'
    },
    {
        keyword: 'fries_caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        count: '235 г',
        image: 'images/salads_starters/frenchfries1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        count: '235 г',
        image: 'images/salads_starters/caprese.jpg',
        kind: 'veg'
    },
    {
        keyword: 'fries_ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        count: '235 г',
        image: 'images/salads_starters/frenchfries2.jpg',
        kind: 'veg'
    },

    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/orangejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/applejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/carrotjuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/cappuccino.jpg',
        kind: 'hot'
    },
    {
        keyword: 'green_tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/greentea.jpg',
        kind: 'hot'
    },
    {
        keyword: 'black_tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'images/beverages/tea.jpg',
        kind: 'hot'
    },

    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        count: '300 г',
        image: 'images/desserts/baklava.jpg',
        kind: 'small'
    },
    {
        keyword: 'chocolate_cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        count: '140 г',
        image: 'images/desserts/chocolatecake.jpg',
        kind: 'small'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        count: '125 г',
        image: 'images/desserts/cheesecake.jpg',
        kind: 'small'
    },
    {
        keyword: 'donuts_3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        count: '350 г',
        image: 'images/desserts/donuts.jpg',
        kind: 'medium'
    },
    {
        keyword: 'chocolate_cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        count: '125 г',
        image: 'images/desserts/chocolatecheesecake.jpg',
        kind: 'medium'
    },
    {
        keyword: 'donuts_6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        count: '700 г',
        image: 'images/desserts/donuts2.jpg',
        kind: 'large'
    }
];