class Greeter {  
    greeting: string;  
    constructor(message: string) {  
        this.greeting = message;  
    }  
    greet() {  
        return "Hello, " + this.greeting;  
    }  
}  
  
var greeter = new Greeter("world");  
  
console.log(greeter.greet());

var isDone: boolean = false;

class Student {
    fullname : string;
    constructor(public firstname, public middleinitial, public lastname) {
        // Content
        this.fullname = firstname + ' ' + middleinitial + ' ' + lastname;
    }
}

interface Person {
    firstname: string;
    lastname: string;
}

function greeter2(person: Person) {
    return 'Hello, ' + person.firstname + ' ' + person.lastname;
}

var user = new Student('Jane', 'M.', 'Userlast');

console.log(greeter2(user));