
document.addEventListener('DOMContentLoaded', function() {
    console.log('Галерея загружена!');


    updateImageCounter();

    
    setupLikes();

    setupViewControls();

    setupFilters();

    updateYear();

    setTimeout(function() {
        console.log('✅ JavaScript работает правильно!');
        document.querySelector('.js-status').textContent = 'JavaScript загружен и работает!';
    }, 1000);
});

function updateImageCounter() {
    const images = document.querySelectorAll('.image-card');
    const counter = document.getElementById('image-counter');
    if (counter) {
        counter.textContent = images.length;
    }
    console.log(`Найдено фотографий: ${images.length}`);
}

function setupLikes() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const totalLikesElement = document.getElementById('total-likes');
    let totalLikes = 0;

    likeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const likesSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(likesSpan.textContent) || 0;

            if (this.classList.contains('liked')) {
                z
                currentLikes--;
                totalLikes--;
                this.classList.remove('liked');
            } else {
                // Добавляем лайк
                currentLikes++;
                totalLikes++;
                this.classList.add('liked');
            }

            // Обновляем счётчики
            likesSpan.textContent = currentLikes;
            totalLikesElement.textContent = totalLikes;

            // Анимация кнопки
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);

            console.log(`Лайков всего: ${totalLikes}`);
        });
    });
}

function setupViewControls() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const galleryGrid = document.getElementById('image-gallery');

    gridViewBtn.addEventListener('click', function() {
        galleryGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', function() {
        galleryGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.image-card');

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Снятие активного класса со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            cards.forEach(function(card) {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            updateImageCounter();
        });
    });
}

function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Валидация формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Базовая валидация
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
       
        alert('Форма успешно отправлена!');
        
       
     fetch('/submit-form', {
         method: 'POST',
           headers: {
          },
          body: JSON.stringify({
                name: name,
             email: email,
             subject: document.getElementById('subject').value,
               message: message
          })
        })
     .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Ошибка:', error));
    });
});

