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
    
    for(let book of templateOfBooks){
      let covers = book.querySelector('.book__image');
      console.log('covers:', covers);
      
      covers.addEventListener('dblclick', function(event){
        event.preventDefault();
        covers.classList.add(select.class.favourite);
        const id = covers.getAttribute('data-id');
        favoriteBook.push(id);    
      });
    }
  }
   
  render();
  initActions();
  console.log('favoriteBook:', favoriteBook);

  
}
