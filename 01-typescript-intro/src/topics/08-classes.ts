


export class Person {
    public name: string;
    public address: string;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
}

//* Forma corta de crear o definir clases
class Person2 {
    constructor(
        public firstName: string,
        public lastName: string,
        private address: string = 'No address',
    ){}
}

//* Extencion de las clases o colocar una clase dentro de otra 
// export class Hero extends Person {
//     constructor( 
//         public alterEgo: string,
//         public age: number,
//         public realName: string,
//     ){
//         super( realName, 'New York' )
//     }

// }

//* Es mejor priorizar la composicion sobre la herencia
export class Hero {
    // public person: Person2;
    constructor( 
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person2,
    ){

        // this.person = new Person2(realName)
    }
}
 
const tony = new Person2('Tony', 'Stark', 'New York')
const ironman = new Hero('Ironman', 45 , 'Tony', tony);

console.log(ironman, tony)