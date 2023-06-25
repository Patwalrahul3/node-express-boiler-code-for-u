const {StatusCodes} = require('http-status-codes')
const { AirplaneRepository } = require("../repositories");
const AppError = require('../utils/errors/app-error');

const airplanneRepository = new AirplaneRepository();

async function createAirplane(data){

    try{
        const airplane = await airplanneRepository.create(data);
        return airplane;

    }catch(error){
        let explanation = [];
        if(error.name == 'SequelizeValidationError'){
          error.errors.forEach((err) =>{
            explanation.push(err.message)
          })
          throw new  AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new  AppError('Cannot create new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
      
}


async function getAirplanes(){

try{
  const airplane = await airplanneRepository.getAll();
  return airplane;

}catch(error){
  throw new  AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);

}

}


async function getAirplane(id){

  try{
    const airplane = await airplanneRepository.get(id);
    return airplane;
  
  }catch(error){
    console.log("error" , error)
    console.log("error" , error.statusCode)
    console.log("error" , StatusCodes.NOT_FOUND)
    if(error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError('The airplane you requested is not present', error.statusCode);
  }
    throw new  AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
  }


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
    
    
}