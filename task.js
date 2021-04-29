//$(document).ready( () => {} );
// skratene
$(()=>{
    console.log("Hello, your page is ready")
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
                    let text = name + " (" + date + ") <br>";
                    text = text +  "Priority: " + priority + " <br>";
                    if(price >= 0){
                        text = text + " Price: " + price + " <br>";
                    }
                    text = text + "Done: " + done;
                    
                    console.log(text);
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