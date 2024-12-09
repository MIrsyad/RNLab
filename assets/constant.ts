import { Dimensions } from "react-native";
import {  IMovie } from "../components/movieCard";

export const movieData: IMovie[] = [
        {
          id: 1,
          title: "The Dark Knight",
          year: 2008,
          genre: "Action, Crime, Drama",
          director: "Christopher Nolan",
          cast: [
            { actor: "Christian Bale", character: "Bruce Wayne / Batman" },
            { actor: "Heath Ledger", character: "Joker" },
            { actor: "Aaron Eckhart", character: "Harvey Dent" },
          ],
          rating: 9.0,
          duration: "2h 32m",
          language: "English",
          country: "USA",
          boxOffice: "$1.005 billion",
          poster: "https://m.media-amazon.com/images/I/81IfoBox2TL._AC_UF894,1000_QL80_.jpg",
          description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, forcing Batman to reconsider his approach to fighting crime."
        },
        {
          id: 2,
          title: "Inception",
          year: 2010,
          genre: "Action, Adventure, Sci-Fi",
          director: "Christopher Nolan",
          cast: [
            { actor: "Leonardo DiCaprio", character: "Dom Cobb" },
            { actor: "Joseph Gordon-Levitt", character: "Arthur" },
            { actor: "Ellen Page", character: "Ariadne" },
          ],
          rating: 8.8,
          duration: "2h 28m",
          language: "English",
          country: "USA",
          boxOffice: "$829.9 million",
          poster: "https://m.media-amazon.com/images/I/714b1KQmskL._AC_UF894,1000_QL80_.jpg",
          description: "A thief who enters the dreams of others to steal secrets from their subconscious is given the task of planting an idea into the mind of a CEO."
        },
        {
          id: 3,
          title: "The Shawshank Redemption",
          year: 1994,
          genre: "Drama",
          director: "Frank Darabont",
          cast: [
            { actor: "Tim Robbins", character: "Andy Dufresne" },
            { actor: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding" },
            { actor: "Bob Gunton", character: "Warden Norton" },
          ],
          rating: 9.3,
          duration: "2h 22m",
          language: "English",
          country: "USA",
          boxOffice: "$28.3 million",
          poster: "https://m.media-amazon.com/images/I/71715eBi1sL._AC_UF894,1000_QL80_.jpg",
          description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
        },
        {
          id: 4,
          title: "The Godfather",
          year: 1972,
          genre: "Crime, Drama",
          director: "Francis Ford Coppola",
          cast: [
            { actor: "Marlon Brando", character: "Don Vito Corleone" },
            { actor: "Al Pacino", character: "Michael Corleone" },
            { actor: "James Caan", character: "Sonny Corleone" },
          ],
          rating: 9.2,
          duration: "2h 55m",
          language: "English",
          country: "USA",
          boxOffice: "$250 million",
          poster: "https://m.media-amazon.com/images/I/81C9FT0-8CL.jpg",
          description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
        },
        {
          id: 5,
          title: "Pulp Fiction",
          year: 1994,
          genre: "Crime, Drama",
          director: "Quentin Tarantino",
          cast: [
            { actor: "John Travolta", character: "Vincent Vega" },
            { actor: "Uma Thurman", character: "Mia Wallace" },
            { actor: "Samuel L. Jackson", character: "Jules Winnfield" },
          ],
          rating: 8.9,
          duration: "2h 34m",
          language: "English",
          country: "USA",
          boxOffice: "$214 million",
          poster: "https://m.media-amazon.com/images/I/718LfFW+tIL._AC_UF894,1000_QL80_.jpg",
          description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
        },
        // {
        //   id: 6,
        //   title: "The Matrix",
        //   year: 1999,
        //   genre: "Action, Sci-Fi",
        //   director: "Lana Wachowski, Lilly Wachowski",
        //   cast: [
        //     { actor: "Keanu Reeves", character: "Neo" },
        //     { actor: "Laurence Fishburne", character: "Morpheus" },
        //     { actor: "Carrie-Anne Moss", character: "Trinity" },
        //   ],
        //   rating: 8.7,
        //   duration: "2h 16m",
        //   language: "English",
        //   country: "USA",
        //   boxOffice: "$466 million",
        //   poster: "https://m.media-amazon.com/images/I/71pVZmFl-UL._AC_SY679_.jpg",
        //   description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
        // },
        // {
        //   id: 7,
        //   title: "Forrest Gump",
        //   year: 1994,
        //   genre: "Drama, Romance",
        //   director: "Robert Zemeckis",
        //   cast: [
        //     { actor: "Tom Hanks", character: "Forrest Gump" },
        //     { actor: "Robin Wright", character: "Jenny Curran" },
        //     { actor: "Gary Sinise", character: "Lieutenant Dan Taylor" },
        //   ],
        //   rating: 8.8,
        //   duration: "2h 22m",
        //   language: "English",
        //   country: "USA",
        //   boxOffice: "$678 million",
        //   poster: "https://m.media-amazon.com/images/I/51R4k-LdsDL._AC_SY679_.jpg",
        //   description: "The presidencies of Kennedy and Johnson, the Vietnam War, the events of 1960s America, the Watergate scandal and other history unfold from the perspective of an Alabama man with an extraordinary life story."
        // },
        // {
        //   id: 8,
        //   title: "The Lion King",
        //   year: 1994,
        //   genre: "Animation, Adventure, Drama",
        //   director: "Roger Allers, Rob Minkoff",
        //   cast: [
        //     { actor: "Matthew Broderick", character: "Simba" },
        //     { actor: "James Earl Jones", character: "Mufasa" },
        //     { actor: "Jeremy Irons", character: "Scar" },
        //   ],
        //   rating: 8.5,
        //   duration: "1h 29m",
        //   language: "English",
        //   country: "USA",
        //   boxOffice: "$1.065 billion",
        //   poster: "https://m.media-amazon.com/images/I/91zGLO2g1yL._AC_SY679_.jpg",
        //   description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself."
        // },
        // {
        //   id: 9,
        //   title: "Gladiator",
        //   year: 2000,
        //   genre: "Action, Adventure, Drama",
        //   director: "Ridley Scott",
        //   cast: [
        //     { actor: "Russell Crowe", character: "Maximus Decimus Meridius" },
        //     { actor: "Joaquin Phoenix", character: "Commodus" },
        //     { actor: "Connie Nielsen", character: "Lucilla" },
        //   ],
        //   rating: 8.5,
        //   duration: "2h 35m",
        //   language: "English",
        //   country: "USA",
        //   boxOffice: "$457 million",
        //   poster: "https://m.media-amazon.com/images/I/81DzmfeJPwL._AC_SY679_.jpg",
        //   description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
        // },
        // {
        //   id: 10,
        //   title: "Interstellar",
        //   year: 2014,
        //   genre: "Adventure, Drama, Sci-Fi",
        //   director: "Christopher Nolan",
        //   cast: [
        //     { actor: "Matthew McConaughey", character: "Cooper" },
        //     { actor: "Anne Hathaway", character: "Dr. Amelia Brand" },
        //     { actor: "Jessica Chastain", character: "Murph Cooper" },
        //   ],
        //   rating: 8.6,
        //   duration: "2h 49m",
        //   language: "English",
        //   country: "USA",
        //   boxOffice: "$677 million",
        //   poster: "https://m.media-amazon.com/images/I/91kS3e7QyFL._AC_SY679_.jpg",
        //   description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
        // }
];

export const { width, height } = Dimensions.get('screen');
export const _itemwidth = width* 0.6
export const _itemheight = 300
export const _spacing = 8 
export const _itemfullsize = _itemwidth + _spacing