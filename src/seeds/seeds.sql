-- Users Table
CREATE TABLE users (
  id serial PRIMARY KEY,
  email varchar(100) NOT NULL UNIQUE
);

-- User_favorites Table
CREATE TABLE user_favorites (
  user_id int NOT NULL,
  movie_id varchar(100) NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Users test data
INSERT INTO users(email)
VALUES
('gralfonsotr@gmail.com'),
('alexfmarquez@gmail.com'),
('mariadiananaghiu09@gmail.com');

-- Users_favorites
INSERT INTO user_favorites (user_id, movie_id)
VALUES
((SELECT id FROM users WHERE email = 'gralfonsotr@gmail.com'), '597'),
((SELECT id FROM users WHERE email = 'gralfonsotr@gmail.com'), '27205'),
((SELECT id FROM users WHERE email = 'gralfonsotr@gmail.com'), '12599'),
((SELECT id FROM users WHERE email = 'alexfmarquez@gmail.com'), '91314'),
((SELECT id FROM users WHERE email = 'alexfmarquez@gmail.com'), '120'),
((SELECT id FROM users WHERE email = 'alexfmarquez@gmail.com'), '1154598'),
((SELECT id FROM users WHERE email = 'mariadiananaghiu09@gmail.com'), '9479'),
((SELECT id FROM users WHERE email = 'mariadiananaghiu09@gmail.com'), '8392'),
((SELECT id FROM users WHERE email = 'mariadiananaghiu09@gmail.com'), '507089')
