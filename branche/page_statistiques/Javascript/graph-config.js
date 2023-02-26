
// des configuration de graphs peuvent sevir pour mieux afficher les graphs

var configLine={   //une configuration par default pour representer le nombre d'accident par année
    type: 'line',
   
    data: {
        datasets: [{
            label: "nombre d'accident par année",
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
        },
        scales:{
            y:{
                beginAtZero:true,
               
            },
            x:{
                beginAtZero:true,
               
            },
            

        }
    }
} 

var configCircle={
    type: 'pie',
    data: {
    //labels: label[1],
    datasets: [{
        label: "nombre d'accidents",
        //data: data[1],
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: [
        'rgb(0, 255, 255)',
    '#FFC0CB',
    ],
    }]
    },
    options: {
        radius: [150, 150],
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
    }

var configColonne={
    type: 'bar',
    data: {
    //labels: label[0],
    datasets: [{
        label: "nombre d'accidents",
        //data: data[0],
        borderWidth: 1,
        borderColor: '#fff',
        barThickness:20,
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
    
        }
    },
    animation:{
        duration:500,
        text:"le nombre d'accident par année",
    }
    
    
    }
