var creepTemplate = require('creeps');

class roomTemplate {
    constructor (roomHandle) {
        // Establish basic variables. 
        // Store room variable, and create placeholder for PathFinder Cost Matrix.
        this.roomHandle = roomHandle;
        this.costMatrix = null;
        
        // preload all creeps in room.
        this.creeps = [];
        this.mycreeps = [];
        this.hostilecreeps = [];
        
        // iterate over creeps, parsing them into lists of all, hostile, and my.
        // collect in constructor as this will *always* be used.
        roomHandle.find(FIND_CREEPS).forEach(
            function (creep) {
                this.creeps.push(creep);
                if (creep.my) {
                    this.mycreeps.push(creep);
                } else {
                    this.hostilecreeps.push(creep);
                }
            }
        )
    }
    
    // Function to generate a path, used primarily to wrap costmatrix generation.
    // Essentially a straight wrapper around PathFinder.search.
    getPath (start, destination, range) {
    
        // if costmatrix doesn't exist, generate now.
        if (!this.costMatrix) {
            this.costMatrix = new PathFinder.CostMatrix;
            
            // get all structures
            structures = this.getStructures('all');
            
            // iterate over all structures by type
            Object.keys(structures).forEach(function(key) {
            
                    // if type is Road, prefer
                    if (key === STRUCTURE_ROAD) {
                        // prefer roads for travel (plains will be set to 2)
                        structures[key].forEach(function(structures) {
                                this.costMatrix.set(structure.pos.x, structure.pos.y, 1);
                            };
                    } else if (key !== STRUCTURE_CONTAINER && (structure.structureType !== STRUCTURE_RAMPART || !structure.my) {
                    
                        // if structure is Rampart, check if it's mine. If not, treat as wall.
                        if (key == STRUCTURE_RAMPART) {
                            structures[key].forEach(function(structures) {
                                    if (!structure.my) {
                                        this.costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
                                    }
                                }
                            );
                        } else if (key !== STRUCTURE_CONTAINER) {
                            // set all remaining non-container structures to solid
                            this.costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
                        }
                    }
                }
            );
            
            // don't try to walk through other creeps
            this.creeps.forEach(function(creep) {
                    this.costMatrix.set(creep.creepHandle.pos.x, creep.creepHandle.pos.y, 0xff);
                }
            );
        };
        
        // Generate search with room's pathfinder matrix, immediately return.
        return PathFinder.search(start, destination, {
                plainCost: 2,
                swapCost: 5,
                
                roomCallback: function(roomName) {
                    if (this.roomHandle.name == roomName) {
                        return this.costMatrix;
                    } else {
                        return;
                    }
                }
            }
        );
    }
    
    // Find structures and parse them into subcategories for easier access.
    // Take input to return structures of that type.
    getStructures (structureType) {
    
        // Check to see if structures have been parsed before.
        // If not, collect and parse structures.
        if (!this.structureGroups) {
            // Collect *all* structures into temporary variable
            structures = this.roomHandle.find(FIND_STRUCTURES);
            
            // Generate dictionary to collect all types
            this.structureGroups = {}
            
            // Iterate over structures separating them into groups.
            structures.forEach(
                function(structure) {
                    // Create category if it doesn't exist
                    if (!this.structureGroups[structure.structureType]) {
                        this.structureGroups[structure.structureType] = [];
                    };
                    // Add structure to list for it's type.
                    this.structureGroups[structure.structureType].push(structure);
                }
            );
        };
        
        if (structureType == 'all') {
            return this.structureGroups;
        }
        // If type doesn't exist in dictionary, return empty list.
        // else, return pre-parsed list.
        else if (!this.structureGroups[structureType]) {
            return [];
        } else {
            return this.structureGroups[structureType];
        };
    }

    //
}

module.exports = roomTemplate;
