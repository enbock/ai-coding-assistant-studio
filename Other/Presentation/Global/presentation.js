class FilmController {
    constructor() {
        this.films = this.getFilms();
        this.currentIndex = -1;
        this.initializeEventListeners();
    }

    getFilms() {
        const filmElements = document.querySelectorAll('film');
        return Array.from(filmElements);
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
        this.showNextFilm();
    }

    handleKeyPress(event) {
        if (this.films) {
            if (event.key === 'ArrowRight') {
                this.showNextFilm();
            } else if (event.key === 'ArrowLeft') {
                this.showPreviousFilm();
            }
        }
    }

    showNextFilm() {
        if (this.films && this.currentIndex > -1) {
            this.films[this.currentIndex].style.display = 'none';
        }
        this.currentIndex = (this.currentIndex + 1) % this.films.length;
        this.films[this.currentIndex].style.display = 'block';
    }

    showPreviousFilm() {
        if (this.films && this.currentIndex > -1) {
            this.films[this.currentIndex].style.display = 'none';
        }
        this.currentIndex = (this.currentIndex - 1 + this.films.length) % this.films.length;
        this.films[this.currentIndex].style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filmController = new FilmController();
});
