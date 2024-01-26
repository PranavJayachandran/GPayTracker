import React, { useState } from "react";
import { GroupExpenses } from "./GroupExpenses";
import IndividualPayments from "./IndividualPayments";

export const Payment = () => {
  const [name, setName] = useState("");
  const [propName, setPropName] = useState("");
  return (
    <div>
      <div>
        <label>Enter your name</label>
        <input
          value={name}
          autoComplete="true"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border-2 border-black rounded-xl px-2 "
        />
        <button
          onClick={() => {
            setPropName(name);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        {/* <GroupExpenses name={propName.toLowerCase()} /> */}
        <IndividualPayments />
      </div>
    </div>
  );
};
