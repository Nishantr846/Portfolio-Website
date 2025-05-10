// Get modal elements
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDemoLink = document.getElementById('modalDemoLink');
const modalGithubLink = document.getElementById('modalGithubLink');
const closeBtn = document.querySelector('.modal-close');
const gallerySlider = document.getElementById('gallerySlider');
const galleryDots = document.getElementById('galleryDots');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

let currentSlide = 0;
let totalSlides = 0;

// Get all project cards
const projectCards = document.querySelectorAll('.project-card');

// Add click event to each project card
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Get project data from the card
        const title = card.querySelector('h3').textContent;
        const images = JSON.parse(card.dataset.images || '[]');
        const description = card.querySelector('p').textContent;
        const demoLink = card.querySelector('.btn:last-child').href;
        const githubLink = card.querySelector('.btn:first-child').href;

        // Update modal content
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalDemoLink.href = demoLink;
        modalGithubLink.href = githubLink;

        // Update gallery
        updateGallery(images);

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

function updateGallery(images) {
    // Clear existing slides and dots
    gallerySlider.innerHTML = '';
    galleryDots.innerHTML = '';
    currentSlide = 0;
    totalSlides = images.length;

    // Add slides
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${image}" alt="Project Image ${index + 1}">`;
        gallerySlider.appendChild(slide);

        // Add dot
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });

    // Update navigation buttons
    updateNavigation();
}

function goToSlide(index) {
    currentSlide = index;
    gallerySlider.scrollTo({
        left: index * gallerySlider.offsetWidth,
        behavior: 'smooth'
    });
    updateDots();
    updateNavigation();
}

function updateDots() {
    const dots = galleryDots.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function updateNavigation() {
    prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';
}

// Navigation button click handlers
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
});

// Close modal when clicking close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 