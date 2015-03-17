declare class Greeter {
    greeting: string;
    constructor(message: string);
    greet(): string;
}
declare var greeter: Greeter;
declare var isDone: boolean;
declare class Student {
    firstname: any;
    middleinitial: any;
    lastname: any;
    fullname: string;
    constructor(firstname: any, middleinitial: any, lastname: any);
}
interface Person {
    firstname: string;
    lastname: string;
}
declare function greeter2(person: Person): string;
declare var user: Student;
