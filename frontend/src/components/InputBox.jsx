import React, { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {type == "password" ? (
        <i
          class={
            "fi fi-rr-eye" +
            (!showPassword ? "-crossed" : "") +
            " input-icon left-[auto] right-3 cursor-pointer"
          }
          onClick={() => setShowPassword((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
