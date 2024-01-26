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
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={() => { setPropName(name) }}>Submit</button>
          </div>
      <div>
        <GroupExpenses name={propName.toLowerCase()} />
              {/* <IndividualPayments/> */}
          </div>
    </div>
  );
};
