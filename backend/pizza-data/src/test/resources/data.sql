INSERT INTO `customer` (id_customer, customer_name, email, password, birth_date, creation_timestamp) VALUES
(31, 'Customer', 'first@names.com', '1234', '2003-10-09', '2024-2-09 20:10:12'),
(2, 'Empty', 'second@names.com', '1234', '2003-10-09', '2024-2-09 20:10:12'),
(4234, 'Customer', 'random@names.com', '1234', '2003-10-09', '2024-2-09 20:10:12');

INSERT INTO `ingredient` (ingredient_name, author_image, url_image) VALUES
('Pepperoni', 'Author', 'https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/'),
('Mozzarella', 'Author', 'https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/'),
('Pineapple', 'Author', 'https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/'),
('Ham', 'Author', 'https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/');

INSERT INTO `customer_order` (id_order, id_customer, country, city, street, house_number, apartment, floor, total, order_timestamp) VALUES
(UUID(), 4234, 'México', 'City', 'Street', 4324, null, null, 98723, '2024-3-09 20:10:12'),
(UUID(), 31, 'México', 'City', 'street', 4324, null, null, 98723, '2024-3-09 20:10:12');

INSERT INTO `pizza` (id_pizza, id_order, pizza_name, price, size, quantity, pizza_timestamp) VALUES
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 4234 LIMIT 1), 'Custom something 1', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 4234 LIMIT 1), 'Custom something 2', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID(), (SELECT id_order FROM customer_order WHERE id_customer = 31 LIMIT 1), 'Custom something 3', 534, 'MEDIUM', 2, '2024-3-09 20:10:12');

INSERT INTO `pizza_ingredients` (id_pizza, id_ingredient) VALUES
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 1' LIMIT 1), 1),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 1' LIMIT 1), 2),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 2),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 3),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 2' LIMIT 1), 4),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 2),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 3),
((SELECT id_pizza FROM pizza WHERE pizza_name = 'Custom something 3' LIMIT 1), 4);