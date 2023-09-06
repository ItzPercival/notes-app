CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, content)
VALUES
('My First note', 'This is a pretty cool first note')
('My Second note', 'This is a pretty cool second note');
