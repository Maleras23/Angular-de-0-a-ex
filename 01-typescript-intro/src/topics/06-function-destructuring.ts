
export interface Product {
    description: string;
    price: number;
}

const phone: Product = {
        
    description: "Nokia A1",
    price: 150.0
}

const tablet: Product = {
    description: "ipad Air",
    price: 250.0
}


interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

//*aqui desestructuramos el argumento que entra a la funcion entre {} y lo que retorna estableciendo una dupla de numeros[number, number]
// function taxCalculation( { tax, products }: TaxCalculationOptions ): [number, number] {

//* aqui solo desesturcturamos el resultado de la funcion como una dupla de numeros 
export function taxCalculation( options: TaxCalculationOptions ): [number, number] {
    
    //*aqui desestruturamos de forma normal
    const {tax, products } = options;

    let total = 0;
    
    //* desestructuramos el argumento product del cual solo nesecitamos el price
    products.forEach( ({ price }) => {
        total += price;
    });

    
    return [ total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

//* aqui desestructuramos el resutlado de la funcion y creamos dos variables con eso
// const  [total, taxTotal ] = taxCalculation({
//     products: shoppingCart,
//     tax: tax,
// });

// console.log('Total', total);
// console.log('Tax', taxTotal);


// export {};