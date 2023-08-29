const loadPhone= async(searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones =  data.data
    displayPhones(phones,isShowAll)
}


    //handler Search
    const handleSearch = (isShowAll) =>{
        toggleLoadingSpinner(true);
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
       // console.log(searchText)
        loadPhone(searchText,isShowAll);
    }

    const toggleLoadingSpinner = (isLoading) =>{
       const loadingSpinner = document.getElementById('loading-spinner');
        if(isLoading)
        {
            loadingSpinner.classList.remove('hidden')
        }
        else{
            loadingSpinner.classList.add('hidden')
        }
    }

const displayPhones = (phones,isShowAll) =>{
   // console.log(phones)

    const phoneContainer = document.getElementById('phone-container')


    //clear container cards  before adding new cards
    phoneContainer.textContent=''


    //show more button if there are more than 9 phone
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    //console.log("Is SHOW ALL",isShowAll)
    //display first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        // //2. create div
        const phoneCard = document.createElement('div')
        phoneCard.classList =`card p-4 bg-gray-200 shadow-xl`;

        //3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary ">Show Detail</button>
          </div>
        </div>`
        //4. appendChild
        phoneContainer.appendChild(phoneCard)
    });


    //hide loading spinner
    toggleLoadingSpinner(false)

}


const handleShowDetail=async(id)=>{
    //console.log("ID:",id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone=data.data
    showPhoneDetails(phone)
}

//Show phone detail
const showPhoneDetails=(phone)=>{
    //display modal
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText= phone.name
    const showDetailContainer= document.getElementById('show-detail-container')
    showDetailContainer.innerHTML= `
    <div class="detail_image rounded-md flex  justify-center"><img class="rounded-lg" src="${phone.image}"/></div>
    <div class="p-4">
    <h4><span>Brand: </span>${phone.brand}</h4>
    <p><span>Storage:  </span>${phone.mainFeatures.storage}</p>
    <p><span>Display Size:  </span>${phone.mainFeatures.displaySize}</p>
    <p><span>ChipSet:  </span>${phone.mainFeatures.chipSet}</p>
    <p><span>Release Date:  </span>${phone.mainFeatures.releaseDate}</p> 
    </div>
    
    `
    console.log(phone)
    show_details_modal.showModal()
}



//handle show all
const handleShowAll =()=>{
    handleSearch(true);
}


