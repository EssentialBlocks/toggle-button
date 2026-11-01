import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

let toggleCount = 0;

const ToggleButton = ({ options, onChange, defaultSelected }) => {
  const [selected, setSelected] = useState(defaultSelected || options[0]);
  // One radio group per toggle: a shared name made several toggles on the same
  // screen behave as a single group.
  const groupName = useRef(null);
  if (groupName.current === null) {
    groupName.current = `eb-switch-${++toggleCount}`;
  }

  useEffect(() => {
    onChange(selected.value);
  }, [selected]);

  useEffect(() => {
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [defaultSelected]);

  return (
    <div className="eb-switch-control">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={groupName.current}
            checked={selected.value === option.value}
            onChange={() => setSelected(option)}
          />
          <span
            style={{
              color: selected.value === option.value ? "white" : "black",
            }}
          >
            {option.label}
          </span>
        </label>
      ))}
      <span
        className="slideBg"
        style={{
          backgroundColor: "#551ef7",
          transform:
            selected.value === options[0].value
              ? "translateX(0)"
              : "translateX(100%)",
        }}
      />
    </div>
  );
};

export default ToggleButton;
