/**
 * Example JSON:
 * {
 *    "name" : "myCategory"
 * }
 * 
 * where "name" is the name of the new category
 */

// JSON property values
var PROP_NAME = "name";

main();

function main()
{
	// Check we have a json request
    if (typeof json === "undefined")
    {
        if (logger.isWarnLoggingEnabled() == true)
        {
            logger.warn("Could not update category, because json object was undefined.");
        }
        
        status.setCode(501, "Could not update category, because json object was undefined.");
        return;
    }
   
    // Try and retrieve the name of the new category
    var name = json.get(PROP_NAME);       
    if (name == null || name.length === 0)
    {
       status.setCode(status.STATUS_BAD_REQUEST, "Could not update category, because 'name' parameter is missing from json request.");
       return;
    }

    // Get the node reference
    var nodeRef = url.templateArgs.store_protocol + "://" + url.templateArgs.store_id + "/" + url.templateArgs.node_id;

    // Get the category
    var category = classification.getCategory(nodeRef);
    if (category !== null)
    {
    	category.rename(name);
    }
    else
    {
       status.setCode(status.STATUS_BAD_REQUEST, "Unable to update category, because category node was found or is not a category.  (nodeRef=" + nodeRef + ", name=" + name + ")");
       return;
    }
    
    model.persistedObject = category.toString();
    model.message = "Successfully changed name of category";
    model.name = name;
}
