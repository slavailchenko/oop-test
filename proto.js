"use strict";

// 1. Конструктор Person

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.checkage = function() {
   console.log (this.age);
   console.log (this.name);
  if (this.age<18) console.log (`${this.name}: ребенок`)
	else if ((this.age>18) || (this.age == 18)) 
		console.log (`${this.name}: взрослый`)
	else console.log ('Неверно введен возраст');
}

// 2. Конструктор StatusPerson

function StatusPerson(name, age, citizenship, id) {
   Person.apply(this, arguments);
   this.citizenship = citizenship;
   this.id = id;
}

Person.prototype.checkid = function() {
   console.log (this.id);
  if (this.id) console.log (`${this.name} присвоен ${this.id}`)
	else console.log ('Нужно присвоить id');
}

// Наследовать
   StatusPerson.prototype = Object.create(Person.prototype);

// Constructor saved 
   StatusPerson.prototype.constructor = StatusPerson;

// Методы потомка
   StatusPerson.prototype.checkage = function() {

// Вызов метода родителя внутри своего
   Person.prototype.checkage.apply(this); // Выполняем метод из прототипа родителя в своем контексте
   console.log (`Имеет гражданство ${this.citizenship}`); // Расширяем функционал родительского метода
   
};

// 3. Конструктор Employment

function Employment (name, age, citizenship, id, employment, position) {
   StatusPerson.apply(this, arguments);
   this.place_of_employment = employment;
   this.position = position;
}

StatusPerson.prototype.checkposition = function () {
	console.log (this.position);
	if (this.position == 'Intern') {
		console.log (`${this.name} быстрее становись Senior`)};
     };

// Наследовать
   Employment.prototype = Object.create(StatusPerson.prototype);

// Constructor saved 
   Employment.prototype.constructor = Employment;

// Методы потомка
   Employment.prototype.checkid = function() {
   
// Вызов метода родителя внутри своего
   StatusPerson.prototype.checkid.apply(this);
   console.log (`Работает в ${this.place_of_employment} на должности ${this.position}`)
};


// 4. Конструктор User 

function User (name, age, citizenship, id, employment, position, login, pwd) {
   Employment.apply(this, arguments);
   this.login = login;
   this.pwd = pwd;
}

// Наследовать
   User.prototype = Object.create(Employment.prototype);

// Constructor saved 
   User.prototype.constructor = User;

// Методы потомка
   User.prototype.checkposition = function() {
   console.log (this);

// Вызов метода родителя внутри своего
   Employment.prototype.checkposition.apply(this);
   console.log (`${this.name} имеет логин ${this.login} и пароль ${this.pwd}`)
};

// 5. Конструктор Admin 

function Admin (name, age, citizenship, id, employment, position, login, pwd, isActiveAdmin) {
   User.apply(this, arguments);
   this.isActiveAdmin = isActiveAdmin;
  }

// Наследовать
   Admin.prototype = Object.create(User.prototype);

// Constructor saved 
   Admin.prototype.constructor = Admin;

// Методы потомка
   Admin.prototype.checkAdmin = function() {
    console.log (this);
    if (this.isActiveAdmin) { 
          console.log (`${this.name} имеет права Администратора`) }
          else {
            console.log (`${this.name} не имеет права Администратора`)
          }
};

// create object

   var persona = new Admin ('Slava Ilchenko', 40, 'Ukraine', '2881410536', 
    'CHI Software', 'Intern', 'slavailchenko', '1234', true);
   persona.checkage(); // Slava Ilchenko: взрослый
   persona.checkid(); // Имеет гражданство Ukraine Slava Ilchenko присвоен 2881410536
   persona.checkposition(); // Работает в CHI Software на должности Intern
   persona.checkAdmin (); // Slava Ilchenko имеет логин slavailchenko и пароль 1234 
   // Slava Ilchenko имеет права Администратора

//

console.log(persona instanceof Admin); //true
console.log(persona instanceof User); //true
console.log(persona instanceof Employment); //true
console.log(persona instanceof StatusPerson); //true
console.log(persona instanceof Person); //true

