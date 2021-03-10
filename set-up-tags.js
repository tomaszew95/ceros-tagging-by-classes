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
                        for(var i = 0; i<objects.length; i++){
                            objects[i].layers.forEach(function(component){
                                var id = '#' + component.id;
                                $(id).addClass(objectsNames[i]);
                            }); 
                        }
                    }

                if(objectsNames.length > 0){
                    for(let i = 0; i<objectsNames.length; i++){
                        switch(true){
                            case (experience.findLayersByTag(objectsNames[i]).layers.length > 0):
                                objects.push(experience.findLayersByTag(objectsNames[i]));
                                break;
                            case (experience.findSyncedObjectsByTag(objectsNames[i]).syncedObjects.length > 0):
                                objects.push(experience.findSyncedObjectsByTag(objectsNames[i]));
                                break;
                            default:
                                console.error("undefined tag name: " + objectsNames[i]);
                        }
                    }
                    pageChangedCallback();
                }
                else{
                    console.error("array 'objectNames' is empty");
                }
            }) 
    }); 
})();
