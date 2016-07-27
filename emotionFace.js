function submitUrl() {
        var origimgurl = $('input:first').val()
        $('#container').html('');
        $('#ontop').html('');
        $('<img>', { src: origimgurl, style: 'opacity:1' }).appendTo('#container');

        var params = {
        //we don't need parameters for this call
        };
      
        $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d012254075ba4c729825e85a841a13c8");
            },
            type: "POST",
            // Request body
            data: JSON.stringify({"url": origimgurl} )
        })
        .done(function(data) {
            console.log(data)
            alert("success");
            //run through each face data
             for (i = 0; i < data.length; i++) {
                face = data[i];
            determineHouse(face);
            }
        })
        .fail(function(data, url) {
            console.log(data)

            alert("error");
        });
    };

//Use the face scores to deterine which house the face belongs in
    function determineHouse(face){
            
        
        var grif = 0 + face.scores.surprise + face.scores.anger;
        var sly= 0 + face.scores.contempt  + face.scores.disgust;
        console.log('sly' + sly)
        var huff = 0+ face.scores.happiness + face.scores.fear;
        console.log('huff' + huff)
        var rave = 0 + face.scores.neutral + face.scores.sadness;
        console.log('rave' + rave)
        var house

        var forehead = face.faceRectangle.top - .4 * face.faceRectangle.height;
        var houseSize = face.faceRectangle.height * .4;
        var faceCenter = face.faceRectangle.left - .5*houseSize + .5*face.faceRectangle.width;
        var faceScale = face.faceRectangle.height / face.faceRectangle.width;


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


