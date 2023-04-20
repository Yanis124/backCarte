function displaydata(data){
    if (typeof data !== 'string') {
        return data;
    }
    var arr = data.split(','); // split the string by comma delimiter
    if(arr.length>3){
        var fourth = arr.slice(0, 3);
        var leftArr=arr.slice(3,arr.length)
        var result=""
        fourth.forEach(element => {
            result+=element+","
        });
        result+=" "
        leftArr.forEach(element=>{
            result+=element+","            
        })

        return result
        
    }

    else{
        return data
    }  
}
module.exports = displaydata