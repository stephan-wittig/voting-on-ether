import React, {Component} from "react";

//CSS
import style from "./App.css";

//Components
import ReadButton from "./components/readButton/ReadButton";
import TextField from "./components/textField/TextField";
import WriteButton from "./components/writeButton/WriteButton";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      locked: false
    };
    this.setText = this.setText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setText(newText){
    this.setState({text: newText});
  }

  handleChange(event){
    setText(event.target.value);
  }

  render(){
    return(
      <div className={style.app}>
        Click one of the buttons below to query the storage value of the smart contract. Write something into the text field and click on the other button to change the storage value.
        <TextField value={this.state.text} handleChang={this.handleChange} disabled={this.state.locked}/>
        <div className={style.buttons}>
          <ReadButton disabled={this.state.locked} changeFunction={this.setText}/>
          <WriteButton value={this.state.text} disabled={this.state.locked} lockFunction={(value) => {
            this.setState({locked: value})
          }}/>
        </div>
      </div>
    )
  }
}

export default App;
