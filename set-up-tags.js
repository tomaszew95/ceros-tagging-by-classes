var objectsNames = new Array();
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
                            for(let objectName of objectsNames){
                                if(experience.findLayersByTag(objectName).length > 0){
                                    objects.push(experience.findLayersByTag(objectName))
                                }
                                else if (experience.findComponentsByTag(objectName).length > 0){
                                    objects.push(experience.findComponentsByTag(objectName))
                                }
                                else if (experience.findSyncedObjectsByTag(objectName).length > 0){
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
