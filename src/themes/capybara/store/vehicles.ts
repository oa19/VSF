// import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

export const vehiclesStore = {
  namespaced: true,
  state: {
    savedVehicles: []
  },
  actions: {
  },
  mutations: {
    SET_VEHICLE (state, national_code) {
      state.savedVehicles = [...new Set([...state.savedVehicles, national_code])]
      localStorage.setItem('vehicles', JSON.stringify(state.savedVehicles))
    },
    CLEAR_VEHICLES (state) {
      state.savedVehicles = []
    }
  },
  getters: {
    getAttributeIdByLabel: (state, getters, rootState, rootGetters) => (attributeCode, attributeLabel) => {
      const attribute = rootGetters['attribute/getAttributeListByCode'][attributeCode];
      if (!attribute) {
        return null;
      }
      const attributeId = attribute.options.find(
        option => option.label === attributeLabel.toString()
      )?.value;
      return attributeId || null
    },
    getAttributeLabelById: (state, getters, rootState, rootGetters) => (attributeCode, attributeId) => {
      const attribute = rootGetters['attribute/getAttributeListByCode'][attributeCode];
      if (!attribute) {
        return null;
      }

      const attributeLabel = attribute.options.find(
        option => option.value === attributeId.toString()
      )?.label;
      return attributeLabel || null
    },
    getAllSavedVehicles (state) {
      return state.savedVehicles
    },
    getSavedNationalCodes (state) {
      return state.savedVehicles.map(vehicle => vehicle.National_code)
    }
  }
}
