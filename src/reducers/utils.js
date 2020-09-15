var INITIAL_STATE = {
  showModal: "",
  powerType: "",
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      const modal = action.payload
      /* If this modal is already open I toggle it off. */
      const alreadyOpen = state.showModal === modal 
      return { ...state, showModal: alreadyOpen ? false : modal }
      case 'TOGGLE_POWERS_MODAL':
        const powerType = action.payload
      return {...state, showModal: "powers", powerType }
    default:
      return state
  }
}
