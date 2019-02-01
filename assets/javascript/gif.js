$(document).ready(function(){

    let transformers = ["Optimus Prime","Bumblebee","Cliffjumper","Wheeljack","Prowl","Jazz","Sideswipe","Ratchet","Ironhide","Hot Rod","Springer","Kup","Blurr","Arcee",
                        "Wheelie","Hound","Mirage","Trailbreaker","Sunstreaker","Bluestreak","Grapple","Smokescreen","Hoist","Megatron","starscream","Warpath"]

    function transformerButton(array, classname, areaToAdd){
        $(areaToAdd).empty()

        for (let i=0; i<array.length; i++){
            let button = $("<button>")
            button.addClass("w3-button w3-black " + classname)
            button.attr("data-type", array[i])
            button.text(array[i])
            $(areaToAdd).append(button)
        }
    }


    $(document).on("click", ".transformer-button", function(){
        $("#transformers").empty()
        $(".transformer-button").removeClass("active")
        $(this).addClass("active")

        let type = $(this).attr("data-type")
        let queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=Q7MapOeryDv2Jr1YeKRnByel6hg7T32R&limit=20";
        console.log(queryUrl)

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            let results = response["data"];
            console.log(results)

            for(let i = 0; i < results.length; i++){
                let transformerDiv = $("<div class='transformer-item'>");
                let rating = results[i].rating // results[i]["rating"]
                let p = $("<p>").text("Rating" + rating)
                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;

                let transformerImage = $("<img>");
                transformerImage.attr("src", still)
                transformerImage.attr("data-still", still)
                transformerImage.attr("data-animate", animated)
                transformerImage.attr("data-state", "still");
                transformerImage.addClass("transformer-image");

                transformerDiv.append(p);
                transformerDiv.append(transformerImage)
                
                $("#transformers").append(transformerDiv);

            }
        })

    })

    $(document).on("click", ".transformer-image", function(){
        let state = $(this).attr('data-state')

        if(state === 'still'){
            $(this).attr('src', $(this).attr('data-animate'))
            $(this).attr('data-state', 'animate')
        }
        else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", 'still')
        }
    });


    $("#add-transformer").on("click", function(event) {
        event.preventDefault();
        let newTransformer = $("input").eq(0).val()
        if(newTransformer.length > 2){
            transformers.push(newTransformer)
        }

        transformerButton(transformers, "transformer-button", "#transformers-buttons")
        

    })

    transformerButton(transformers, "transformer-button", "#transformers-buttons")










})