var tagsToClassses = document.getElementById("ceros-tags-to-classes-plugin");
var objectsNames = tagsToClassses.getAttribute("objects-names").split(" ");
var objects = new Array();
(function(){ 
    console.log('it works0');
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
                console.log('it works1');

                if(objectsNames.length > 0){
                    console.log('it works2');
                    console.log(experience.findLayersByTag(objectsNames[0]));
                    for(let i = 0; i<objectsNames.length; i++){
                        switch(true){
                            case isNaN(experience.findLayersByTag(objectsNames[i]).components.length > 0):
                                console.log("it works1");
                                objects.push(experience.findLayersByTag(objectsNames[i]));
                            case isNaN(experience.findComponentsByTag(objectsNames[i]).components.length > 0):
                                console.log("it works2");
                                objects.push(experience.findComponentsByTag(objectsNames[i]));
                            case isNaN(experience.findSyncedObjectsByTag(objectsNames[i]).components.length > 0):
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
            }) 
    }); 
})();
