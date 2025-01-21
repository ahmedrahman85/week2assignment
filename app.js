
        // I know the demo used const and arrays but I think in CPP, 
        // so I will use a class for fullScreenGalleryManager
        // in retrospect this was very tedious and longwinded some bits are redunant

        class fullScrnGalleryMngr {
          #imageCollection; //this is where the images will be stored it is a private field #, only available within class
          #currentImageIndex = 0;
          #mainDisplayRef;
          #thumbNailGridRef;
          #prevButtonRef;
          #nextButtonRef;
        
          //constructor special method used when class initiated,
        constructor(initialImageCollection) {
            if (!Array.isArray(initialImageCollection) || initialImageCollection.length === 0) {
            throw new Error ; //check for images
        }
        
            this.#imageCollection = initialImageCollection;
            this.#initialiseGallery(); //special method for initialsing gallery, this. is calling the method onl available within class
        }
        #initialiseGallery() { //this method switches on the gallery, initiates the DOM ref and loads images + display
          this.#initialiseDOMReferences();
          this.#createThumbNails();
          this.#initialiseEventListeners();
          this.#displaySelectedImage(0);
        }
        //something i very very wrong
        //setup the DOMref with the HTML
        #initialiseDOMReferences() {
          this.#mainDisplayRef = document.getElementById('img');
          this.#thumbNailGridRef = document.getElementById('thumbNailGrid');
          this.#prevButtonRef = document.getElementById('prevButton');
          this.#nextButtonRef = document.getElementById('nextButton');
        //for debugging check if dom refs loaded
        if (!this.#mainDisplayRef || !this.#thumbNailGridRef ||
          !this.#prevButtonRef || !this.#nextButtonRef) {
          throw new Error('Required DOM elements not found');
        
            }
        }
        
        #createThumbNails(){
          this.#thumbNailGridRef.innerHTML ='';
        
          this.#imageCollection.forEach((img, index) => {
              const thumbNail = this.#createImageElement(img);
              thumbNail.setAttribute('tabindex', 0);
              thumbNail.addEventListener('click', () => this.#displaySelectedImage(index));
              thumbNail.addEventListener('keydown', (e) => {
                if(e.key==='Enter' || e.key ===' '){
                  e.preventDefault();
                  this.#displaySelectedImage(index);
                }
              });
                if(index === 0) thumbNail.classList.add('active');
                this.#thumbNailGridRef.appendChild(thumbNail);
            });
        }
        
        #initialiseEventListeners() {
          this.#prevButtonRef.addEventListener('click', () => this.#navigateGallery('prev'));
          this.#nextButtonRef.addEventListener('click', () => this.#navigateGallery('next'));
        
          document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft') this.#navigateGallery('prev');
            if(e.key  === 'ArrowRight') this.#navigateGallery('next');
        
          
          });
        }
        
        #displaySelectedImage(index) {
          this.#currentImageIndex = index;
          this.#mainDisplayRef.innerHTML = '';
          const mainImage = this.#createImageElement(this.#imageCollection[index]);
          this.#mainDisplayRef.appendChild(mainImage);
        
          const thumbNails = this.#thumbNailGridRef.querySelectorAll('img');
          thumbNails.forEach((thumb, idx) => {
              thumb.classList.toggle('active',idx === index);
          });
        
          this.#updateNavState();
        }
        
        #navigateGallery(direction) {
          const newIndex = direction === 'prev'
          ? this.#currentImageIndex - 1
          : this.#currentImageIndex + 1;
        
          if (newIndex >= 0 && newIndex < this.#imageCollection.length){
            this.#displaySelectedImage(newIndex);
        
          }
        }
        
        #updateNavState() {
          this.#prevButtonRef.disabled = this.#currentImageIndex === 0;
          this.#nextButtonRef.disabled = this.#currentImageIndex ===this.#imageCollection.length -1;
          }
        #createImageElement(imageData) {
          const imageElement = document.createElement('img');
          imageElement.src = imageData.src;
          imageElement.alt = imageData.alt;
          return imageElement;
          }
        }
        
        const initialImageCollection = [
          { 
            src: 'https://images.pexels.com/photos/137077/pexels-photo-137077.jpeg?auto=compress&cs=tinysrgb', // Removed w= and h= parameters
            alt: 'Urban Art 1'
        },
        { 
            src: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb',
            alt: 'Urban Art 2'
        },
        { 
            src: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb',
            alt: 'Urban Art 3'
        },
        { 
            src: 'https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb',
            alt: 'Urban Art 4'
        }
    ];
        
              
        document.addEventListener('DOMContentLoaded', () => {
          try {
              const galleryManager = new fullScrnGalleryMngr(initialImageCollection);
              window.__debugGalleryManager = galleryManager;
          } catch (error) {
              console.log('Gallery init failed:');
          }
        });