// event Handling In Javascript
// console.log(document.getElementById('btn'));
document.getElementById('btn').onclick = function(){

    document.getElementById('result').innerHTML = '';

    var data1 = document.getElementById('x1').value;
    var data2 = document.getElementById('x2').value;
    var data3 = document.getElementById('x3').value;

    console.log(data1 , isNaN(data1));
    console.log(data2);
    console.log(data3, typeof data3);

    var message = '';
    if( data1 == '' || data2 == '' || data3 == ''){
        message = 'All Values are required';
    }
    else if( isNaN(data1) || isNaN(data2) || isNaN(data3)){
        message = 'Values must be a number';
    }
    else if(data1<0 || data2<0 || data3<0){
        message = 'Values must be above or zero';
    }
    else{
        message = '';
        var amount = +data1;
        var roi = +data2;
        var duration = +data3;

        var year=1;
        var openingBalance = 0;
        while (year<=duration){
            var interest = (openingBalance+amount)*roi/100;
            interest = Math.round(interest);

            var closingBalance = openingBalance+amount+interest;
            console.log(year,openingBalance,amount,interest,closingBalance);

            var trTag = document.createElement('tr');
            console.log(trTag , typeof trTag);

            var td1 = document.createElement('td');
            console.log(td1 , typeof td1);
            var td2 = document.createElement('td');
            console.log(td2 , typeof td2);
            var td3 = document.createElement('td');
            console.log(td3 , typeof td3);
            var td4 = document.createElement('td');
            console.log(td4 , typeof td4);
            var td5 = document.createElement('td');
            console.log(td5 , typeof td5);

            td1.innerText = year;
            td2.innerText = openingBalance;
            td3.innerText = amount*year;
            td4.innerText = interest;
            td5.innerText = closingBalance;

            trTag.append(td1);
            trTag.append(td2);
            trTag.append(td3);
            trTag.append(td4);
            trTag.append(td5);
            // document.getElementById('result').innerHTML = trTag;
            document.getElementById('result').append(trTag);
            year++;
            openingBalance = closingBalance;
        }
    }

    document.querySelector('p').innerHTML = message;

    //chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'PPF Graph'
        },
        tooltip: {
            valueSuffix: '%'
        },
   
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: 'Amount',
                        y: amount,
                        color : 'rgb(34 197 94)'
                    },
                    {
                        name: 'Interest Amount',
                        sliced: true,
                        selected: true,
                        y: interest,
                        color : 'rgb(6 95 70)'
                    }
              
                ]
            }
        ]
    });
    
}