export const vehiclesStore = {
  namespaced: true,
  state: {
    savedVehicles: [],
    svgs: {}
  },
  actions: {},
  mutations: {
    addNewSvg (state, svg) {
      const { key, value } = svg
      const stateSvgInstance = Object.assign({}, state.svgs)
      stateSvgInstance[key] = value
      state.svgs = stateSvgInstance
    },
    clearSvgs (state) {
      state.svgs = {}
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
        option => option.label === attributeLabel
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
    getSavedSvg: (state) => (key) => {
      return state.svgs[key]
    }
  }
};
