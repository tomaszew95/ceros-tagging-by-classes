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

                initialProcess();
                experience.on(CerosSDK.EVENTS.PAGE_CHANGED, pageChangedCallback);
                function pageChangedCallback(){
                    console.log("works2");
                    for(let y = 0; y<objects.length; y++){
                        objects[y].layers.forEach(function(component){
                            var id = '#' + component.id;
                            $(id).addClass(objectsNames[y]);
                        }); 
                    }
                }
            }) 
    }); 
})();

function initialProcess(){
    console.log("works1");
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
    }
    else{
        console.error("array 'objectNames' is empty");
    }
}
