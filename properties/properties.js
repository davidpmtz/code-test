const axios = require('axios').default;

export async function getPropertyByName (event) {
  try {
    const requestProperties = await axios.get('https://api.mocklets.com/p68140/properties')
    const properties = requestProperties.data
    let property = properties.find(property => property.name === event.pathParameters.name)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getPropertyByName',
        property,
      }),
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    }
  }
};

export async function getPropertiesByType (event) {
  try {
    const requestProperties = await axios.get('https://api.mocklets.com/p68140/properties')
    const propertiesData = requestProperties.data
    let types = event.queryStringParameters.types.split(',')
    let properties = propertiesData.filter(property => types.includes(property.type))
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getPropertiesByType',
        properties
      }),
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    }
  }
};

export async function getPropertiesByFacility (event) {
  try {
    const requestProperties = await axios.get('https://api.mocklets.com/p68140/properties')
    const propertiesData = requestProperties.data
    let facilities = event.queryStringParameters.facilities.split(',')
    let properties = propertiesData.filter(property => {
      return property.facilites.filter(facility => facilities.includes(facility)).length >= facilities.length
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getPropertiesByFacility',
        properties
      }),
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    }
  }
};

export async function getPropertiesReport (event) {
  try {
    const requestProperties = await axios.get('https://api.mocklets.com/p68140/properties')
    const propertiesData = requestProperties.data
    let types = [... new Set(propertiesData.map(prop => prop.type))]
    let propsByType = types.map(type => {
      let total = propertiesData.filter(prop => prop.type === type).length
      return {
        type,
        total
      }
    })
    
    let facilities = [... new Set(propertiesData.map(prop => prop.facilites).flat())]

    let propsByFacilities = facilities.map(facility => {
      let total = propertiesData.filter(prop => {
        return prop.facilites.includes(facility)
      }).length
      return {
        facility,
        total
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getPropertiesReport',
        report: {
          totalProperties: propertiesData.length,
          propsByType,
          propsByFacilities
        }
      }),
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    }
  }
};
