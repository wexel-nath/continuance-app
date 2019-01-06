import React from "react";

class Dropdown extends React.Component {
  componentDidMount() {
    window.$(".ui.dropdown").dropdown();
  }

  render() {
    const {
      handleChange,
      className,
      value,
      placeholder,
      children,
      showIcon
    } = this.props;
    return (
      <div className={className} onInput={handleChange} value={value}>
        {showIcon && <i className="dropdown icon" />}
        <div className="default text">{placeholder}</div>
        <div className="menu">{children}</div>
      </div>
    );
  }
}

export default Dropdown;
