console.log("hello back to school");

// declare to variables for use in the script
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashbaord;
let listSheets;

let saleMap;
let totalSale;
let salesByProduct;

const AustraliaButton = document.getElementById("Australia_filter");
const clearFilterButton = document.getElementById("Clear_filter");
const undoButton = document.getElementById("undo_filter");
const minValue = document.getElementById("min_value");
const maxValue = document.getElementById("max_value");
const applyButton = document.getElementById("apply_button");

function logWorkbookInformation() {
  //get the Workbook
  workbook = viz.workbook;
  console.log(`The name of the workbook "${workbook.name}"`);

  //get the views which are in the workbook
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheet with index ${element.index} is ${element.name}`);
  });

  //Get the currently Active view
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  //List the Worksheets in the active view
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(`The worksheet with index ${element.index} is ${element.name}`);
  });

  saleMap = listSheets.find((ws) => ws.name == "ME-Asia Sales Map");
  totalSale = listSheets.find(
    (ws) => ws.name == "Category Profit with Avg Discount"
  );
  salesByProduct = listSheets.find(
    (ws) => ws.name == "Profit vs Quantity with Discount"
  );
}

function AustraliaFunction() {
  console.log(`Australia Button Press. ${AustraliaButton.value}`);

  saleMap.applyFilterAsync("Country / Region", ["Australia"], "replace");
  totalSale.applyFilterAsync("Country / Region", ["Australia"], "replace");
  salesByProduct.applyFilterAsync("Country / Region", ["Australia"], "replace");
}

function clearFilterFunction() {
  console.log(`Clearing Country Filter`);

  saleMap.clearFilterAsync("Country / Region");
  totalSale.clearFilterAsync("Country / Region");
  salesByProduct.clearFilterAsync("Country / Region");
}

function unDo() {
  console.log("undoing last action..");
  viz.undoAsync();
}

function filterRangeFunction() {
  console.log(`Min value to Filter: ${minValue.value}`);
  console.log(`Max value to filter: ${maxValue.value}`);

  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: parseFloat(minValue.value),
    max: parseFloat(maxValue.value),
  });
}

viz.addEventListener("firstinteractive", logWorkbookInformation);
AustraliaButton.addEventListener("click", AustraliaFunction);
clearFilterButton.addEventListener("click", clearFilterFunction);
undoButton.addEventListener("click", unDo);
applyButton.addEventListener("click", filterRangeFunction);
