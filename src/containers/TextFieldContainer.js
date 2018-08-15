import {connect} from "react-redux";

// Components
import TextField from "../components/textField/TextField"

// Actions
import {setText} from "../actions"

const mapStatesToProps = state => ({
  value: state.storedText,
  disabled: state.locked
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => {
      dispatch(setText(text));
    }
})

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(TextField)
