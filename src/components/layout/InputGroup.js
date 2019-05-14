import React from 'react';

const InputGroup = ({
  name,
  type,
  label,
  placeholder,
  value,
  handleChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      className={
        error
          ? 'form-control form-control-lg is-invalid'
          : 'form-control form-control-lg'
      }
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
    <div className="invalid-feedback">{error}</div>
  </div>
);

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
