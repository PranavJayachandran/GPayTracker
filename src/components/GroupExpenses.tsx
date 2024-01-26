import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  groupMoneyCalculator,
  upDatePieChart,
} from "../helpers/GroupExpensesHelper";
import { IMoneyDictionary } from "../interfaces/IMoneyDicionary";
import { Graph } from "./Graph";

interface Props {
  name: string;
}

export const GroupExpenses = ({ name }: Props) => {
  const [moneySpent, setMoneySpent] = useState(0);
  const [moneyRecieved, setMoneyRecieved] = useState(0);
  const [moneyByGroup, setMoneyByGroup] = useState<IMoneyDictionary>();
  const [pieChartDataSpent, setPieChartDataSpent] = useState<
    Array<Array<string | number>>
  >([["GroupName", "MoneySpent"]]);
  const [pieChartDataRecieved, setPieChartDataRecieved] = useState<
    Array<Array<string | number>>
  >([["GroupName", "MoneyRecieved"]]);
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
          let pieChartData: Array<Array<string | number>> = upDatePieChart(
            calculatedMoney.moneyByGroup.spent
          );
          setPieChartDataSpent(pieChartData);
          pieChartData = upDatePieChart(calculatedMoney.moneyByGroup.recieved);
          setPieChartDataRecieved(pieChartData);
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
    console.log(moneyByGroup?.spent);
  }, [moneyByGroup]);
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="bg-blue-100 border-dotted px-4 py-10 text-center border-[2px] border-black">
            Drop the file in the exported zip file from{" "}
            <strong>Takeout\Google Pay\Group expenses</strong>
          </p>
        )}
      </div>
      <div>
        Total Money Spent in groups: {moneySpent}
        Total Money Recieved from groups: {moneyRecieved}
      </div>
      <div className="flex">
        <Graph
          data={pieChartDataSpent}
          options={{
            title: "Money spent in groups",
          }}
        />
        <Graph
          data={pieChartDataRecieved}
          options={{
            title: "Money recieved from groups",
          }}
        />
      </div>
    </div>
  );
};
