const name = "joseph mbugua"
// console.log(this)
function show(){
    
    console.log(this) // this points to undefined 

}

show() 

const person = {
    name : "joseph",
    greet : function(){
        console.log(this.name)
    }
};

person.greet()

function greet(){
    const name= "joseph"
    console.log(`hello, my name is ${this.name}`)
}

const user2 = {name: "Alice"}
// call is a method that allows us to call a function with a specified
// this value 
greet.call(person);
greet.call(user2)

function introduce(city, country){
    console.log(` I am ${this.name} from ${city} , ${country}`)
}

introduce.call(user2,"Nairobi","Kenya")

// bind method : returns a new function with a binded this 
// does not execute the function immediately = it returns new function with given 'this'
// 1. create a new variable to store the reference to the binded function 
const boundGreet = greet.bind(person)
boundGreet()
const boundIntro = introduce.bind(person, "Nairobi", "kenya")
boundIntro()

// apply() this is similar to call i.e. immediately invokes the function 
// its accepts arguments as array. 
introduce.apply(person,["Mombasa", "Kenya"])

// arrow functions do not have their own this context 
// an arrow function must inherit its this ref from a lexical scoping persepective 
const user4 =  {
    name: "Adam", 
    greet: function(){
        const arrowGreet = () => {
            console.log(`Hello my name is ${this.name}`)
        }
        arrowGreet();
    }
}
user4.greet()