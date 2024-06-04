INSERT INTO `ingredient` (ingredient_name, ingredient_type, author_image, url_image) VALUES
('Pepperoni', 'MEAT', 'Author', '/meat/peperoni/'),
('Mozzarella', 'CHEESE', 'Author', '/cheese/mozzarella'),
('Pineapple', 'VEGETABLE', 'Author', '/vegetables/pineapple'),
('Ham', 'MEAT', 'Author', '/meat/ham');

INSERT INTO `customer_order` (id_order, id_customer, country, state, city, street, house_number, apartment, floor, total, order_timestamp) VALUES
(UUID(), 4234, 'México', 'State', 'City', 'Street', 4324, null, null, 98723, '2024-3-09 20:10:12'),
(UUID(), 31, 'México', 'State', 'City', 'street', 4324, null, null, 98723, '2024-3-09 20:10:12');

INSERT INTO `pizza` (id_pizza, id_order, pizza_name, pizza_image_url, pizza_image_author, price, size, quantity, pizza_timestamp) VALUES
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 4234 LIMIT 1), 'Custom something 1', 'url', 'author', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 4234 LIMIT 1), 'Custom something 2', 'url', 'author', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 31 LIMIT 1), 'Custom something 3', 'url', 'author', 534, 'MEDIUM', 2, '2024-3-09 20:10:12');

INSERT INTO `pizza_ingredients` (id_pizza_ingredients, id_pizza, id_ingredient, ingredient_quantity) VALUES
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 1' LIMIT 1), 1, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 1' LIMIT 1), 2, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 2, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 3, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 4, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 2, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 3, 1),
(UUID(), (SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 4, 1);