/// Everything local to the customer resides here

localScreens = {
    "case":
    {
        "template": "case-screen-template",
        "views":
        {
            "case-form": setupCaseMain
        }
    },
    "search":
    {
        "template": "search-screen-template",
        "views":
        {
            "tableView": setupSearchTable
        }
    }
};

// Setup routing
localRouter = Backbone.Router.extend({
    // Must _not_ end with trailing slashes
    routes: {
        "case/:id": "loadCase",
        "case": "newCase",
        "search": "search"
    },

    loadCase: function (id) {
        renderScreen("case", {"id": id});
    },

    newCase: function () {
        renderScreen("case", {"id": null});
    },

    search: function () {
        renderScreen("search");
    }
});

// Case view
function setupCaseMain(viewName, args) {
    // refFields argument is a hash where each key is the name of field
    // with type reference to be rendered immediately after the parent
    // model has been loaded and value is the element name to render
    // forest of reference templates into. No way to GO DEEPER yet.
    //
    // Example:
    // refFields = {"services": "bar-baz"}
    // 
    // will render a bunch of views for references stored in "services"
    // field of model in element with id "bar-baz". Referenced instances
    // are rendered with modelSetup as well which means that viewsWare
    // will be used for further proper cleanup. Slotsee for every Nth
    // referenced instance of field is set to {{field}}-view-{{refN}}-link
    // (to be used as insight into referenced instance) and permissions
    // will be rendered into {{field}}-view-{{refN}}-perms.
    //
    // We must render reference views after the model has loaded because
    // the numer of refs is unknown when the model has not yet been
    // populated with data.
    var refFields = {
        "services": "case-service-references"
    };

    var fetchCb = function(instance) {
        books = setupRefs(instance, refFields);
        for (rf in books) {
            for (rn in books[rf]) {
                var subview = rf + "-view-" + rn;
                var setup = modelSetup(books[rf][rn].refModel);
                setup(rf + "-view-" + rn, books[rf][rn].refId, null,
                      [subview + "-link"],
                      subview + "-perms");
            }
        }
    }
    
    modelSetup("case")(viewName, args.id, fetchCb, [], "case-permissions");
}

// Add new service to case
//
// caseInstance is a Backbone model, servicesForest is ID of element
// which holds views for services of model.
function addService(caseInstance, serviceModelName, servicesForest) {
    var oldServices = caseInstance.get("services");
    var tpls = getTemplates("reference-template");
    if (_.isNull(oldServices) || (oldServices == ""))
        oldServices = [];
    else
        oldServices = oldServices.split(",");

    // Cannot check against oldService.length because there may be
    // more than 1 unsaved service
    var refN = $(".services-view").length;

    // Render view
    var html = renderRef({refN: refN,
                           refModel: serviceModelName,
                           refId: null,
                           refField: "services"},
                        tpls);
    $el(servicesForest).append(html);
    var fetchCb = mkRefFetchCb(caseInstance, "services");
    var subview = "services-view-" + refN;

    modelSetup(serviceModelName)(subview, null, fetchCb, [], subview + "-perms");
}


function initOSM() {
      window.osmap = new OpenLayers.Map("basicMap");
      var mapnik = new OpenLayers.Layer.OSM();
      osmap.addLayer(mapnik);
      osmap.setCenter(new OpenLayers.LonLat(37.617874,55.757549) // Center of the map
        .transform(
          new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
          new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
        ), 16 // Zoom level
      );
}
