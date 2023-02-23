
var chart
chart=courbe() 

function getValue(){
    var inputValue = graphSelect.value;
    selectChar(inputValue)
}

function selectChar(inputValue){
    if(chart){
        console.log("created")
        destroy(chart) //detruire le graph
    }
    if(inputValue=="colonne"){
        
        chart=colonne()
    }
    if(inputValue=="camembert"){
        
        chart=circle()
    }
    if(inputValue=="courbe"){
        chart=courbe()
    }
}

function destroy(chart){
    chart.clear() 
    chart.destroy() 
    
}









function colonne(){
    
        
    
    

    var chart=new Chart(canvas, donneeBar={
        type: 'bar',
        data: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019'],
        datasets: [{
            label: "nombre d'accidents",
            data: [1200, 1900, 3000, 500, 2000, 3000],
            borderWidth: 1,
            borderColor: '#fff',
            barThickness:60,
            hoverBackgroundColor:"#0f0",
            backgroundColor:	"#89CFF0"    
        }]
        },
        options: {
            plugins:{
                title:{
                    text:"le nombre d'accdients par année",
                    display:true,
                    color:"#000",
                    font:{
                        size:20,
                    }
                },
                legend:{
                    labels:{
                        color:"#000",
                        font:{
                            size:15
                        }
                    }
                }
            },
            elements:{
                point:{
                    //radius:
        
                }
            },
            layout: {
                padding:{
                    
                }
            },
        
        scales: {
            y: {
            beginAtZero: true,
            suggestedMin: 0,
                suggestedMax: 5000,
                title:{
                    display:true,
                    text:"le nombre d'accdient",
                    color:"#000",
                    font:{
                        size:20,
                        
                    }
                }
                    
        
            },
            x:{
                beginAtZero: true,
                title:{
                    display:true,
                    text:"les années",
                    align:"center",
                    color:"#000",
                    font:{
                        size:15,
                        
                    }
                }
        
            }
        },
        animation:{
            duration:500,
            text:"le nombre d'accident par année",
        }
        
        
        }
        });
        
    return chart
    }



function circle(){
   



    var chart=new Chart(canvas, donneeCercle={
    type: 'doughnut',
    data: {
    labels: ['Homme','Femme'],
    datasets: [{
        label: "nombre d'accidents",
        data: [30000,20000],
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: [
        'rgb(0, 255, 255)',
    '#FFC0CB',
    ],
    }]
    },
    options: {
        radius: [120, 150],
        responsive:true,
        maintainAspectRatio:true,
        plugins: {
            title:{
                text:"repartition des accidents par sex",
                display:true,
                color:"#000",
                font:{
                    size:20,
                }
            },
            legend:{
                labels:{
                    color:"#000",
                    font:{
                        size:15
                    }
                }
            }


        },
        layout: {
            padding:{
                left:0
            }
        },
    animation:{
        duration:500
    }

    
    
    
    }
    });
    
    return chart
}

function courbe(){
    
    var chart =new Chart(canvas, {
        // Chart configuration options
        type: 'line',
        data: {
            labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018,2019],
            datasets: [{
                label: "nombre d'accident par année",
                data: [2000,3000,4000,1500,1000,500,1500,1800],
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "nombre d'accident par année",
                    color:"#000",
                    font:{
                        size:20
                    }
                },
                legend:{
                    labels:{
                        color:"#000",
                        font:{
                            size:15
                        }
                    }
                }
            }
        } 

        
    });
    return chart
}


   
        

