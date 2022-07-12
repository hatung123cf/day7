const data=[]
function book(){
    const item_id = document.getElementById('id').value
    const item_author = document.getElementById('author').value
    const item_name = document.getElementById('name').value
    const item_number = document.getElementById('number').value
    
    const item = {
        Id: item_id,
        Author: item_author,
        Name: item_name,
        Number: item_number
    }


    let index =data.findIndex((c)=>c.Id==item.Id)
    if(index>=0){
        data.splice(index,1,item)
    } else {
        data.push(item)
    }
    render()
    clear()
}

function render(){
    table = `<tr>
                <th>Id</th>
                <th>Author</th>
                <th>Name</th>
                <th>Number of pages</th>
                <th>Action</th>
            </tr>`
    for(let i=0;i<data.length;i++){
    table += `<tr>
                <th>${data[i].Id}</th>
                <th>${data[i].Author}</th>
                <th>${data[i].Name}</th>
                <th>${data[i].Number}</th>
                <th> <button onclick="deletaItem(${data[i].Id})">Delete </button></th>
                <th> <button onclick="EditItem(${data[i].Id})">Edit </button></th>
            </tr>`   
    }  
    document.getElementById('render').innerHTML=table    
}

function clear(){
    document.getElementById('id').value="";
    document.getElementById('author').value="";
    document.getElementById('name').value="";
    document.getElementById('number').value=""
}

function deletaItem(x){
    for(let i=0;i<data.length;i++){
        if(data[i].Id==x){
            data.splice(i,1)

            render()
        }
    }
}

function EditItem(x){
    for(let i=0;i<data.length;i++){
        if(data[i].Id==x){
            document.getElementById('id').value=data[i].Id;
            document.getElementById('author').value=data[i].Author;
            document.getElementById('name').value=data[i].Name;
            document.getElementById('number').value=data[i].Number;
            render()
        }
    }
}