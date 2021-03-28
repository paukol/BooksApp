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

  class BooksList{
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.filteredBooks = document.querySelector(select.containerOf.filters);

      thisBooksList.favoriteBook = [];
      thisBooksList.filters = [];
    }
  
  render() {
    const thisBooksList = this;
   
    for(let book of thisBooksList.data){
      
      book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.booksList(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksContainer.appendChild(generatedDOM); 
    }
  }

  initActions(){
    const thisBooksList = this;
    thisBooksList.booksContainer.addEventListener('dblclick', function(event){
      
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
    
      if(clickedElement.classList.contains('book__image')){      
        let id = clickedElement.getAttribute('data-id');
  
        if(!clickedElement.classList.contains(select.class.favourite)){
          clickedElement.classList.add(select.class.favourite);
          thisBooksList.favoriteBook.push(id);

        } else {
          clickedElement.classList.remove(select.class.favourite);
          thisBooksList.favoriteBook.splice(favoriteBook.indexOf(id), 1);
        }
      }
    });

    thisBooksList.filteredBooks.addEventListener('change', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
        if(clickedElement.checked){
          thisBooksList.filters.push(clickedElement.value);
        }else{
          thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
        }
      }
      thisBooksList.filterBooks();
    });   
  }; 

  filterBooks(){
    const thisBooksList = this;

    for(let book of thisBooksList.data){
      let shouldBeHidden = false;
      for (let filter of thisBooksList.filters){
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

determineRatingBgc(rating){
    let background = '';

    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if(rating >8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return background;
  }
}

  const app = {
    initProject: function(){
      new BooksList();
    }
  };
  app.initProject();
}
