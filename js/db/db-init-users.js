import { putData } from './db-init-common.js';
import { AccessLevels } from '../ui/ui-auth.js';

// Dummy user data with access levels
const dummyUsers = [
    {_id: 'user_guest', username: 'guest', password: 'guest123', accessLevel: AccessLevels.GUEST},
    {_id: 'user_regular', username: 'user', password: 'user123', accessLevel: AccessLevels.USER},
    {_id: 'user_admin', username: 'admin', password: 'admin123', accessLevel: AccessLevels.ADMIN}
  ];
  
  async function initializeUsers(db) {
    const dummyUsers = [
      { _id: 'user_guest', username: 'guest', password: 'guest123', accessLevel: 'GUEST' },
      // ... other users
    ];
  
    // Hash passwords and store dummy users
    // The actual hashing code using bcrypt should go here.
    for (const user of dummyUsers) {
      await putData(db, user);
    }
  }
  
export { initializeUsers };