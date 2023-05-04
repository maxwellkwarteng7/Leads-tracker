
let my_leads = []  // An empty array to store tabs and inputs 

//dom for all buttons and ul
const inputEl = document.getElementById('input-el')

const ul = document.getElementById('ul')

const saveTab = document.getElementById('savetab-btn')

const inputBtn = document.getElementById('input-btn')

let deleteAll = document.getElementById('delete-all')

deleteAll.style.display = 'none' // setting the delete all button to none when the my_leads array is empty 



    // A dynamic function called render() that renders any array as lists into an  unordered list 
    function render(leads){
      let listItems = " "
      for(let i=0 ; i<leads.length ;i++){
               listItems +=`
                <li> 
                      <a href="${leads[i]}" target="_blank" > 
                         ${leads[i]}
                      </a>
                </li>        
               `
              }
      
              ul.innerHTML = listItems 
              
            //displaying the delete all button when the array is not empty
              if(leads!=null){
                deleteAll.style.display = 'inline';
              }
}


 /* listening for clicks for save tab in chrome to store the active and also current tab pushing them to the my_leads array and storing them in the local storage */
saveTab.addEventListener('click',function(){
      chrome.tabs.query({
            active:true , 
            currentWindow : true 
      } ,  
      function(tabs){
      my_leads.push(tabs[0].url)
      localStorage.setItem('myLeads',JSON.stringify(my_leads))      
      render(my_leads)
      }
      )
      
})


/* listening for clicks for save input , pushing it to the my_leads array and storing it in the local storage of the browser*/
inputBtn.addEventListener('click',function(){
        my_leads.push(inputEl.value) 
        inputEl.value =" "
        localStorage.setItem("myLeads",JSON.stringify(my_leads)) // JSON.stringify to make our array into a string as local storage can only reads strings 
        
        render(my_leads)
})

/*retrieving the data in the local storage back into our javascript code and parsing it back into an array using the JSON.parse()*/
 
 let leadsFromLocalStorage =JSON.parse(localStorage.getItem("myLeads"))
 if(leadsFromLocalStorage!=null ){
      my_leads=  leadsFromLocalStorage
      render(my_leads)
 }
 

 /*listening for clicks for delete all to delete the data inside the local storage and setting the my_leads array to be empty */

deleteAll.addEventListener('dblclick',function(){
       localStorage.clear()
       my_leads =[]
       render(my_leads)      
})
 

  
 