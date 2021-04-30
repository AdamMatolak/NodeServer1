function complete(id){
    $.ajax({
        url:"http://localhost:3000/task/done?_id="+id,
        type: "put",
        
        statusCode:{
            200: (result) => {
                location.reload();
            },
            
            400: (err) => {
                
            },
            404: (err) => {
                console.log('Not found');
            }
        }
    })
}
//$(document).ready( () => {} );
// skratene
$(()=>{
    $.ajax({
        url:"http://localhost:3000/task",
        type: "get",
        
        statusCode:{
            200: (result) => {
                //console.log(result);
                for(var index in result){
                    const id = result[index]._id;
                    const name = result[index].name;
                    const priority = result[index].priority;
                    const date = result[index].date;
                    const done = result[index].done;
                    const price = result[index].price;
                    let text = "<b>" + name + "</b>" + " (" + date + ") <br>";
                    text = text +  "Priority: " + priority + " <br>";
                    if(price >= 0){
                        text = text + " Price: " + price + " <br>";
                    }
                    text = text + "Done: " + done;
                    if(done!=true){
                        text = text + "<button onClick=\'complete(\""+id+"\")'\ id='cmpltbtn'>Complete</button>";
                    }
                    
                    //var newElement = $("<div></div>").text(text);
                    //var elementBr = $("<br/>");

                    $("#mainContainer").append("<div class='container3'>" +"<div class='container4'>" + text + "</div>" + "</div>");
                    // if(done=="false"){
                    //     $(".container3").append("<button id='donebtn'>" + "Done" + "</buton>");
                        
                    // }
                }   
            },
            400: (err) => {
                console.log('Bad request');
            },
            404: (err) => {
                console.log('Not found');
            }
        }
    })
})