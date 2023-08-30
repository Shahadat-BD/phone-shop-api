const phoneLoad = async (searchText ='13',isShowALL) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    const phones= data.data
    displayData(phones,isShowALL)
}

const displayData = (phone,isShowALL) =>{
    const phoneItem = document.getElementById("container-section")
      phoneItem.textContent = ''
        const showAllbtn = document.getElementById("show-all-button")
        
        if (phone.length > 8 && !isShowALL) {
             showAllbtn.classList.remove("hidden")
        }else{
          showAllbtn.classList.add("hidden")
        }
  
        if (!isShowALL) {
               phone = phone.slice(0,9)
        }
  
      phone.forEach(element => {
          const createDiv = document.createElement("div")
                createDiv.classList = `card bg-base-100 shadow-xl`
          createDiv.innerHTML = `
  
            <figure class="px-10 pt-10">
                    <img src=${element.image} alt="Shoes" class="rounded-xl" />
                  </figure>
                  <div class="card-body items-center text-center">
                    <h2 class="card-title">${element.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                      <button onclick="handleShowDetails('${element.slug}');
                      show_details_modal.showModal()" class="btn btn-primary">Show details</button>
                    </div>
                  </div>
          `
           phoneItem.appendChild(createDiv)
      });
           const showError = document.getElementById("error-message")
           showError.innerText  = ''
      
    loadingShow(false)
   }

// handle show details 

const handleShowDetails = async(id) =>{
    const userIdUrl = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res =  await fetch(userIdUrl) 
    const resData = await res.json()
    const userData = resData.data
         showDetailsData(userData)
}

const showDetailsData = (userId) =>{
     const modalContainer =  document.getElementById("modal-container")

           modalContainer.innerHTML = `
                  <img src=${userId.image} alt="" srcset="">
                <h3 class="font-bold text-lg"> ${userId.name}</h3>
                <p class='font-bold'>storage : <span class='text-gray-500 font-normal'> ${userId.mainFeatures?.storage ? userId.mainFeatures.storage :"No storage added for this mobile"}</span> </p>
                <p class='font-bold'>display size : <span class='text-gray-500 font-normal'>  ${userId.mainFeatures?.displaySize ? userId.mainFeatures.displaySize :"No display size added for this mobile"} </span> </p>
                <p class='font-bold'>chipSet : <span class='text-gray-500 font-normal'>   ${userId.mainFeatures?.chipSet ? userId.mainFeatures.chipSet :"No chipSet added for this mobile" } </span></p>
                <p class='font-bold'>memory : <span class='text-gray-500 font-normal'> ${userId.mainFeatures?.memory ? userId.mainFeatures.memory :"No memory added for this mobile" } </span>  </p>
               <p class='font-bold'>slug : <span class='text-gray-500 font-normal'>${userId?.slug ? userId.slug :"No slug added for this mobile" }</span>   </p>
                <p class='font-bold'>release Date : <span class='text-gray-500 font-normal'> ${userId?.releaseDate ? userId.releaseDate :"No release date added for this mobile" } </span></p>
                <p class='font-bold'>brand :<span class='text-gray-500 font-normal'> ${userId?.brand ? userId.brand:"No brand added for this mobile" }  </span>  </p>
                <p class='font-bold'> GPS : <span class='text-gray-500 font-normal'>  ${userId.others?.GPS ? userId.others.GPS :"No GPS added for this mobile" } </span>  </p>
                
           `

}

const handleSearchBtn = (isShowALL) =>{
    const inputField = document.getElementById("search-filed")
    const searchValue = inputField.value
    if (inputField.value == '') {
        const showError = document.getElementById("error-message")
           showError.innerText  = 'please search your phone'
    
    }else{
        phoneLoad(searchValue,isShowALL)
        loadingShow(true)
        const showError = document.getElementById("error-message")
           showError.innerText  = ''
    }
}

const loadingShow = (isLoading) =>{
    const loading  = document.getElementById("loading")
    if (isLoading) {
        loading.classList.remove("hidden")
    }else{
        loading.classList.add("hidden")
    }
}

// Show all phone

const handleShowAll = () =>{
    handleSearchBtn(true)
}

phoneLoad()

