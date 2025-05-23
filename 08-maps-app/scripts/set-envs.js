

const { writeFileSync, mkdirSync } = require( 'fs');

// aqui leemos variables de entorno
require( 'dotenv' ). config();

// aqui definimos los paths
const tragetPath = './src/environments/environment.ts'
const tragetPathDev = './src/environments/environment.development.ts'

// leemos la variable de entornod el porcess.env
const mapboxKey = process.env['MAPBOX_KEY'];

// hacemos la validacion de que existe
if ( !mapboxKey ) {
  throw new Error( 'MAPBOX_KEY is not set')
}

//  establecemos el contenido del archivo
const envFileContent = `
  export const environment = {
  mapboxKey: "${ mapboxKey }"
  };
`;

// creamos los archivos de los paths
mkdirSync( './src/environments', { recursive: true });
writeFileSync( tragetPath, envFileContent)
writeFileSync( tragetPathDev, envFileContent)
