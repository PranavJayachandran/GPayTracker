import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const readAndParseHTML = (file: File) => {
  const reader = new FileReader();

  reader.onload = () => {
      const fileContent = reader.result;
    if (typeof fileContent == "string") {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(fileContent, "text/html");
      const contentCells = htmlDocument.querySelectorAll(".content-cell");
        const contentCellsArray = Array.from(contentCells);
        let sentMoney: number = 0;
        let recievedMoeny: number = 0;
        contentCellsArray.forEach((element, index) => {
            let inputString=element.innerHTML
            const transactionTypeMatch = inputString.match(/(Received|Sent) ₹([\d.]+)/);
            const transactionType = transactionTypeMatch ? transactionTypeMatch[1] : null;
            const amountString = transactionTypeMatch ? transactionTypeMatch[2].replace(/,/g, '') : null;
            const amount = amountString ? parseFloat(amountString) : null;
            if (transactionType == "Sent" && amount != null)
                sentMoney += amount;
            else if (transactionType == "Received" && amount != null)
                recievedMoeny += amount;
        });
        console.log(sentMoney, recievedMoeny);
    }
  };

  reader.readAsText(file);
};

const IndividualPayments = () => {
    let file:File|null=null;
  const onDrop = (acceptedFiles: File[]) => {
    file = acceptedFiles[0];
    if (file) {
      readAndParseHTML(file);
    }
    };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default IndividualPayments;
