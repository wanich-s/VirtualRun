CREATE TABLE Users (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    id_card VARCHAR(13),
    email VARCHAR(50),
    tel VARCHAR(15),
    address VARCHAR(100),
    shirt_size VARCHAR(5),
    school VARCHAR(20),
    career VARCHAR(20),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE Administrator (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,    
    profile VARCHAR(15),
    user_id INT(8) UNSIGNED NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
)


CREATE TABLE Activity (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    application_start_date DATE,
    application_end_date DATE,
    activity_start_date DATE,
    activity_end_date DATE,
    send_result_start_date DATE,
    send_result_end_date DATE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE Participant (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    certificate_no VARCHAR(20),
    bib_number VARCHAR(20),
    application_date DATE,    
    activity_id INT(8) UNSIGNED NOT NULL,
    user_id INT(8) UNSIGNED NOT NULL,
    FOREIGN KEY (activity_id) REFERENCES Activity(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE PaymentDetails (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT(8) UNSIGNED NOT NULL,
    payment_date DATE NOT NULL,
    payment_time TIME,
    payment_amount NUMERIC,
    payment_slips MEDIUMBLOB,
    FOREIGN KEY (customer_id) REFERENCES Participant(id) ON DELETE CASCADE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE ActivityLog (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    participant_id INT(8) UNSIGNED NOT NULL,
    activity_date DATE NOT NULL,
    activity_time TIME,
    result_time TIME NOT NULL,
    distance DECIMAL NOT NULL,
    activity_image1 MEDIUMBLOB,
    activity_image2 MEDIUMBLOB,
    activity_image3 MEDIUMBLOB,
    FOREIGN KEY (participant_id) REFERENCES Participant(id) ON DELETE CASCADE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE Sender (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

SELECT u.first_name, u.last_name, u.id_card, u.email, u.tel, u.address, u.shirt_size, u.career, u.school FROM Users u 
INNER JOIN Participant p ON u.id = p.user_id 
INNER JOIN Activity a ON a.id = p.activity_id 
LEFT JOIN PaymentDetails pd ON p.id = pd.customer_id 
WHERE a.id = '1'

ALTER TABLE PaymentDetails    
MODIFY payment_slips MEDIUMBLOB;

SELECT * FROM PaymentDetails;

SELECT * from ActivityLog;

SELECT * from Sender;

delete from Sender;

INSERT INTO Administrator (user_id, profile) VALUES ('1', 'admin');

SELECT * FROM Administrator a LEFT JOIN Users u ON a.user_id = u.id;

SELECT * FROM Users u RIGHT JOIN Administrator a ON a.user_id = u.id;

SELECT * FROM Administrator;

INSERT INTO Activity (title) VALUES ('วิ่งร้อยโล');

INSERT INTO Participant (user_id, activity_id) VALUES ('1', '1');

SELECT * FROM Participant WHERE user_id = '1' AND activity_id = '1';

SELECT * FROM Participant;

SELECT * FROM Users u 
LEFT JOIN Participant p ON u.id = p.user_id
LEFT JOIN Activity a ON a.id = p.activity_id WHERE u.id = '1';

SELECT first_name, last_name, id_card, email, tel, address, shirt_size FROM Users WHERE id = '1';

INSERT INTO Users (user_name, password, first_name, last_name) VALUES ('wanich', MD5('wanich'), 'Wanich', 'Srisang');
INSERT INTO Users (user_name, password, first_name, last_name) VALUES ('user', MD5('user'), 'FirstName', 'LastName');

SELECT * FROM Users;

UPDATE Users SET password = MD5('wanich') WHERE id = '1';

SET FOREIGN_KEY_CHECKS = 0; DROP TABLE PaymentDetails; SET FOREIGN_KEY_CHECKS = 1;
-- DELETE FROM Users WHERE id = '2';
-- DELETE FROM Administrator;
-- DELETE FROM Participant;

SET FOREIGN_KEY_CHECKS = 0; TRUNCATE PaymentDetails; SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE Participant ADD payment_slips MEDIUMBLOB;