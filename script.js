const modalContainer = document.getElementById("modalContainer");
const modal = document.getElementById("modal");
const addToBookmark = document.getElementById("modalHandler");
const submit = document.getElementById("submit");
const websiteName = document.getElementById("websiteName");
const websiteUrl = document.getElementById("websiteUrl");
const formLAndF = document.getElementById("formLAbelAndField");
const itemContainer = document.getElementById("itemContainer");
const bookmarkForm = document.getElementById("bookmarkId");
const form = document.querySelector('form');


let bookmarks = [];




  function showModal() {
    modalContainer.classList.add("show");
    websiteName.focus();
  }
  
  
function validate(nameValue,urlValue){
  const ex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(ex);
  if (nameValue === "" || urlValue === "") {
    alert("input field required");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("please enter right url");
    return false
  }
  return true;
}
// }

function settinglocalStorage(){

    if(localStorage.getItem("bookmarks")){
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}
      else{
          bookmarks = [
              {

                name: "usama",
                url: "hello.com",
              },
            ];
                localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        //     itemContainer.innerHTML  = " ";
          }
         buildBookmarks();
         
  }

  function submittingForm(e) {
    e.preventDefault();
    let nameValue = websiteName.value;
    let urlValue = websiteUrl.value;

    if (!urlValue.includes("http", "https")) {
        urlValue = `https://${urlValue}`;
    } 
   if(!validate(nameValue,urlValue)){
       return false;
   }
  const bookmark = { 
    name: nameValue,
    url: urlValue,
  
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  settinglocalStorage();
  form.reset();
  websiteName.focus(); 
  }

function buildBookmarks(){
    itemContainer.textContent = '';
    bookmarks.forEach((bookmark)=> { 
        const {name,url} = bookmark;
        const itemName = document.createElement('div');
        itemName.classList.add("itemName");        
    const i = document.createElement('i');
    i.setAttribute('class','fa-solid fa-trash up');
    i.setAttribute('onclick',`deleteitem('${url}')`);
    const Name = document.createElement('div');
    const image = document.createElement('img');
    console.log(image);
    image.src =`https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
    const a = document.createElement('a');
    a.href = `${url}`;
    a.setAttribute('target','_blank');
    a.textContent = `${name}`;
    Name.append(image,a);
    itemName.append(i,Name);
    itemContainer.appendChild(itemName); 
      });
    }


function deleteitem(url){
console.log('delete',url);
  bookmarks.forEach((bookmark,i)=>{
        if(bookmark.url === url){
          bookmarks.splice(i,1);
        }
});
 localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 settinglocalStorage();
}


addToBookmark.addEventListener("click", showModal);
window.addEventListener("click", (e) =>
  e.target === modalContainer ? modalContainer.classList.remove("show") : false
);
xmark.addEventListener("click", () => modalContainer.classList.remove("show"));
form.addEventListener('submit', submittingForm);


settinglocalStorage();