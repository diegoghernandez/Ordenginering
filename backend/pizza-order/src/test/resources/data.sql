INSERT INTO `customer_order` (id_order, id_customer, country, state, city, street, house_number, apartment, floor, total, order_timestamp) VALUES
(UUID_TO_BIN('a0823ef3-7d19-49a9-90eb-0e5cfc2c2396'), 4234, 'México', 'State', 'City', 'Street', 4324, null, null, 98723, '2024-3-09 20:10:12'),
(UUID_TO_BIN('2e71b858-afa9-43b5-acd1-23de83e42113'), 31, 'México', 'State', 'City', 'street', 4324, null, null, 98723, '2024-3-09 20:10:12');

INSERT INTO `pizza` (id_pizza, id_order, pizza_name, pizza_image_name, pizza_image_author, price, size, quantity, pizza_timestamp) VALUES
(UUID_TO_BIN('a0552847-5fbc-48f2-abb3-470bf4f22ef0'), UUID_TO_BIN('a0823ef3-7d19-49a9-90eb-0e5cfc2c2396'),
    '{"en": "Custom something 1", "es": "Personalizada de algo 1"}', 'url', '{"en": "author", "es": "autor"}', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID_TO_BIN('f06d7753-b77c-4e45-b377-f184a9209949'), UUID_TO_BIN('a0823ef3-7d19-49a9-90eb-0e5cfc2c2396'),
    '{"en": "Custom something 2", "es": "Personalizada de algo 2"}', 'url', '{"en": "author", "es": "autor"}', 534, 'LARGE', 2, '2024-3-09 20:10:12'),
(UUID_TO_BIN('de007c06-b151-41bd-b3d0-bec8a3266629'), UUID_TO_BIN('2e71b858-afa9-43b5-acd1-23de83e42113'),
    '{"en": "Custom something 3", "es": "Personalizada de algo 3"}', 'url', '{"en": "author", "es": "autor"}', 534, 'MEDIUM', 2, '2024-3-09 20:10:12');

INSERT INTO `pizza_ingredients` (id_pizza_ingredients, id_pizza, id_ingredient, ingredient_quantity) VALUES
(UUID_TO_BIN('e6b632a1-b83c-4aa5-afe3-908833df122a'), UUID_TO_BIN('a0552847-5fbc-48f2-abb3-470bf4f22ef0'), 1, 1),
(UUID_TO_BIN('e13d7e0b-288b-4a29-9457-a79ac84af6a2'), UUID_TO_BIN('a0552847-5fbc-48f2-abb3-470bf4f22ef0'), 2, 1),
(UUID_TO_BIN('bb937275-bbf8-4e88-b31c-040fca252cbd'), UUID_TO_BIN('f06d7753-b77c-4e45-b377-f184a9209949'), 2, 1),
(UUID_TO_BIN('f79f15ee-0faa-47c1-97dd-9402e2aa4047'), UUID_TO_BIN('f06d7753-b77c-4e45-b377-f184a9209949'), 3, 1),
(UUID_TO_BIN('85aa74ed-3c21-4b5e-a390-744509bc26ea'), UUID_TO_BIN('f06d7753-b77c-4e45-b377-f184a9209949'), 4, 1),
(UUID_TO_BIN('d771db12-82f8-401d-b783-984070124214'), UUID_TO_BIN('de007c06-b151-41bd-b3d0-bec8a3266629'), 2, 1),
(UUID_TO_BIN('308e38d9-2cc5-4ce4-adf4-4c9d955e0e34'), UUID_TO_BIN('de007c06-b151-41bd-b3d0-bec8a3266629'), 3, 1),
(UUID_TO_BIN('cb0d506d-6e27-442d-bfc9-f1678e707ea3'), UUID_TO_BIN('de007c06-b151-41bd-b3d0-bec8a3266629'), 4, 1);