
document.addEventListener('DOMContentLoaded',()=>{  
    function render_element(task){
        let element=document.createElement('div');
        element.classList.add('flex','p-2','bg-gray-600','rounded-2xl','gap-2','max-w-80','w-full','sm:max-w-2xl','sm:w-full');
        element.id='task'
        element.setAttribute('element_id',task['id'])
        let element_inner_val=`
            <form class="flex w-full gap-4" >
                <input class="checkbox" type="checkbox">
                <input value="${task['task_val']}" disabled class="task_val w-full border-none outline-none text-white font-semibold bg-gray-600" placeholder="Enter value" type="text">
            </form>
    
            <button  class=" edit font-bold border p-1 rounded-md cursor-pointer hover:ring-2 hover:ring-blue-950 hover:bg-gray-700 hover:text-white  bg-slate-900 ">Edit</button>
    
            <button  class=" delete font-bold border p-1 rounded-md cursor-pointer hover:ring-2 hover:ring-blue-950 hover:bg-gray-700 hover:text-white  bg-slate-900 ">Delete</button>
            `
        element.innerHTML=element_inner_val

        let task_val = element.querySelector('.task_val');
        let edit_btn = element.querySelector('.edit');
        let delete_btn = element.querySelector('.delete');
        let task_check=element.querySelector('.checkbox');
        console.log(task_check);
        if(task.finished){
            task_val.classList.toggle('task_finished')
            edit_btn.classList.toggle('task_finished')
            task_check.setAttribute('checked','')
            edit_btn.setAttribute('disabled',"")
        }
        task_check.addEventListener('click',function(){
            task_val.classList.toggle('task_finished')
            edit_btn.classList.toggle('task_finished')
            edit_btn.setAttribute('disabled',"");
            task.finished=!task.finished;
            set_local_storage(tasks);

        })
        edit_btn.addEventListener('click',()=>{
           
                if (edit_btn.innerText === 'Edit') {
                    edit_btn.innerText = 'Save';
                    task_val.removeAttribute('disabled');
                    console.log('i am inside the edit button');
                    task_val.focus();
                    const length = task_val.value.length;
                    task_val.setSelectionRange(length, length); // "this thing selects the content after the value"
                    console.log('this is finished');
                } else if (edit_btn.innerText === 'Save') {
                    edit_btn.innerText = 'Edit';
                    task_val.setAttribute('disabled', '');
                    task.task_val=task_val.value;
                    set_local_storage(tasks);
                }
            })
        
    
        delete_btn.addEventListener('click',function()  {
            let id_value=task.id
            console.log(id_value)
            console.log(`id's inside the tasks `) 
            tasks.forEach(ele => {
               console.log(ele.id); 
            })
            tasks.filter((t)=> t['id']!==id_value)
            let new_tasks=[];
            tasks.forEach(tasks_element => {
                if(tasks_element["id"]!==id_value){
                    new_tasks.push(tasks_element)
                }
            });
            tasks=new_tasks
            
            console.log(tasks);
            set_local_storage(tasks);
            element.remove();
        });

        document.querySelector("#task_section").append(element);
        
        
        // element.addEventListener("click",(event)=>{
        //     event.stopPropagation();
        //     console.log(event.target);
        //     if(event.target===null){
        //         task_val.classList.toggle('task_finished')
        //     }
            
        // }) 
        
    }
    
    function set_local_storage(tasks){
        
        console.log('inside local storage');
        
        localStorage.setItem("task_list",JSON.stringify(tasks))
        
    }

    let input_val=document.querySelector('#input_val');
    let input_form=document.querySelector('#input_form')
    let add_task=document.querySelector('#add_task')
    let tasks=JSON.parse(localStorage.getItem("task_list")) || [];
    console.log(tasks);
    if(tasks.length!=0){
        tasks.forEach(element => {
            render_element(element);
        });
    }
    add_task.disabled=true;
    input_val.addEventListener('keydown',()=>{
        add_task.disabled=false;
    })
    input_form.addEventListener('submit',(event)=>{
        
        event.preventDefault();
        let task_element={
            task_val:`${input_val.value}`,
            id:Date.now(),
            finished:false
    }    

        if(input_val.value.length===0 ) return;
        tasks.push(task_element);
        render_element(task_element)
        set_local_storage(tasks)
        input_val.value='';
    })
})