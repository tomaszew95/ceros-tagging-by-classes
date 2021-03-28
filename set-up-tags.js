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
                class emptyObject {
                    constructor(layers){
                        this.layers = layers;
                    }
                    layers = [];
                };
                initialProcess();

                experience.on(CerosSDK.EVENTS.PAGE_CHANGED, pageChangedCallback);
                function pageChangedCallback(){
                    for(let i = 0; i<objects.length; i++){
                        objects[i].layers.forEach(function(component){
                            var id = '#' + component.id;
                            $(id).addClass(objectsNames[i]);
                        }); 
                    }
                }

                function initialProcess(){
                    if(objectsNames[0] != ""){
                        for(let i = 0; i<objectsNames.length; i++){
                            if(experience.findLayersByTag(objectsNames[i]).layers.length > 0){
                                objects.push(experience.findLayersByTag(objectsNames[i]));
                                continue;
                            }
                            else if(experience.findSyncedObjectsByTag(objectsNames[i]).syncedObjects.length > 0){
                                objects.push(experience.findSyncedObjectsByTag(objectsNames[i]));
                                continue;
                            }
                            console.warn("unused tag name: " + objectsNames[i]);
                            objects.push(new emptyObject);
                        }
                    }
                    else{
                        console.warn("array 'objectNames' is empty");
                    }
                }
            }) 
    }); 
})();
