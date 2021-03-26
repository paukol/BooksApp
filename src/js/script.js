{
    'use strict';
  
    const select = {
      templateOf: {
        templateBook: '#template-book'
      },
      containerOf: {
        booksList: '.books-list'
      }
    };
    
    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
      };
    
    const render = function() {
    const thisBooksList = this; 


    for(let book of dataSource.books){
      
          const generatedHTML = templates.booksList(book);
          thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
          const booksContainer = document.querySelector(select.containerOf.booksList);
          booksContainer.appendChild(thisBooksList.element);
      }
    }
    render();

    
}


