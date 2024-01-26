import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  getDataByDate,
  getTotalMoneySpentAndRecieved,
} from "../helpers/IndividualPaymentHelper";

const IndividualPayments = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [moneyRecieved, setMoneyRecieved] = useState("");
  const [dataByDate, setDataByDate] = useState<{
    dateSortedSpend: Array<{ date: Date; value: number }>;
    dateSortedRecieve: Array<{ date: Date; value: number }>;
  } | null>(null);
  let file: File | null = null;
  const readAndParseHTML = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      if (typeof fileContent == "string") {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(fileContent, "text/html");
        let TotalMoney = getTotalMoneySpentAndRecieved(htmlDocument);
        setMoneySpent(TotalMoney.spentMoney);
        setMoneyRecieved(TotalMoney.recievedMoney);
        // let tempData: {
        //   dateSortedSpend: Array<{ date: Date; value: number }>;
        //   dateSortedRecieve: Array<{ date: Date; value: number }>;
        // } | null = getDataByDate(htmlDocument);
        // setDataByDate(tempData);
        getDataByDate(htmlDocument);
      }
    };

    reader.readAsText(file);
  };
  const onDrop = (acceptedFiles: File[]) => {
    file = acceptedFiles[0];
    if (file) {
      {
        readAndParseHTML(file);
      }
    }
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
            <strong>Takeout\Google Pay\My Activity</strong>
          </p>
        )}
      </div>
      <div>
        <div>Total Money Spent: {moneySpent}</div>
        <div>Total Money Recieved: {moneyRecieved}</div>
      </div>
      <div>
        {dataByDate ? (
          <div>
            <div>
              {dataByDate.dateSortedSpend.map((item) => (
                <div>
                  <div>Date: {item.date.toDateString()}</div>
                  <div>MoneySpent: {item.value}</div>
                </div>
              ))}
            </div>
            <div>
              {/* {dataByDate.dateSortedRecieve.map((item) => (
              <div>
                <div>Date: {item.date.toDateString()}</div>
                <div>MoneyRecieved: {item.value}</div>
              </div>
            ))} */}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default IndividualPayments;
