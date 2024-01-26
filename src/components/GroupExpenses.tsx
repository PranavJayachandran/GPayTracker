import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { groupMoneyCalculator } from "../helpers/GroupExpensesHelper";
import { IMoneyDictionary } from "../interfaces/IMoneyDicionary";

interface Props {
  name: string;
}

export const GroupExpenses = ({ name }: Props) => {
  const [moneySpent, setMoneySpent] = useState(0);
  const [moneyRecieved, setMoneyRecieved] = useState(0);
  const [moneyByGroup, setMoneyByGroup] = useState<IMoneyDictionary>();
  const fileRef = useRef<File | null>(null);

  const readAndParseJson = (file: File) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const binaryStr: ArrayBuffer = reader.result;
        const text = new TextDecoder().decode(binaryStr);
        try {
          const jsonData = JSON.parse(text);
          let calculatedMoney = groupMoneyCalculator(jsonData, name);
          setMoneySpent(calculatedMoney.totalSpent);
          setMoneyRecieved(calculatedMoney.totalReceived);
          setMoneyByGroup(calculatedMoney.moneyByGroup);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    fileRef.current = acceptedFiles[0];
    readAndParseJson(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    if (fileRef.current !== null) {
      readAndParseJson(fileRef.current);
    }
  }, [name]);

  useEffect(() => {
    if (fileRef.current !== null) {
      readAndParseJson(fileRef.current);
    }
  }, [fileRef.current]);

  useEffect(() => {
    console.log(moneyByGroup?.spent)
  },[moneyByGroup])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div>
        Spent: {moneySpent}
        Recieved: {moneyRecieved}
        {moneyByGroup?.spent && Object.keys(moneyByGroup?.spent).map((key) => (
        <div key={key}>{`${key}: ${moneyByGroup?.spent[key]}`}</div>
        ))}
        <br/>
      {moneyByGroup?.recieved && Object.keys(moneyByGroup?.recieved).map((key) => (
        <div key={key}>{`${key}: ${moneyByGroup?.recieved[key]}`}</div>
      ))}
      </div>
    </div>
  );
};
