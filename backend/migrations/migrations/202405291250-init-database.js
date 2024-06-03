const bcrypt = require('bcryptjs');

module.exports = {
  async up(db, client) {
    // Insert base roles
    const roles = [
      { name: 'admin', permissions: ['create_role', 'read_role', 'update_role', 'delete_role', 'create_user', 'read_user', 'update_user', 'delete_user'] },
      { name: 'user', permissions: ['read_user', 'update_user'] }
      // Add more roles as needed
    ];

    await db.collection('roles').insertMany(roles);

    // Insert admin user
    const password = await bcrypt.hash('admin', 10);
    const adminUser = {
      name: 'Admin',
      email: 'admin@example.com',
      password: password,
      roles: [], // Roles will be added after role insertion
      CreationDate: new Date(),
      blocked: false,
      externalID: 'admin-external-id',
      enterprises: []
    };

    const insertedRoles = await db.collection('roles').find({}).toArray();
    adminUser.roles = insertedRoles.map(role => role._id);

    await db.collection('users').insertOne(adminUser);
  },

  async down(db, client) {
    await db.collection('roles').deleteMany({});
    await db.collection('users').deleteOne({ email: 'admin@example.com' });
  }
};
