module.exports.loop = function () {
    
    /* Empty variable to track rooms with spawns for later iteration of rooms 
     *without* spawns. 
     */
    var spawnRooms = [];
    
    // Iterate over all spawns and their rooms.
    for (var spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];
        var room = spawn.room;
        
        // Add room to list or parsed rooms.
        spawnRooms.push(room.name);
        
        // Test for Start Stage
        
        // Find containers in room
        var containers = room.find(FIND_MY_STRUCTURES,
                {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
        
        // Find "grunt" Creeps        
        var grunts = room.find(FIND_MY_CREEPS,
                {
                    filter: (creep) => {
                        reture (creep.memory.role == 'grunt');
                    }
                
                });
        
        // If no grunts and less than 2 containers, proceed to Start Stage
        if (containers.length < 2 || grunts.length < 1) {
            // Set stage_count variable for later use by creeper execution.
            var stage_count = 0;
            
            // Spawn and monitor starter creep.
        
        }
        
        // Test for and execute other stages.
        
        // Operate creeps
                
        
    }
}
