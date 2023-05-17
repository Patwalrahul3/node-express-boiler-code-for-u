const { AirplaneRepository } = require("../repositories")

const airplanneRepository = new AirplaneRepository();

async function createAirplane(data){

    try{
        const airplane = await airplanneRepository.create(data);
        return airplane;

    }catch(error){
        throw error;
    }
      
}

module.exports = {
    createAirplane
}