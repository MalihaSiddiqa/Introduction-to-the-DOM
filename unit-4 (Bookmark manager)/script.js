//Selecting Elements.
const form = document.getElementById("bookmarkForm");
const bookmarksList = document.getElementById("bookmarksList");
const filterButtons=document.querySelectorAll(".filter-btn");
//Step:4 default application settings
const DEFAULT_SETTINGS=Object.freeze({
    storageKey:"bookmarksData",
    categories:["Work","Study","Entertainment"],
    defaultCategory:"Work"
});

let bookmarks = [];
let currentFilter="All";

function addBookMark(e) {
    e.preventDefault();
    const websiteTitle = document.getElementById("websiteTitle").value.trim();
    const websiteUrl = document.getElementById("websiteUrl").value.trim();
    const category = document.getElementById("category").value;
    if(!websiteTitle||!websiteUrl){
        alert("Please fill all fields");
        return;
    }
    if(!websiteUrl.startsWith("http")){
        websiteUrl="https://"+websiteUrl;
    }

    const newBookmark = {
        id: Date.now(),
        title: websiteTitle,
        url: websiteUrl,
        category: category
    };
    bookmarks.push(newBookmark);
    saveBookmarks();
    renderBookmarks();
    form.reset();
}
function renderBookmarks() {
    const filteredBookmarks=filterBookmarks(currentFilter);
    bookmarksList.innerHTML = "";
    if (filteredBookmarks.length === 0) {
        bookmarksList.innerHTML = "<p>No bookmarks found</p>"
        return;
    }
    filteredBookmarks.forEach(function (bookmark) {
        const id = bookmark.id;
        const title = bookmark.title;
        const url = bookmark.url;
        const category = bookmark.category;
        //creating div element
        const bookmarkElement = document.createElement("div");
        bookmarkElement.classList.add("bookmark-item");
        //div child
        const bookmarkInfo = document.createElement("div");
        bookmarkInfo.classList.add("bookmark-Info");
        bookmarkElement.appendChild(bookmarkInfo);
        //bookmark title
        const heading =document.createElement("h3");
        heading.textContent = title;
        bookmarkInfo.appendChild(heading);
        //bookmark url
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = url;
        bookmarkInfo.appendChild(anchor);
        //bookmark category
        const bookmarkCategory = document.createElement("div");
        bookmarkCategory.textContent = category;
        bookmarkCategory.classList.add("bookmark-category");
        bookmarkInfo.appendChild(bookmarkCategory);
        //delete button
        const delbtn = document.createElement("button");
        delbtn.textContent = "Delete";
        delbtn.setAttribute("data-id", "id");
        bookmarkElement.appendChild(delbtn);
         delbtn.addEventListener("click",()=> {
          deleteBookmark(id);
         })

        bookmarksList.appendChild(bookmarkElement);
    }

    )

};
form.addEventListener("submit", addBookMark);

//step 2:Filter the bookmarks According to the category
function filterBookmarks(categoryFilter) {
    if (categoryFilter === "All") {
       return bookmarks;
    }
    const matchingBookmarks=[];
    bookmarks.forEach(function(bookmark){
    if (bookmark.category === categoryFilter) {
        matchingBookmarks.push(bookmark);
    }
    });
        return matchingBookmarks;

}
//Init function
function init() {
    loadBookmarks();
    renderBookmarks();
    filterButtons.forEach(function(filterButton){
      filterButton.addEventListener("click",()=>{
        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        })
        filterButton.classList.add("active");
        currentFilter=filterButton.dataset.category;
        renderBookmarks();
      });
    });
}
document.addEventListener("DOMContentLoaded",init);

//Step:3 Add Delete functionally to each bookmark card

function deleteBookmark(id) {
   bookmarks=bookmarks.filter(function(bookmark){
    return bookmark.id !== id;
   });
   saveBookmarks();
    renderBookmarks();
}

//Step:5 Save bookmarks in the browser using localStorage.

function saveBookmarks() {
    const jsonString=JSON.stringify(bookmarks);
    localStorage.setItem(DEFAULT_SETTINGS.storageKey,jsonString);
}
function loadBookmarks() {
    const storage=localStorage.getItem(DEFAULT_SETTINGS.storageKey);
if(storage){
   bookmarks=JSON.parse(storage);
}
else{
    bookmarks=[];
}
}

//completed.
