{
  'use strict';
  
  const select = {
    templateOf: {
      templateBook: '#template-book'
    },
    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
      
    },
    class: {
      favourite: 'favorite',
      checked: 'checked',
      hidden: 'hidden',
    },
  };  

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const templateOfBooks = [];
  const favoriteBook = [];
  const filters = [];
  const booksContainer = document.querySelector(select.containerOf.booksList);
  const filteredBooks = document.querySelector(select.containerOf.filters);


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

    filteredBooks.addEventListener('change', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
        }else{
          const filtersIndex = filters.indexOf(clickedElement.value);
          filters.splice(filtersIndex, 1);
        }
      }
      filterBooks();
    });   
  } 

      const filterBooks = function(){
        for(let book of dataSource.books){
          let shouldBeHidden = false;
          for (let filter of filters){
            if(!book.details[filter]){
              shouldBeHidden = true;
              break;
            }
          }
          const hiddenBooks = document.querySelector('.book__image[data-id="' + book.id + '"]');
          if(shouldBeHidden){
            hiddenBooks.classList.add('hidden');
          }else{
            hiddenBooks.classList.remove('hidden');
          }
        }
  };

  render();
  initActions();
}
