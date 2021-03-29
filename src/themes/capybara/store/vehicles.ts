// import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
// const vehicleData = require('theme/resource/vehicles.json')
import vehicleData from '../resource/vehicles.json';

export const vehiclesStore = {
  namespaced: true,
  state: {
    savedVehicles: []
  },
  actions: {},
  mutations: {
    SET_VEHICLE (state, nationalCode) {
      const previousVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
      state.savedVehicles = [...new Set([...previousVehicles, nationalCode])];
      localStorage.setItem('vehicles', JSON.stringify(state.savedVehicles));
      localStorage.setItem('active-vehicle', nationalCode);
    },
    CLEAR_VEHICLES (state) {
      state.savedVehicles = [];
      localStorage.removeItem('vehicles');
      localStorage.removeItem('active-vehicle');
    }
  },
  getters: {
    getAttributeIdByLabel: (state, getters, rootState, rootGetters) => (
      attributeCode,
      attributeLabel
    ) => {
      const attribute =
        rootGetters['attribute/getAttributeListByCode'][attributeCode];
      if (!attribute) {
        return null;
      }
      const attributeId = attribute.options.find(
        option => option.label === attributeLabel.toString()
      )?.value;
      return attributeId || null;
    },
    getAttributeLabelById: (state, getters, rootState, rootGetters) => (
      attributeCode,
      attributeId
    ) => {
      const attribute =
        rootGetters['attribute/getAttributeListByCode'][attributeCode];
      if (!attribute) {
        return null;
      }

      const attributeLabel = attribute.options.find(
        option => option.value === attributeId.toString()
      )?.label;
      return attributeLabel || null;
    },
    getSavedVehiclesData () {
      const nationalCodes = JSON.parse(localStorage.getItem('vehicles'));
      return nationalCodes
        ? nationalCodes.map(code => {
          return vehicleData['vehicles'].find(
            vehicle => vehicle.National_code === code
          );
        })
        : [];
    },
    getActiveVehicleData: (state, getters, rootState, rootGetters) => (national_code) => {
      return vehicleData['vehicles'].find(vehicle => vehicle.National_code === national_code.toString())
    }
  }
};
