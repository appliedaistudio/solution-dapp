const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"


// Initialize PouchDB
var db = new PouchDB('cobot_options');


// Function to save a cobotics option to PouchDB
function saveCoboticsOptionData(cobot_option) {
    db.post(cobot_option)
        .then(function(response) {
            console.log('Cobotics option saved:', response);
        })
        .catch(function(error) {
            console.log('Error saving cobotics option:', error);
        });
}

export function writeTestCobotOptionsData() {

    // Delete all documents in the database
    db.allDocs({
        include_docs: true
    })
    .then(function(result) {
        var docsToDelete = result.rows.map(function(row) {
            return {
                _id: row.doc._id,
                _rev: row.doc._rev,
                _deleted: true
            };
        });

        return db.bulkDocs(docsToDelete);
    })
    .then(function() {
        console.log('All documents have been deleted.');
    })
    .catch(function(error) {
        console.error('Error deleting documents:', error);
    })
    .finally(function() {
        // write new sample data to the database

        // Example data
        var option1 = {
            option: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            href: 'avatar1.jpg'
        };

        var option2 = {
            option: 'This is a test option.',
            href: 'avatar2.jpg'
        };

        // Save example options to PouchDB
        saveCoboticsOptionData(option1);
        saveCoboticsOptionData(option2);
    });

}

function addCoboticsOptionToList(option) {
    // get the notification template html
    var cobot_option_template = document.getElementById("cobotOption").content;
    var cobot_option_template_HTML = document.importNode(cobot_option_template, true);

    // set the properties of the cobot option
    cobot_option_template_HTML.getElementById("cobotOption").textContent = option.option;
    cobot_option_template_HTML.querySelector("a").href = option.href;

    // place the notification into the notifications list
    document.getElementById("cobotOptions").appendChild(cobot_option_template_HTML);
}


export function refreshCoboticsOptions() {
    // @todo why does this work???
    // clear the existing cobotics options from the display
    //document.getElementById("coboticsOptions").textContent = "";

    // Read cobotics options from PouchDB and display them on the page
    db.allDocs({
        include_docs: true
    })
    .then(function(result) {
        result.rows.forEach(function(row) {
            var option = row.doc;
            addCoboticsOptionToList(option);
        });
    })
    .catch(function(error) {
        console.log('Error reading notifications:', error);
    }); 
}