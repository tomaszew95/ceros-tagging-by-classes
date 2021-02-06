var tagsToClassses = document.getElementById("ceros-tags-to-classes-plugin");
var objectsNames = tagsToClassses.getAttribute("objects-names").toArray();
var objects;
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
                        console.log(objectsNames);
                        console.log(objectsNames[0]);
                        
                        if(objectsNames.length > 0){
                            for(let objectName of objectsNames){
                                if(experience.findLayersByTag(objectName.toString()).length > 0){
                                    objects.push(experience.findLayersByTag(objectName))
                                }
                                else if (experience.findComponentsByTag(objectName.toString()).length > 0){
                                    objects.push(experience.findComponentsByTag(objectName))
                                }
                                else if (experience.findSyncedObjectsByTag(objectName.toString()).length > 0){
                                    objects.push(experience.findSyncedObjectsByTag(objectName))
                                }
                                else(
                                    console.error("undefined tag name")
                                )
                            }
                        }
                        else{
                            console.error("array 'objectNames' is empty")
                        }

                        for(var i = 0; i<objects.length; i++){ 
                            objects[i].layers.forEach(function(component){ 
                                var id = '#' + component.id; 
                                $(id).addClass(objectsNames[i]); 
                            });  
                        }
                    } 
            }) 
    }); 
})();
