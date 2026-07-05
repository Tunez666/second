USE second;

create table users(
id int primary key auto_increment,
username varchar(255) not null,
email varchar(255) not null unique,
password varchar(255) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);

create table workspaces(
id int primary key auto_increment,
name varchar(255) not null,
id_user int not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (id_user) references users(id)
);

create table tasks(
id int primary key auto_increment,
id_ws int not null,
title varchar(255) not null,
description text,
status enum('todo', 'in_progress', 'done') default 'todo',
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (id_ws) references workspaces(id)
);

create table categories(
id int primary key auto_increment,
id_user int not null,
name varchar(255) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (id_user) references users(id)
);

create table notes(
id int primary key auto_increment,
id_ws int not null,
title varchar(255) not null,
id_category int,
content text,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (id_ws) references workspaces(id),
foreign key (id_category) references categories(id)
);