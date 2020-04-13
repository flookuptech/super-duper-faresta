import { Component } from "react";

class Form extends Component {
  state = {
    data: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.onSubmit();
  };

  overrideHandleSubmit = e => {
    e.preventDefault();
    this.overrideOnSubmit();
  };

  handleOnChange = ({ target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  render() {
    return null;
  }
}

export default Form;
