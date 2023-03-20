//la creation du graph , modifier son style,type... ,modifier ses données



color_bar=["#003f5c"]
color_pie=["#003f5c","#f95d6a","#2f4b7c","#665191","#a05195","#d45087","#ff7c43","#ffa600"]

var titlesExemple=["nombre d'accident par année","nombre d'accident par région","nombre d'accicent par département","nombre d'accident par conditions métérologique","nombre d'accident par sexe","nombre d'accident par année de naisance","nombre d'accident par gravité de l'accident","nombre d'accident jour/nuit"] //titre des graphs (exemple par default)


const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

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
            customCanvasBackgroundColor: {
                color: '#f5f5f5',
            },
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
    },
    plugins: [plugin],
} 

function updateTitles(){  //mettre a jour le titre du graph 
    titles=[]
    for(var i=0;i<titlesExemple.length;i++){
        titles[i]=titlesExemple[i]
    }
    if(inputAnneeGraph && inputAnneeGraph!="toutes-les-annees"){ //ajouter l'année 
        for(var i=0;i<titlesExemple.length;i++){
            titles[i]=titles[i]+" "+inputAnneeGraph
        }
    }
    if(inputLieu && inputLieu!="tous-les-lieus"){ //ajouter l'année 
        for(var i=0;i<titlesExemple.length;i++){
            titles[i]=titles[i]+" "+inputLieu
        }
    }
    
}



function selectData(n_data,n_label){  //mettre a jour les données du graph

    
    // console.log(datas)
    chart.data.labels=label[n_label-1]
    chart.data.datasets[0].data=datas[n_data-1]
    chart.options.plugins.title.text=titles[n_label-1]
    chart.update()
    

}

function selectColonne(inputChart){ //changer  le type de graph
    
    if(inputChart=="colonne" || typeChart=="colonne"){ //type de graph par defaut ou changer le type des graph par le filtre colonne
        
        chart.config.type="bar"  //mettre a jour le type de graph
        chart.options.scales.x.display=true
        chart.options.scales.y.display=true
        chart.data.datasets[0].backgroundColor=color_bar
        chart.update() 

        if(!typeChart){  // on change l'afichage du filtre colonne si l'utilisateur n'a pas utiliser le filtre colonne 
            colonneSelect[0].innerHTML="colonne"
            colonneSelect[1].innerHTML="courbe"
            colonneSelect[2].innerHTML="camembert"
            colonneSelect[0].value="colonne"
            colonneSelect[1].value="courbe"
            colonneSelect[2].value="camembert"
        }

    }

    else if(inputChart=="camembert" || typeChart=="camembert"){
        
        chart.config.type="pie"
        chart.options.scales.x.display=false
        chart.options.scales.y.display=false
        chart.data.datasets[0].backgroundColor=color_pie
        chart.update()
        if(!typeChart){
            colonneSelect[0].innerHTML="camembert"
            colonneSelect[1].innerHTML="colonne"
            colonneSelect[2].innerHTML="courbe"
            colonneSelect[0].value="camembert"
            colonneSelect[1].value="colonne"
            colonneSelect[2].value="courbe"
        }
  
    }

    else if(inputChart=="courbe" || typeChart=="courbe"){ 
        //chart=courbe()
        chart.config.type="line"
        chart.options.scales.x.display=true
        chart.options.scales.y.display=true
        chart.data.datasets[0].borderColor='rgb(255, 99, 132)'
        chart.data.datasets[0].backgroundColor='rgb(255, 200, 200)'
        chart.update()
        if(!typeChart){
            colonneSelect[0].innerHTML="courbe"
            colonneSelect[1].innerHTML="camembert"
            colonneSelect[2].innerHTML="colonne"
            colonneSelect[0].value="courbe"
            colonneSelect[1].value="camembert"
            colonneSelect[2].value="colonne"
        }
    }

    
    
}

function courbe(){  //generer la courbe avec les données de années
    var chart =new Chart(canvas, configLine);
    chart.data.labels=label[0]
    chart.data.datasets[0].data=datas[0]
    chart.update()
    return chart
}

