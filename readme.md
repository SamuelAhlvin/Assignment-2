# Assignment 2 Components

## Navbar.jsx

The Navbar component simply returns the complete header navbar with all the buttons and links.

## States.js

I got this utility from the example code on the course website, and as it says in the code it "Simplifies states, contexts and binding to forms". I'm barely using it in my code though, but I decided to keep it anyway because it was used in some components from the start. 

## MovieDetail.jsx

This component first gets the id from the url and stores it, then it uses the "useStates" hook from states.js to be able to access the movies stored there. Then it uses the find() function to find the movie that matches the id from the url. Then it uses the filter() function to filter out all the screenings of the movie using the id. The information is then stored in some variables. It then returns the HTML that should be rendered, which contains all the movie info like title, length, categories, screening dates/ times and poster image.

## MovieList.jsx

This component also uses the "useStates" hook to access the movies stored there. The array of movies is mapped over using the map function. For each movie in the movies list, a Link tag is created that points to the movie detail page including the movie id. Each movie is then displayed with it's title, poster image and length.

## Screenings.jsx

This component first initializes the state variables screenings, mogies, categoryFilter, originalMovies and originalScreenings with the useState hook. I'm aware that i'm not using the "useStates" hook here, and that's because I couldn't get it to work properly for some reason. So I used the regular useState hook. Then it uses the useEffect hook to fetch the screenings and movies from the api, and then set the movies, screenings, originalMovies and originalScreenings correspondlingly. The originalMovies and originalScreenings are made to have all The movies and screenings available always, when changing category. This will only run once when the component is mounted. 
The screenings array is then sorted using the sort() function, sorted by the screeningTime and stored in a array of sortedScreenings. Then the screenings are grouped by iterating over the sortedScreenings and for each date an array is created, and the screenings of the different dates are pushed to the corresponding date array. 
The getPosterImage and getLength functions returns the posterImage and length of the movieTitle that is sent into the functions.
The categoryChange function first sets the categoryFilter state to the category that is sent into the function. If there's no category, all movies will be shown. Otherwise, it filters the movies and screenings according to the category, and sets the movies and screenings states to the new filtered lists. It also maps the movie titles of the filtered movies to be able to filter the screenings.
Lastly, it returns the HTML to be rendered containing a category selector with all the categories. It also renders all the screenings by mapping over the grouped screenings, creating a new element for each date with all the movies for that date including title, poster image, time, auditorium and length. The poster image has a link tag linking to the /booking page, which is empty.

## Booking.jsx

This component simply renders an empty page with a h3 heading stating "Booking page"

## App.jsx

This is the main app component, it creates the useStates hook 'main' with the movies and screenings lists. Then it fetches the movies and screenings from the api and stores it in the arrays. It checks if the movies list is empty, and if it is it renders nothing. Otherwise it renders the navbar that is always visible, and all the routes for the different components. the path "/" renders the Movielist component, "/movie-detail/:id" renders the MovieDetail component with the corresponding id, "screenings" renders the ScreeningsOverview component, and "/booking" renders the Booking component.

## Main.jsx

This is used to create a root ReactDOM node to which the application will be rendered, and it incldes the react BrowserRouter to be able to route different components to different url's. It uses the App component as the main component which contains all the other component's routes. 
