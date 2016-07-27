# Building a Harry Potter Sorting Hat with Microsoft Cognitive Services#

In this tutorial I'll guide you though building your own Harry Potter sorting hat, using JavaScript and Microsoft Cognitive Services.

##Prerequisites##
- Visual Studio Code
- Microsoft Account

## Getting an API Key ##
We're going to be using Microsoft Cognitive Services' Emotion API as the brain of our Sorting Hat. 

1. Go to [http://www.microsoft.com/cognitive-services/en-us/emotion-api](http://www.microsoft.com/cognitive-services/en-us/emotion-api)
2. Select get started for free: ![](http://i.imgur.com/XwjZtxT.jpg)
3. Log in using your Microsoft Account
4. Request the Emotion-Preview API and Subscribe (at the bottom)
 ![](http://i.imgur.com/EQu5fuh.jpg)
5. Copy the API key and save it for later
 ![](http://i.imgur.com/0SYuNBh.jpg)


## The Starter Code ##
1. If you're familiar with Git, clone the repo or open it on your desktop. Otherwise, **Download ZIP**, save the ZIP file somewhere  you'll remember.   Extract that folder (so we can access all the files)
2. Open VS Code, and open the folder we just extracted
 ![](http://i.imgur.com/L67pMrW.gif)

3. The two important files we have are:
	- index.html  This this our website
	- emotionFace.js  This is where we do all the logic/sorting

## Making the Code our Own##

### Index.html ###
Let's start with **index.html** This is essentially our homepage.

A few things to note:

    <div id="container">
        <img src="SatyaSorted.JPG" > <!--this is our main image when we load the page !-->
    </div>
	
This is the picture we see when we load the page.  
*If you want to change it:* Find or create a picture, and save it in the same folder. Then change the code from SatyaSorted.jpg to whatever your new image is called. 

    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>  <!--jquery lets us manipulate images, anything with a $ is jquery!-->
    <script src= "emotionFace.js"> </script>  <!-- this pulls in our javascript code !-->

These two scripts are very important to our success. 

- emotionFace.js is the brain of our website. It sends the image to the API, gets a response, and then assigns a house

- jQuery is a library (think of it as a code-helper) which helps us manipulate images within the html


    
### emotionFace.js ###

The first thing we'll need to do to get the page working is input our API key into our code.

Find the code which looks like this (~line 18)

	xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","YOUR-API-KEY-HERE"); 

**TODO 1** Where it says "YOUR-API-KEY-HERE" **replace it with your API key** from the *Getting Your API Key section*

#### We're ready to test your sorting hat! ####
Awesome! You've done all the work needed (I may have done some of the heavy lifing for you)

To get this app to open, all you need to do is navigate to the folder where these files are and open index.html with your favorite web browser (edge, firefox, chrome, etc).

The page will then load and you can test it out
![](http://i.imgur.com/LedaaL5.gif)


We call the [Microsoft Cognitive Services Emotion API](https://dev.projectoxford.ai/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa "Microsoft Cognitive Services Emotion API") with the following code:

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


This code is almost identical to the example on the [Microsoft Cognitive Services Emotion API Reference.](https://dev.projectoxford.ai/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa "Microsoft Cognitive Services Emotion API")  If you want to call this API using a different language, there are examples in multiple languages. 


####The Sorting Hat Algorithm(s)  ####

Now for the fun part - let's sort these people!

For every face we feed the API, we get 8 emotion scores:

- surprise
- happiness
- anger
- fear
- contempt
- neutral
- disgust
- sadness

I created 4 initial algorithms:
	
	//Gryffindor score
	var grif = 0 + face.scores.surprise + face.scores.anger;
	//Slytherin score
    var sly= 0 + face.scores.contempt  + face.scores.disgust;
	//Hufflepuff score
    var huff = 0+ face.scores.happiness + face.scores.fear;
	//Ravenclaw score
    var rave = 0 + face.scores.neutral + face.scores.sadness;

***TODO -** You should think about changing these rules for yourself*


Normal math rules apply below, you could try things like 

        var grif = 0 + .5* face.scores.surprise + 1.5* face.scores.disgust - .5 * face.scores.neutral; 
        //gryffindor would be half*surprise score + 1.5 * disgust score - half* netural score

When writing your algorithms you'll want to test them with the following logic:
        
           	1. Write out each equation
           	2.  Set each variable = 1 (e.g. face.scores.surprise =1)
            3. Check that grif = sly = huff = rave (e.g. grif =2, sly =2, huff=2, rave =2, OK!)
            4. If they don't equal the same number, then your distribution of each house is not equal


***TODO 2 -** Once you create a new algorithm, save your code, go to your web browser, refresh the page, and try an image. If you like the results, you're good to go, otherwise keep tweaking your sorting hat algorithms*
