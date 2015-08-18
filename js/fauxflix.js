$(document).ready(function(){

    //API key to access movie database
    var api_key = 'api_key=ef36b66f5c3e3b496a90eb84bb4e5717';

    //retrieve movie data from database
    function getMovieData(){
      return $.get('http://api.themoviedb.org/3/movie/popular?' + api_key);
    }


    //display movies in list2
    function displayMovieData(data){
       data.results.forEach(function(movie){
        $("#list2").append("<img class='img-responsive img-thumbnail col-md-2 col-xs-12 col-sm-6' id=" + movie.id +" src='http://image.tmdb.org/t/p/w500" 
        + movie.poster_path + "'></div>" );
      });
      localStorage.setItem("movies", JSON.stringify(data));
    }


    //load movies on page load
    $("#list2").load(getMovieData().then(displayMovieData));


    /*select img-thumbnail
      img-thumbnail is needed to know what to drill down to 
      aka delegation (in jquery docs)
      then say "this" (img-thumbnail) should have the class toggled on click*/
    $("#list2").on("click", ".img-thumbnail", function(movie){

        var self = this;
        var hasAppeared = false;

        if($("#list1 img").length === 0){
           $(this).clone().appendTo("#list1").attr("id", movie.id ).toggleClass('selected'); 
           return;
        }

        $("#list1").children().each(function(iter, el){
            var movieID = $(el).attr("id");
     
            if($(self).attr("id") == movieID){
                hasAppeared = true;
                $(el).remove();
            }    
        }); 

        if(!hasAppeared){
            $(self).clone().appendTo("#list1").attr("id", movie.id ).toggleClass('selected'); 
        }
                    
    });


    //setup for list1 not to clone on click
    $("#list1").on("click", ".img-thumbnail", function(){
        var poster = this.id;
        //make it so list1 doesnt clone poster when clicked on
        $("#list2 .img-thumbnail").each(function(iter, el){
            if(el.id==poster){
                $(el).removeClass('selected');
            }   
        });
    });


    //go to list1, find the img-thumbnail, and remove it when it's clicked on
    $("#list1").on("click", ".img-thumbnail", function(e){
        $(this).detach();  
    });

 });