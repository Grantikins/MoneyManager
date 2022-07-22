
const plotLayout = {
    height: 400,
    width: 600,
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff"
}

var myColors = ["#85dcb0", "#42c985", "#4aed9b", "#1c804d", "#287d6b", "#2bba9b", "#21bfb5", "#20857e", "#208534", "#12b833"]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var monthData = [];
var moneySpentData = [];
sorted = transactionData.sort( (a, b) => {
    if(a.dateCreated < b.dateCreated) return -1
    else if (a.dateCreated > b.dateCreated) return -1
    else return 0
} )
for(var i = 0; i < sorted.length; i++){
    var month = parseInt(sorted[i].dateCreated.toString().split("-")[1])
    monthData.push(months[month - 1])
    moneySpentData.push(sorted[i].amount)
}

bar = document.getElementById('expenditure-per-week');
Plotly.newPlot( bar, [{
    x: monthData,
    y: moneySpentData,
    type: "bar",
    marker: {
        color: "#7d94b5"
    }
}], plotLayout);

