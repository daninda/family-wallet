create table households (
    id serial primary key
);

create table users (
    id serial primary key,
    name text not null,
    email text not null,
    limitation integer DEFAULT null,
    password_hash text not null,
    is_admin boolean not null,
    accepted boolean not null,
    household_id integer,
    foreign key (household_id) references households(id) on delete cascade
);

create table categories (  
    id serial primary key,
    name text not null,
    household_id integer not null,
    foreign key (household_id) references households(id) on delete cascade
);

create table subcategories (
    id serial primary key,
    name text not null,
    category_id integer not null,
    foreign key (category_id) references categories(id) on delete cascade
);

create table records (
    id serial primary key,
    description text not null,
    price integer not null,
    date bigint not null,
    user_id integer not null,
    subcategory_id integer not null,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (subcategory_id) references subcategories(id) on delete cascade
);