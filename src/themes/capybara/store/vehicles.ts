// import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

export const vehiclesStore = {
  namespaced: true,
  state: {
    new_collection: [],
    bestsellers: []
  },
  actions: {
  },
  mutations: {
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
    }
  }
}
