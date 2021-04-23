import vehicleData from '../resource/vehicles.json';

const VEHICLE_DATA_KEY = 'vehicles';

const saveVehicles = data => {
  const previousVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  let newVehicles;
  if (typeof data === 'string') {
    const vehicle = vehicleData['vehicles'].find(
      v => v.National_code === data
    );
    // remove duplicated vehicles
    previousVehicles.forEach(
      (v, index) => {
        if (v.National_code === data) previousVehicles.splice(index, 1);
      }
    );
    newVehicles = [...new Set([...previousVehicles, vehicle])];
    localStorage.setItem('active-vehicle', JSON.stringify(vehicle));
  } else {
    // remove duplicated vehicles
    previousVehicles.forEach((v, index) => {
      if (v.National_code === data.National_code) {
        previousVehicles.splice(index, 1);
      }
    });
    newVehicles = [...new Set([...previousVehicles, data])];
    localStorage.setItem('active-vehicle', JSON.stringify(data));
  }
  localStorage.setItem('vehicles', JSON.stringify(newVehicles));
};

const clearVehicles = () => {
  localStorage.removeItem('vehicles');
  localStorage.removeItem('active-vehicle');
};

const getSavedVehiclesData = () => {
  return JSON.parse(localStorage.getItem('vehicles'));
};

const getActiveVehicleData = () => {
  return JSON.parse(localStorage.getItem('active-vehicle'));
}

export {
  saveVehicles,
  clearVehicles,
  getSavedVehiclesData,
  getActiveVehicleData,
  VEHICLE_DATA_KEY
};
