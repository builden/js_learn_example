var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
var greeter = new Greeter("world");
console.log(greeter.greet());
var isDone = false;
var Student = (function () {
    function Student(firstname, middleinitial, lastname) {
        this.firstname = firstname;
        this.middleinitial = middleinitial;
        this.lastname = lastname;
        // Content
        this.fullname = firstname + ' ' + middleinitial + ' ' + lastname;
    }
    return Student;
})();
function greeter2(person) {
    return 'Hello, ' + person.firstname + ' ' + person.lastname;
}
var user = new Student('Jane', 'M.', 'Userlast');
console.log(greeter2(user));
//# sourceMappingURL=test.js.map