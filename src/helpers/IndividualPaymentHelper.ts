import { IDataByDate } from "../interfaces/IDataByDate";


const extractMoney = (inputString: string) => {
  const transactionTypeMatch = inputString.match(/(Received|Sent) ₹([\d.]+)/);
  const transactionType = transactionTypeMatch ? transactionTypeMatch[1] : null;
  const amountString = transactionTypeMatch
    ? transactionTypeMatch[2].replace(/,/g, "")
    : null;
  const amount = amountString ? parseFloat(amountString) : null;
  return { transactionType, amount };
};
const extractDate = (inputString: string) => {
  let dateRegex = /(\b(\w{3}) (\d{1,2}), (\d{4})\b)/;
  let match = inputString.match(dateRegex);
  let extractedDate = match ? match[0] : "-1";
  return new Date(extractedDate);
};
export const getTotalMoneySpentAndRecieved = (htmlDocument: Document) => {
  const contentCells = htmlDocument.querySelectorAll(".content-cell");
  const contentCellsArray = Array.from(contentCells).split(0,1000);
  let spentMoney: number = 0;
  let recievedMoney: number = 0;
  contentCellsArray.forEach((element, index) => {
    let inputString = element.innerHTML;
    let { transactionType, amount } = extractMoney(inputString);
    if (transactionType == "Sent" && amount != null) spentMoney += amount;
    else if (transactionType == "Received" && amount != null)
      recievedMoney += amount;
  });
  return {
    spentMoney: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Math.round(spentMoney)),
    recievedMoney: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Math.round(recievedMoney)),
  };
};
export const getDataByDate = (htmlDocument: Document) => {
  let dataByDate: IDataByDate = {
    spent: {
      2024: {
        0: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        1: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        2: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        3: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        4: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        5: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        6: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        7: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        8: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        9: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        10: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        11: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
      },
      2023: {
        0: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        1: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        2: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        3: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        4: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        5: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        6: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        7: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        8: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        9: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        10: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        11: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
      },
    },
    recieved: {
      2024: {
        0: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        1: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        2: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        3: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        4: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        5: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        6: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        7: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        8: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        9: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        10: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        11: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
      },
      2023: {
        0: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        1: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        2: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        3: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        4: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        5: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        6: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        7: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        8: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        9: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        10: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
        11: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
        },
      },
    },
  };
  const contentCells = htmlDocument.querySelectorAll(".content-cell");
  const contentCellsArray = Array.from(contentCells);
  contentCellsArray.forEach((htmlContent, index) => {
    let inputString = htmlContent.innerHTML;
    let extractedDate = extractDate(inputString);
    let { transactionType, amount } = extractMoney(inputString);
    if (
      !isNaN(extractedDate.getTime()) &&
      extractedDate.toDateString() != "Mon Jan 01 2001"
    ) {
      if (transactionType == "Sent" && amount != null) {
        let year = extractedDate.getFullYear().toString();
        let month = extractedDate.getMonth().toString();
        let date = extractedDate.getDate().toString();
        let week = Math.floor(extractedDate.getDate() / 7);
        if (dataByDate.spent[year][month][week][date]) {
          dataByDate.spent[year][month][week][date] += amount;
        } else {
          dataByDate.spent[year][month][week][date] = amount;
        }
      }
      if (transactionType == "Received" && amount != null) {
        let year = extractedDate.getFullYear().toString();
        let month = extractedDate.getMonth().toString();
        let date = extractedDate.getDate().toString();
        let week = Math.floor(extractedDate.getDate() / 7);
        console.log(year,month,week,date,dataByDate)
        if (dataByDate.recieved[year][month][week][date]) {
          dataByDate.recieved[year][month][week][date] += amount;
        } else {
          dataByDate.recieved[year][month][week][date] = amount;
        }
      }
    }
  });
  console.log(dataByDate);
  return {
    dateSortedSpend: dataByDate.recieved,
    dateSortedRecieve: dataByDate.spent,
  };
};
// const sortByDate = (data: any) => {
//   // const entries = Object.entries(data).map(([dateString, value]) => ({
//   //   date: new Date(dateString),
//   //   value: value,
//   // }));
//   // return entries;
//   return data;
// };
