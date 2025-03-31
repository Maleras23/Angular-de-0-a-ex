
interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015,
    } 
}

//* Desestructuracion
const song = 'New Song';

//* Forma basica de desestructurar 
const { audioVolume } = audioPlayer;

//* Desesturcturacion mas compleja cambieando el nombre de la propiedad y con una desestructuracion dentro de otra 

const { 
    song:anotherSong, 
    songDuration:duration, 
    //* Esto es una desestructuracion dentro de otra, tambien puedes siplemente sacar la propiedad details y luegohacer la desesetructuracion de ella afuera como esta mas abajo
    details: {author},
} = audioPlayer;

//* desestructuracion de la propiedad details de forma separada
// const { author } = details;


// console.log('Volume: ', audioVolume );
// console.log('Song: ', anotherSong );
// console.log('Duration: ', duration);
// console.log('Author:', author);


//* Desestructuracion de arreglos 
//! Desestructuracion al mismo tiempo de creacion del arreglo
const [a1, a2, a3]: string[] = ['Gojan', 'Vegeta', 'Trunks'];

//! Desestructuracion despues de creado el arreglo
const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

const [p1, p2, p3] = dbz;

//! Cuando solo quieres uno de los elementos del arreglo ( queremos trunks)

const [, , c3 ] = dbz;

//! Para darle un valor por defecto en el caso que no venga ese elemento

const [, , , b4 = 'Not found' ] = dbz;

console.log( a2, p1, c3, b4 )



export {};