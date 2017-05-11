'use strict';
var data = require("./json/targil1.json");
      

module.exports = class MovieMarathon {
	constructor(){
        console.log('MovieMarathon init');
    }
	
	test(){
		console.log("test from MovieMarathon");
	}
	
	getAllData(res){
		 res.status(200).json({"genres":data});
	}
      
    error(res,body){

         console.log("Wrong url.");
         res.status(404).set('Error','Wrong Url').json({"err":"wrong url"});
     }

	 getMoviesByGenrePost(res,body){
        console.log('body '+JSON.stringify(body));
        if(!body){
            console.log('no body!');
            res.status(500).json({"err":"genre parameter missing from body!"});
            return;
        }
        var numgenre=body.genre;
        console.log(`post: ${numgenre}`);
    let foundMovies=false;
        for(let i in data.genres){
            var genre=data.genres[i];
            if(genre.genre==numgenre){
                console.log(`found:${numgenre}`);
                foundMovies=true;
                res.status(200).json({"movies":genre.movies});
            }
        }
        if(!foundMovies)
            res.status(200).json({"err":"genre not found"});
	 }
	 
	 
    getMoviesByGenre(res,genre_id,year){
	
	
        let foundMovies=false;
        for(let i in data.genres){
            var genre=data.genres[i];
            if(genre.id==genre_id){
                 for(let j in genre.movies){
                    var movie=genre.movies[j];
                    if(movie.year==year)
                    {
                         foundMovies=true;
                        res.status(200).json({"movie":movie.name});
                    }
                }
               
            }
        }
        if(!foundMovies)
            res.status(200).json({"err":"genre not found"});
	}
}

 