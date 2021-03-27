{
  'use strict';
  
  const select = {
    templateOf: {
      templateBook: '#template-book'
    },
    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
    },
    class: {
      favourite: 'favorite',
    },
  };  

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const templateOfBooks = [];
  const favoriteBook = [];
  

  const render = function() {
   
    for(let book of dataSource.books){
 
      const generatedHTML = templates.booksList(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(generatedDOM);
      templateOfBooks.push(generatedDOM);
    }
  };

  const initActions = function(){

    
    const booksContainer = document.querySelector(select.containerOf.booksList);
    booksContainer.addEventListener('dblclick', function(event){
      
    event.preventDefault();
    const clickedElement = event.target.offsetParent;
    
    if(clickedElement.classList.contains('book__image')){      
            let id = clickedElement.getAttribute('data-id');
  
             if(!clickedElement.classList.contains(select.class.favourite)){
               clickedElement.classList.add(select.class.favourite);
               favoriteBook.push(id);

             } else {
               clickedElement.classList.remove(select.class.favourite);
               favoriteBook.splice(favoriteBook.indexOf(id), 1);
             }
           }
         });
       };

  render();
  initActions();
  console.log('favoriteBook:', favoriteBook);
}
