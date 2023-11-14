import { FilmInfo } from '../data/films/film-info';
import { FilmRatingInfo } from '../data/films/film-rating-info';
import { IFilmManager } from '../interfaces/film-manager';

export class MockFilmManager implements IFilmManager{
  getFilms(): FilmInfo[] {
    return this.filmStorage;
  }

  getFilmOrNull(id: string | number): FilmInfo | null {
    const trueId = Number(id);

    if (Number.isNaN(trueId)) {
      return null;
    }

    return this.filmStorage.find((film) => film.id === trueId) || null;
  }

  getFilmRatingOrNull(id: string | number): FilmRatingInfo | null {
    const trueId = Number(id);

    if (Number.isNaN(trueId)) {
      return null;
    }

    return this.filmRatingStorage.find((rating) => rating.id === trueId) || null;
  }

  private filmStorage: FilmInfo[] = [
    {
      id: 1,
      title: 'Fantastic Beasts: The Crimes of Grindelwald',
      genre: 'cinema',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 2,
      title: 'Bohemian Rhapsody',
      genre: 'action',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/bohemian-rhapsody.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 3,
      title: 'Macbeth',
      genre: 'cinema',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/macbeth.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 4,
      title: 'Aviator',
      genre: 'detective',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/aviator.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 5,
      title: 'We need to talk about Kevin',
      genre: 'sci-fi',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/we-need-to-talk-about-kevin.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 6,
      title: 'What We Do in the Shadows',
      genre: 'comedy',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/what-we-do-in-the-shadows.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 7,
      title: 'Revenant',
      genre: 'tragedy',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/revenant.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
    {
      id: 8,
      title: 'Johnny English',
      genre: 'monke',
      releaseDate: new Date('2019-01-16'),
      coverUrl: 'img/johnny-english.jpg',
      urlLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    }
  ];

  private filmRatingStorage: FilmRatingInfo[] = [
    {
      id: 1,
      score: 9.8,
      count: 5
    },
    {
      id: 2,
      score: 9.8,
      count: 5
    },
    {
      id: 3,
      score: 9.8,
      count: 5
    },
    {
      id: 4,
      score: 9.8,
      count: 5
    },
    {
      id: 5,
      score: 9.8,
      count: 5
    },
    {
      id: 6,
      score: 9.8,
      count: 5
    },
    {
      id: 7,
      score: 9.8,
      count: 5
    },
    {
      id: 8,
      score: 9.8,
      count: 5
    }
  ];
}
