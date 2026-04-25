const API_KEY = "692a28151fa2446582960863c7ef32f6";

export const getLocationInfo = async (lat: number, lng: number) => {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}&language=es`);
    const data = await response.json();
    
    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      const components = result.components;
      
      const placesList: string[] = [];
      if (components.neighbourhood) placesList.push(`Barrio: ${components.neighbourhood}`);
      if (components.suburb) placesList.push(`Sector: ${components.suburb}`);
      if (components.road || components.pedestrian) placesList.push(`Vía: ${components.road || components.pedestrian}`);
      if (components.city || components.town) placesList.push(`Ciudad: ${components.city || components.town}`);

      if (placesList.length === 0) placesList.push("Lugares específicos no identificados");

      return {
        address: result.formatted,
        places: placesList
      };
    }
    return { address: "Dirección no encontrada", places: [] };
  } catch (error) {
    console.error(error);
    return null;
  }
};