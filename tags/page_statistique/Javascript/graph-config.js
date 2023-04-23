//the creation of the graph , modify his style, his type... ,modify his datas
hover_effect="0.7"

bg_color=["rgb(255,255,255)"]
text_color=["rgb(0,0,0)"]

color_bar=['rgb(0, 63, 92)']
color_bar_hover=[`rgb(0,63,92,${hover_effect})`]

border_color_line=['rgb(255, 99, 132)']
color_line=['rgb(255, 200, 200)']
color_line_hover=[`rgb(255, 99, 132,${hover_effect})`]

color_pie=["rgb(0, 63, 92)","rgb(249, 93, 106)","rgb(47, 75, 124)","rgb(102, 81, 145)","rgb(160, 81, 149)","rgb(212, 80, 135)","rgb(255, 124, 67)","rgb(255, 166, 0)"]
color_pie_hover=[`rgb(0, 63, 92,${hover_effect})`,`rgb(249, 93, 106,${hover_effect})`,`rgb(47, 75, 124,${hover_effect})`,`rgb(102, 81, 145,${hover_effect})`,`rgb(160, 81, 149,${hover_effect})`,`rgb(212, 80, 135,${hover_effect})`,`rgb(255, 124, 67,${hover_effect})`,`rgb(255, 166, 0,${hover_effect})`]
border_color_bar_pie=["rgb(255,255,255)"]


var facets=["datetime","reg_name","dep_name","atm","sexe","an_nais","grav","lum"]



var titlesExemple=["Nombre d'Accidents par Année ","Nombre d'Accidents par Région ","Nombre d'Accidents par Département ","Nombre d'Accidents d'après la Condition Météorologique ","Nombre de Personnes Accidentées par Sexe ","Nombre de Personnes Accidentées par Tranche d'Âge ","Nombre de Personnes Accidentées d'après la Gravité de l'Accident ","Nombre d'Accidents de Jour/Nuit "] //graphs titles

var titles=[]

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

var configLine={   //a default configuration to represent the number of accidents by year
    type: 'bar',
    data: {
        labels:[],
        datasets: [{
            label: "Nombre d'Accidents par Année",
            borderColor: border_color_line,
            borderWidth: 1,
            fill: false,
            data:[],
            
        }]
    },
    options: {
        
        maintainAspectRatio: false,
        plugins: {
            customCanvasBackgroundColor: {
                color: bg_color,
            },
            title: {
                display: true,
                text: "Nombre d'Accidents par Année",
                color:text_color,
                font:{
                    size:15
                }
            },
            legend:{
                labels:{
                    color:text_color,
                    font:{
                        size:15
                    }
                }
            },
            datalabels: {
                anchor: 'center',
                align: 'end',
                backgroundColor: null,
                borderColor: null,
                borderRadius: 4,
                borderWidth: 1,
                color: '#fff',
                font: function(context) {
                  var width = context.chart.width;
                  var size = Math.round(width / 40);
                   return {
                     size: size,
                    weight: 600
                  };
                },
                offset: 4,
                padding: 20,
                formatter: function(value) {
                   return Math.round(value * 10) / 10
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
        },
    },
    plugins:[]
} 

Chart.register(plugin,ChartDataLabels);


function updateTitles(){  //Update the graphs titles
    titles=[]
    for(var i=0;i<facets.length;i++){
        if(inputValueX==facets[i]){
            titles[0]=titlesExemple[i]
        }
    }

    if(inputLieu && inputLieu!="tous-les-lieux"){
        titles[0]+=inputLieu+" "
        if(!inputAnneeGraph || inputAnneeGraph=="toutes-les-annees"){
            titles[0]+=listAnneeLieu[0].name+"-"+listAnneeLieu[listAnneeLieu.length-1].name
        }
    }
    else{
        titles[0]+="en France "
    }

    if(inputAnneeGraph && inputAnneeGraph!="toutes-les-annees"){
        titles[0]+=inputAnneeGraph+" "

    }

}



function selectData(){  //Update the graphs datas

    chart.data.labels=label
    chart.data.datasets[0].data=datas
    chart.options.plugins.title.text=titles
    chart.update()
    

}

function selectColonne(inputChart){ //Change the type of graphs
    
    if(inputChart=="colonne" || typeChart=="colonne"){ //Type of graphs by default or choose the type "colonne"
        
        configColonne() 

        if(!typeChart){  // We change the filter "colonne" display if the user didn't choose it
            colonneSelect[0].innerHTML="Colonne"
            colonneSelect[1].innerHTML="Courbe"
            colonneSelect[2].innerHTML="Camembert"
            colonneSelect[0].value="colonne"
            colonneSelect[1].value="courbe"
            colonneSelect[2].value="camembert"
        }

    }

    else if(inputChart=="camembert" || typeChart=="camembert"){
        
        configCamembert()
        if(!typeChart){
            colonneSelect[0].innerHTML="Camembert"
            colonneSelect[1].innerHTML="Colonne"
            colonneSelect[2].innerHTML="Courbe"
            colonneSelect[0].value="camembert"
            colonneSelect[1].value="colonne"
            colonneSelect[2].value="courbe"
        }
  
    }

    else if(inputChart=="courbe" || typeChart=="courbe"){ 

        configCourbe()
        if(!typeChart){
            colonneSelect[0].innerHTML="Courbe"
            colonneSelect[1].innerHTML="Camembert"
            colonneSelect[2].innerHTML="Colonne"
            colonneSelect[0].value="courbe"
            colonneSelect[1].value="camembert"
            colonneSelect[2].value="colonne"
        }
    }

    
    
}

function configCamembert(){   // The configuration of each graph type
    chart.config.type="pie"
    chart.options.scales.x.display=false
    chart.options.scales.y.display=false
    chart.data.datasets[0].backgroundColor=color_pie
    chart.data.datasets[0].borderColor=border_color_bar_pie
    chart.data.datasets[0].hoverBackgroundColor=color_pie_hover
    Chart.register(ChartDataLabels);
    
    
    
    chart.update()    
}

function configColonne(){
   

    chart.config.type="bar"  //Update graph type
    chart.options.scales.x.display=true
    chart.options.scales.y.display=true
    chart.data.datasets[0].backgroundColor=color_bar
    chart.data.datasets[0].borderColor=border_color_bar_pie
    chart.data.datasets[0].hoverBackgroundColor=color_bar_hover
    Chart.unregister(ChartDataLabels);
        
    
    chart.update() 
    
}

function configCourbe(){
    chart.config.type="line"
    chart.options.scales.x.display=true
    chart.options.scales.y.display=true
    chart.data.datasets[0].borderColor=border_color_line
    chart.data.datasets[0].backgroundColor=color_line
    chart.data.datasets[0].hoverBackgroundColor=color_line_hover
    chart.data.datasets[0].pointHoverRadius=6
    Chart.unregister(ChartDataLabels);
    chart.update()
}

function courbe(){  //Generate the courb with years datas
    var chart =new Chart(canvas, configLine);
    chart.data.labels=label[0]
    chart.data.datasets[0].data=datas[0]
    chart.update()
    return chart
}
