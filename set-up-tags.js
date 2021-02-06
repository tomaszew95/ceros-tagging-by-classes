var tagsToClassses = document.getElementById("ceros-tags-to-classes-plugin");
var objectsNames = tagsToClassses.getAttribute("objects-names").split(" ");
var objects = new Array();
(function(){ 
    'use strict'; 
    require.config({ 
        paths: { 
            CerosSDK: '//sdk.ceros.com/standalone-player-sdk-v5.min' 
        } 
    }); 
    require(['CerosSDK'], function (CerosSDK) { 
        CerosSDK.findExperience() 
            .fail(function (error) { 
                console.error(error); 
            }) 
            .done(function (experience) { 
                window.myExperience = experience; 

                experience.on(CerosSDK.EVENTS.PAGE_CHANGED, pageChangedCallback); 
                    function pageChangedCallback(){
                        if(objectsNames.length > 0){
                            for(let i = 0; i<objectsNames.length; i++){
                                console.log("it works0");
                                switch(true){
                                    case (experience.findLayersByTag(objectsNames[i]).components.length > 0):
                                        console.log("it works1");
                                        objects.push(experience.findLayersByTag(objectsNames[i]));
                                    case (experience.findComponentsByTag(objectsNames[i]).components.length > 0):
                                        console.log("it works2");
                                        objects.push(experience.findComponentsByTag(objectsNames[i]));
                                    case (experience.findSyncedObjectsByTag(objectsNames[i]).components.length > 0):
                                        console.log("it works3");
                                        objects.push(experience.findSyncedObjectsByTag(objectsNames[i]));
                                    default:
                                        console.error("undefined tag name: " + objectsNames[i]);
                                }
                            }
                        }
                        else{
                            console.error("array 'objectNames' is empty")
                        }

                        for(let i = 0; i<objects.length; i++){ 
                            objects[i].layers.forEach(function(component){ 
                                var id = '#' + component.id; 
                                $(id).addClass(objectsNames[i]); 
                            });  
                        }
                    } 
            }) 
    }); 
})();
