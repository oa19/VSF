import vehicleData from '../resource/vehicles.json';

const VEHICLE_DATA_KEY = 'vehicles';

const saveVehicles = nationalCode => {
  const previousVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const newVehicles = [...new Set([...previousVehicles, nationalCode])];
  localStorage.setItem('vehicles', JSON.stringify(newVehicles));
  localStorage.setItem('active-vehicle', JSON.stringify(nationalCode));
};

const clearVehicles = () => {
  localStorage.removeItem('vehicles');
  localStorage.removeItem('active-vehicle');
};

const getSavedVehiclesData = () => {
  const savedVehicles = JSON.parse(localStorage.getItem('vehicles'));

  return savedVehicles
    ? savedVehicles.map(code => {
      return vehicleData['vehicles'].find(
        vehicle => vehicle.National_code === code
      );
    })
    : [];
};

const getActiveVehicleData = () => {
  const savedNationalCode = JSON.parse(localStorage.getItem('active-vehicle'));

  return vehicleData['vehicles'].find(
    vehicle => vehicle.National_code === savedNationalCode.toString()
  );
}

export {
  saveVehicles,
  clearVehicles,
  getSavedVehiclesData,
  getActiveVehicleData,
  VEHICLE_DATA_KEY
};
