


export function whatMyType<T>( argument: T ): T {
    
    return argument;
}

const amIString = whatMyType('Hoola Mundo');
const amINumber = whatMyType(100);
const amIArray = whatMyType([1,2,3,4,5]);

console.log( amIString.split( '' ));
console.log( amINumber.toFixed() );
console.log( amIArray.join('-') );
