import React, {PropTypes} from 'react';

export class SelectInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $(this.refs.select).material_select(this.onChange.bind(this));
  }

  componentDidUpdate() {
    $(this.refs.select).material_select(this.onChange.bind(this));
  }

  onChange() {
    if (!this.props.onChange) return;
    const selectObject = Object.assign({ name: this.props.name, value: this.refs.select.value });
    this.props.onChange(selectObject);
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={name}>{this.props.label}</label>
        <div className="field">
          {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
          <select ref="select"
            name={name}
            value={this.props.value}
            onChange={this.onChange}
            className="form-control">
            <option value="">{this.props.defaultOption}</option>
            {this.props.options.map((option) => {
              return <option key={option.value} value={option.value}>{option.text}</option>;
            })
            }
          </select>
          {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
        </div>
      </div>
    );
  }
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.stringSelectInput,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};