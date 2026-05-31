-- Insert Categories
INSERT INTO categories (name, slug, emoji) VALUES
('Chicken Wraps', 'chicken', '🍗'),
('Beef Wraps', 'beef', '🥩'),
('Veggie Wraps', 'veggie', '🥗'),
('Healthy Wraps', 'healthy', '🌿'),
('Combo Meals', 'combo', '🍱');

-- Insert Products
-- Chicken Wraps (Category 1)
INSERT INTO products (name, description, price, image_url, category_id, is_popular, is_new, is_deal, rating, review_count) VALUES
('Smoky Chipotle Chicken', 'Grilled chicken with chipotle sauce, corn, and fresh salsa in a warm tortilla.', 10.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', 1, true, false, false, 4.9, 284),
('Teriyaki Chicken', 'Juicy teriyaki chicken with sesame slaw and pickled ginger.', 11.49, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80', 1, true, false, false, 4.7, 228),
('Buffalo Ranch Chicken', 'Crispy chicken tossed in buffalo sauce with ranch and celery.', 11.99, 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80', 1, false, false, true, 4.8, 259);

-- Beef Wraps (Category 2)
INSERT INTO products (name, description, price, image_url, category_id, is_popular, is_new, is_deal, rating, review_count) VALUES
('BBQ Beef Crunch', 'Slow-cooked BBQ beef with crunchy coleslaw and pickled jalapeños.', 12.99, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80', 2, true, false, false, 4.8, 312),
('Steak & Cheese', 'Tender steak strips, melted cheese, caramelized onions, and peppers.', 13.99, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80', 2, true, false, false, 4.9, 338);

-- Veggie Wraps (Category 3)
INSERT INTO products (name, description, price, image_url, category_id, is_popular, is_new, is_deal, rating, review_count) VALUES
('Mediterranean Veggie', 'Hummus, roasted veggies, feta cheese, olives, and fresh greens.', 9.49, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', 3, false, true, false, 4.7, 196),
('Spicy Falafel', 'Crispy falafel, harissa, tahini, and roasted red pepper.', 8.99, 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80', 3, false, false, false, 4.5, 167),
('Thai Peanut Veggie', 'Tofu, cabbage, carrots, cilantro with a creamy peanut sauce.', 9.49, 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&q=80', 3, false, true, false, 4.6, 121);

-- Healthy Wraps (Category 4)
INSERT INTO products (name, description, price, image_url, category_id, is_popular, is_new, is_deal, rating, review_count) VALUES
('Green Goddess Wrap', 'Avocado, spinach, cucumber, sprouts, and tahini dressing.', 9.99, 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=800&q=80', 4, false, false, false, 4.6, 143),
('Lean Turkey Club', 'Sliced turkey, avocado, tomato, and light mayo on whole wheat.', 10.49, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80', 4, false, false, false, 4.7, 178);

-- Combo Meals (Category 5)
INSERT INTO products (name, description, price, image_url, category_id, is_popular, is_new, is_deal, rating, review_count) VALUES
('Lunch Combo Deal', 'Any wrap + drink + side. The perfect weekday lunch combo.', 11.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', 5, false, false, true, 4.9, 445),
('Breakfast Wrap Special', 'Scrambled eggs, bacon, cheese, and hash browns. Morning perfection.', 9.99, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80', 5, false, false, true, 4.7, 209);
