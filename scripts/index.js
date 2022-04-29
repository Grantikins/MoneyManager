var plotLayout = {
    height: 400,
    width: 600
}

bar = document.getElementById('expenditure-per-week');

weekData = ["April 3", "April 10", "April 17", "April 24", "May 1"];
moneySpentData = [1, 2, 4, 8, 16];

moneySpentCategoryData = [19, 26, 55];
categoryLabelData = ["Entertainment", "Bills", "Groceries"];

Plotly.newPlot( bar, [{
    x: weekData,
    y: moneySpentData,
    type: "bar" 
}], plotLayout);

pi = document.getElementById('category-expenditure');
Plotly.newPlot( pi, [{
    values: moneySpentCategoryData,
    labels: categoryLabelData,
    type: "pie"
}], plotLayout)