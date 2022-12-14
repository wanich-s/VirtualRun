-- 2022-09-16
ALTER TABLE Users ADD pick_up_place VARCHAR(60);

-- 2022-09-17
ALTER TABLE Participant ADD status VARCHAR(30);

-- 2022-09-19
CREATE TABLE Bib_Number_seq (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activity_id INT(8) UNSIGNED NOT NULL,
    FOREIGN KEY (activity_id) REFERENCES Activity(id) ON DELETE CASCADE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2022-09-23
CREATE TABLE Schools (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    school_name varchar(255)
);
insert into Schools (id,school_name) values ('1','โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา');
insert into Schools (id,school_name) values ('2','โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกําแพงแสน ศูนย์วิจัยและพัฒนาการศึกษา');
insert into Schools (id,school_name) values ('3','โรงเรียนสาธิตมหาวิทยาลัยขอนแก่น');
insert into Schools (id,school_name) values ('4','โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย ฝ่ายประถม');
insert into Schools (id,school_name) values ('5','โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย ฝ่ายมัธยม');
insert into Schools (id,school_name) values ('6','โรงเรียนสาธิตมหาวิทยาลัยเชียงใหม่');
insert into Schools (id,school_name) values ('7','โรงเรียนมัธยมสาธิตมหาวิทยาลัยนเรศวร');
insert into Schools (id,school_name) values ('8','โรงเรียนสาธิตมหาวิทยาลัยพะเยา');
insert into Schools (id,school_name) values ('9','โรงเรียนสาธิต “พิบูลบําเพ็ญ” มหาวิทยาลัยบูรพา');
insert into Schools (id,school_name) values ('10','โรงเรียนสาธิตมหาวิทยาลัยมหาสารคาม (ฝ่ายประถม)');
insert into Schools (id,school_name) values ('11','โรงเรียนสาธิตมหาวิทยาลัยมหาสารคาม (ฝ่ายมัธยม) ');
insert into Schools (id,school_name) values ('12','โรงเรียนสาธิตมหาวิทยาลัยรามคําแหง (ฝ่ายประถม)');
insert into Schools (id,school_name) values ('13','โรงเรียนสาธิตมหาวิทยาลัยรามคําแหง (ฝ่ายมัธยม)');
insert into Schools (id,school_name) values ('14','โรงเรียนสาธิตมหาวิทยาลัยศิลปากร (ปฐมวัยและประถมศึกษา)');
insert into Schools (id,school_name) values ('15','โรงเรียนสาธิตมหาวิทยาลัยศิลปากร');
insert into Schools (id,school_name) values ('16','โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน');
insert into Schools (id,school_name) values ('17','โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร (ฝ่ายประถม)');
insert into Schools (id,school_name) values ('18','โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร (ฝ่ายมัธยม)');
insert into Schools (id,school_name) values ('19','โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ องครักษ์ สถาบันวิจัย พัฒนาและสาธิตการศึกษา');
insert into Schools (id,school_name) values ('20','โรงเรียนสาธิตมหาวิทยาลัยสงขลานครินทร์ ฝ่ายมัธยมศึกษา');
insert into Schools (id,school_name) values ('21','โรงเรียนสาธิตมหาวิทยาลัยสงขลานครินทร์ ฝ่ายประถมศึกษา');
insert into Schools (id,school_name) values ('22','โรงเรียนสาธิตมหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย');

-- 2022-09-25
ALTER TABLE Users
MODIFY shirt_size VARCHAR(25);

-- 2022-09-27
ALTER TABLE PaymentDetails ADD payment_no VARCHAR(30);
CREATE TABLE Payment_no_seq (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2022-09-28
CREATE TABLE Career (
    id INT(8) UNSIGNED PRIMARY KEY,
    career_title VARCHAR(255),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
insert into Career (id, career_title) values ('1','นักเรียน');
insert into Career (id, career_title) values ('2','ครู');
insert into Career (id, career_title) values ('3','บุคลากร/เจ้าหน้าที่');
insert into Career (id, career_title) values ('4','ผู้ปกครอง');
insert into Career (id, career_title) values ('5','ศิษย์เก่า');

-- 2022-09-28
ALTER TABLE Users
MODIFY address TEXT;

-- 2022-10-01
ALTER TABLE ActivityLog
MODIFY distance DECIMAL(10,2);