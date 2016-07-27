function submitUrl() {

        //replace the image on the page with the one from the input box
        var origimgurl = $('input:first').val()
        $('#container').html('');
        $('#ontop').html('');
        //opacity 1 means solid, if it was 0 - it would be invisible
        $('<img>', { src: origimgurl, style: 'opacity:1' }).appendTo('#container');

        var params = {
        //we don't need parameters for this call, leave this blank
        };
      
        $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers (format is json, our API key)
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","YOUR-API-KEY-HERE");
            },
            type: "POST",
            // Take the image
            data: JSON.stringify({"url": origimgurl} )
        })
        .done(function(data) {
            //log the results in case we need to debug later
            console.log(data)
            //tell the user that the results came through
            alert("The Hat has decided!");
            //run through each face in the image
             for (i = 0; i < data.length; i++) {
                face = data[i];
            determineHouse(face);
            }
        })
        .fail(function(data, url) {
            console.log(data)

            alert("No Faces detected or a bad image, try a different one");
        });
    };

//Use the face scores to deterine which house the face belongs in
    function determineHouse(face){
            
        /*
        These are our sorting hat 'algorithms' 
        The API gives us the following scores, which range from 0 to 1
            face.scores.surprise, face.scores.anger, face.scores.contempt, face.scores.disgust
            face.scores.happiness, face.scores.fear, face.scores.neutral, face.scores.sadness

        I've created simple algorithms below for determining house, but you might change these for yourself
        Normal math rules apply below, you could try things like 

        var grif = 0 + .5* face.scores.surprise + 1.5* face.scores.disgust - .5 * face.scores.neutral; 
                //gryffindor would be half*surprise score + 1.5 * disgust score - half* netural score

        When writing your algorithms you'll want to test them with the follwoing logic:
        
            Write out each equation
            Set each variable = 1 (e.g. face.scores.surprise =1)
            check that grif = sly = huff = rave (e.g. grif =2, sly =2, huff=2, rave =2, OK!)

            If they don't equal the same number, then your distribution of each house is not equal


        */
        var grif = 0 + face.scores.surprise + face.scores.anger;
        var sly= 0 + face.scores.contempt  + face.scores.disgust;
        console.log('sly' + sly)
        var huff = 0+ face.scores.happiness + face.scores.fear;
        console.log('huff' + huff)
        var rave = 0 + face.scores.neutral + face.scores.sadness;
        console.log('rave' + rave)
        
        //get forehead location by doing some math
        var forehead = face.faceRectangle.top - .4 * face.faceRectangle.height;
        //the HP house icon is the height of the face x .4
        var houseSize = face.faceRectangle.height * .4;
        //find the center of the face
        var faceCenter = face.faceRectangle.left - .5*houseSize + .5*face.faceRectangle.width;
        


        /*
        The following code compares the value calcuated for each house
        Depending on which house has the greatest number, we add a <div> (essentially a new image on the webpage) 
        with the image of the appropriate house. 
        */

        //if gryffindor
        if ( grif > sly && grif > huff && grif > rave ) { house = "G";
            $('<div>', {
                 class: 'house',
                 style: 'background-image: url("Gryffindor.png"); top: ' + forehead + 'px; left: ' + faceCenter + 'px; opacity:1; background-size: ' + houseSize + 'px; width: ' +houseSize+'px; height: '+houseSize+ 'px; position: fixed;'  }).appendTo('#ontop');
       console.log("appended to Gryff");}

       // if slytherin
        if (sly >grif && sly>huff & sly > rave) {house ="S"; 
       $('<div>', {
                 class: 'house',
                 style: 'background-image: url("Slytherin.png"); top: ' + forehead + 'px; left: ' + faceCenter + 'px; opacity:1; background-size: ' + houseSize + 'px; width: ' +houseSize+'px; height: '+houseSize+ 'px; position: fixed;'  }).appendTo('#ontop');
       console.log("appended to Sly");}

       //if Huff
        if (huff> grif && huff > sly && huff >rave) {house = "H"; 
        $('<div>', {
                 class: 'house',
                 style: 'background-image: url("Hufflepuff.png"); top: ' + forehead + 'px; left: ' + faceCenter + 'px; opacity:1; background-size: ' + houseSize + 'px; width: ' +houseSize+'px; height: '+houseSize+ 'px; position: fixed;'  }).appendTo('#ontop');
       console.log("appended to Huff");}


       //if Raven
        if (rave > grif && rave > sly && rave> huff) {house ="R"; 
        $('<div>', {
                 class: 'house',
                 style: 'background-image: url("RavenClaw.png"); top: ' + forehead + 'px; left: ' + faceCenter + 'px; opacity:1; background-size: ' + houseSize + 'px; width: ' +houseSize+'px; height: '+houseSize+ 'px; position: fixed;'  }).appendTo('#ontop');
       console.log("appended to Raven");}

       $('ontop').css("height: 0px;");
    }


