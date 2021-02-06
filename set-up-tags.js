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
                            for(let objectName of objectsNames){
                                let objName = objectName.toString();
                                switch(true){
                                    case experience.findLayersByTag(objName).components.length > 0:
                                        objects.push(experience.findLayersByTag(objName));
                                    case experience.findComponentsByTag(objName).components.length > 0:
                                        objects.push(experience.findComponentsByTag(objName));
                                    case experience.findSyncedObjectsByTag(objName).components.length > 0:
                                        objects.push(experience.findSyncedObjectsByTag(objName));
                                    default:
                                        console.error("undefined tag name");
                                }
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
