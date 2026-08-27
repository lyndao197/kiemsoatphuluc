import React from "react";

export default function FilterField({
  label,
  required = false,
  children,
  className = "",
}) {
  return (
    <div className={`filter-field ${className}`}>
      <label>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
    </div>
  );
}
