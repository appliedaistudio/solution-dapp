// User login and access level checks
export const AccessLevels = Object.freeze({
    "GUEST": 0,
    "USER": 1,
    "ADMIN": 2
});

// Install bcrypt to read securely hashied passwords
var bcrypt = dcodeIO.bcrypt;

// Update loginUser to use bcrypt for password comparison
async function loginUser(db, username, password) {
  try {
      // Fetch the user document from PouchDB using the username
      const userDoc = await db.get(`user_${username}`);
      
      // Use bcrypt to compare provided password with stored hash
      const passwordMatches = await bcrypt.compare(password, userDoc.password);
      
      if (passwordMatches) {
          // Successful login, handle updating the current_session document
          const response = await updateCurrentSession(db, userDoc._id);
          // Login and session update successful
          console.log('User logged in and current session updated:', response);
      } else {
          // Password does not match, throw an error
          throw new Error('The provided credentials are incorrect.');
      }
  } catch (err) {
      // Handle any errors during login or session update
      console.error('Login failed:', err);
  }
}

function updateCurrentSession(db, userId) {
    const sessionId = 'current_session';
    
    // First, fetch the current session document, or create one if it doesn't exist
    return db.get(sessionId).catch(err => {
        if (err.status === 404) {
            // No current session document exists, create a new one
            return {_id: sessionId};
        } else {
            // Some other error occurred, rethrow it
            throw err;
        }
    }).then(sessionDoc => {
        // Set the userId of the current session to the logged-in user's ID
        sessionDoc.userId = userId;
        
        // Save the updated session document back to PouchDB
        return db.put(sessionDoc);
    });
}

// Check if the current logged-in user has the required access level
function hasAccessLevel(requiredLevel) {
    try {
        // Retrieve the access level of the current logged-in user
        const userAccessLevel = getCurrentUserAccessLevel();

        // Convert the requiredLevel from string to number based on AccessLevels
        const requiredLevelValue = AccessLevels[requiredLevel];

        // Check if user's access level is sufficient
        if (userAccessLevel >= requiredLevelValue) {
            return true; // User has the required access level
        } else {
            return false; // User does not have the required access level
        }
    } catch (error) {
        console.error('Failed to check access level:', error);
        return false;
    }
}

// Returns the access level of the current logged-in user from PouchDB
function getCurrentUserAccessLevel(db) {
    return new Promise((resolve, reject) => {
      // Retrieve the currently logged-in user's session (this will vary based on how your app manages sessions)
      const currentUserId = getCurrentUserId(); // This is a placeholder function
  
      if (!currentUserId) {
        // No user is currently logged in, or the session can't be found
        reject(new Error('No user is currently logged in.'));
        return;
      }
  
      // Fetch the user document from PouchDB
      db.get(currentUserId).then(userDoc => {
        // Resolve the promise with the user's access level
        resolve(userDoc.accessLevel);
      }).catch(err => {
        // Handle any errors, such as the user not existing in the database
        reject(err);
      });
    });
  }
  
  // Retrieves the current user's ID from a "current_session" document in PouchDB
  function getCurrentUserId(db) {
    return new Promise((resolve, reject) => {
      db.get('current_session').then(sessionDoc => {
        // Assuming the session document has a "userId" field
        if (sessionDoc.userId) {
          resolve(sessionDoc.userId);
        } else {
          // No user ID in the session document, treat as no user logged in
          reject(new Error('No user is currently logged in.'));
        }
      }).catch(err => {
        // Handle cases where the "current_session" document doesn't exist or other DB errors
        reject(err);
      });
    });
  }