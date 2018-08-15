import {connect} from "react-redux";

// Components
import Buttons from "../components/buttons/Buttons"

// Actions
import {setText, setLock} from "../actions"

const mapStatesToProps = state => ({
  text: state.storedText,
  disabled: state.locked
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => {
      dispatch(setText(text));
    },
    lockFunction: (bool) => {
      dispatch(setLock(bool));
    }
})

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(Buttons)
