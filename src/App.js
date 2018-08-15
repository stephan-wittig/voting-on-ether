import React, {Component} from "react";

//CSS
import style from "./App.css";

//Components
import StorageContract from "./components/storageContract/StorageContract";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    };
  }

  render(){
    return(
      <div className={style.app}>
        <StorageContract />
      </div>
    )
  }
}

export default App;
