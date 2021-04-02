// const person={
//     name:"John Doe",
//     age:20,
// }

console.log(__dirname,__filename);

class Person{
    constructor(name,age)
    {
        this.name=name;
        this.age=age;
    }
    greetings(){
        console.log(`name is ${this.name} and age is ${this.age}`)
    }
}
module.exports=Person