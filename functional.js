"use strict";

// 1. Конструктор Person

// Ограничение доступа к данным класса реализуется через концепцию замыкания: 
// параметры функции, а также переменные и методы, объявленные внутри класса, доступны извне только через публичные методы класса

function Person(name, age) {
  this._name = name;
  this._age = age;

  this.checkage = function() {
  if (this._age<18) console.log (`${this._name}: ребенок`)
	else if ((this._age>18) || (this._age == 18)) 
		console.log (`${this._name}: взрослый`)
	else console.log ('Неверно введен возраст');
}

}

// 2. Конструктор StatusPerson

function StatusPerson(name, age, citizenship, id) {
   Person.apply(this, arguments);
   this._citizenship = citizenship;
   this._id = id;

   // расширение родительского метода

   var parentCheckage = this.checkage;

   this.checkid = function() {
   parentCheckage.apply (this);
   console.log (this._id);
    if (this._id) console.log (`${this._name} присвоен ${this._id}`)
	else console.log ('Нужно присвоить id');
}

}

// 3. Конструктор Employment

function Employment (name, age, citizenship, id, employment, position) {
   StatusPerson.apply(this, arguments);
   this._place_of_employment = employment;
   this._position = position;

   var parentCheckid = this.checkid;

   this.checkposition = function () {
     parentCheckid.apply (this);
	if (this._position == 'Intern') {
		console.log (`${this._name} быстрее становись Senior`)};
     };
}

// 4. Конструктор User 

function User (name, age, citizenship, id, employment, position, login, pwd) {
   Employment.apply(this, arguments);
   this._login = login;
   this._pwd = pwd;

   var parentCheckposition = this.checkposition;

   this.checkuser = function () {
     parentCheckposition.apply (this);
     console.log (`${this._name} имеет логин ${this._login} и пароль ${this._pwd}`);
 }

}

// 5. Конструктор Admin 

function Admin (name, age, citizenship, id, employment, position, login, pwd, isActiveAdmin) {
   User.apply(this, arguments);
   this._isActiveAdmin = isActiveAdmin;
   
   var parentCheckuser = this.checkuser;

   this.checkUserAdmin = function () {
     parentCheckuser.apply (this);

    console.log (this);

    if (this._isActiveAdmin) { 
          console.log (`${this._name} имеет права Администратора`) }
          else {
            console.log (`${this._name} не имеет права Администратора`)
          };
 }

}


// create object

   var persona = new Admin ('Slava Ilchenko', 40, 'Ukraine', '2881410536', 
    'CHI Software', 'Intern', 'slavailchenko', '1234', true);
   persona.checkUserAdmin ();

// Slava Ilchenko: взрослый
// 2881410536 
// Slava Ilchenko присвоен 2881410536
// Slava Ilchenko быстрее становись Senior 
// Slava Ilchenko имеет логин slavailchenko и пароль 1234 
// Admin {_name: "Slava Ilchenko", _age: 40, _citizenship: "Ukraine", _id: "2881410536", _place_of_employment: "CHI Software"…}
// Slava Ilchenko имеет права Администратора

console.log (persona instanceof Admin); // true
console.log (persona instanceof User); // false 
console.log (persona instanceof Employment); // false 
console.log (persona instanceof StatusPerson); // false 
console.log (persona instanceof Person); // false 