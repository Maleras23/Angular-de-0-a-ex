
// Funciones clasicas
function addNumbers( a: number, b:number ): number {
    return a + b;
}


// Funciones de flecha

const addNumbersArrow = ( a: number, b: number): string => {
    return `${a + b}`;
}


//  Funciones con argumentos obligatorios, opcionales y pre-definidos
function multiply ( firtsNumber: number, secondNumber?: number, base:number = 2 ){
    return firtsNumber * base;
    
}

// const multiplyResult: number = multiply(5);
// const result: number = addNumbers( 1, 2 );
// const result2: string = addNumbersArrow( 1, 2 );

// console.log( {result} )
// console.log( {result2} )
// console.log( {multiplyResult} )

// Funciones con objetos como argumentos 
interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = ( character: Character, amount: number) => {
    character.hp += amount;4
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${ this.hp }`);
    }
}

healCharacter( strider, 10);

strider.showHp();

export{};