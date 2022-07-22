var pieColors = ["#85dcb0", "#42c985", "#4aed9b", "#1c804d", "#287d6b", "#2bba9b", "#21bfb5", "#20857e", "#208534", "#12b833"]

moneySpentCategoryData = [];
categoryLabelData = [];
for(var i = 0; i < transactionData.length; i++){
    moneySpentCategoryData.push(transactionData[i].amount)
    categoryLabelData.push(transactionData[i].category)
}

pie = document.getElementById('category-expenditure');
Plotly.newPlot( pie, [{
    values: moneySpentCategoryData,
    labels: categoryLabelData,
    type: "pie",
    marker: {
        colors: pieColors,
    },
    hoverinfo: "label+value+percent",
    textinfo: "label"
}], plotLayout)