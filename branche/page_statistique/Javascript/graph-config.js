
// des configuration de graphs peuvent sevir pour mieux afficher les graphs

var configLine={   //une configuration par default pour representer le nombre d'accident par année
    type: 'line',
   
    data: {
        labels:[],
        datasets: [{
            label: "nombre d'accident par année",
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            fill: false,
            data:[],
        }]
    },
    options: {
        
        maintainAspectRatio: false,
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

