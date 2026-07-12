/**
 * Seed script to add 10 dummy users to the database
 * Run with: npm run seed:users
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const dummyUsers = [
  {
    name: 'John Admin',
    email: 'john.admin@transitops.com',
    password: 'Admin@123',
    phone: '+91-9876543210',
    role: 'Admin',
    status: 'Active',
    permissions: [
      'users.view', 'users.create', 'users.update', 'users.delete',
      'roles.view', 'roles.create', 'roles.update', 'roles.delete',
      'vehicles.view', 'vehicles.create', 'vehicles.update', 'vehicles.delete', 'vehicles.assign',
      'drivers.view', 'drivers.create', 'drivers.update', 'drivers.delete', 'drivers.assign',
      'trips.view', 'trips.create', 'trips.update', 'trips.delete', 'trips.dispatch', 'trips.complete', 'trips.cancel',
      'maintenance.view', 'maintenance.create', 'maintenance.update', 'maintenance.delete', 'maintenance.approve',
      'fuel.view', 'fuel.create', 'fuel.update', 'fuel.delete',
      'expenses.view', 'expenses.create', 'expenses.update', 'expenses.delete', 'expenses.approve', 'expenses.reject',
      'settings.view', 'settings.update',
      'analytics.view', 'analytics.export',
    ],
  },
  {
    name: 'Sarah Manager',
    email: 'sarah.manager@transitops.com',
    password: 'Manager@123',
    phone: '+91-9876543211',
    role: 'Manager',
    status: 'Active',
    permissions: [
      'users.view', 'users.create', 'users.update', 'users.delete',
      'roles.view', 'roles.create', 'roles.update', 'roles.delete',
      'vehicles.view', 'vehicles.create', 'vehicles.update', 'vehicles.delete', 'vehicles.assign',
      'drivers.view', 'drivers.create', 'drivers.update', 'drivers.delete', 'drivers.assign',
      'trips.view', 'trips.create', 'trips.update', 'trips.delete', 'trips.dispatch', 'trips.complete', 'trips.cancel',
      'maintenance.view', 'maintenance.create', 'maintenance.update', 'maintenance.delete', 'maintenance.approve',
      'fuel.view', 'fuel.create', 'fuel.update', 'fuel.delete',
      'expenses.view', 'expenses.create', 'expenses.update', 'expenses.delete', 'expenses.approve', 'expenses.reject',
      'settings.view',
      'analytics.view', 'analytics.export',
    ],
  },
  {
    name: 'Mike Dispatcher',
    email: 'mike.dispatcher@transitops.com',
    password: 'Dispatcher@123',
    phone: '+91-9876543212',
    role: 'Dispatcher',
    status: 'Active',
    permissions: [
      'vehicles.view',
      'drivers.view',
      'trips.view', 'trips.create', 'trips.update', 'trips.dispatch', 'trips.complete', 'trips.cancel',
      'maintenance.view',
      'analytics.view',
    ],
  },
  {
    name: 'Emily Dispatcher',
    email: 'emily.dispatcher@transitops.com',
    password: 'Dispatcher@123',
    phone: '+91-9876543213',
    role: 'Dispatcher',
    status: 'Active',
    permissions: [
      'vehicles.view',
      'drivers.view',
      'trips.view', 'trips.create', 'trips.update', 'trips.dispatch', 'trips.complete', 'trips.cancel',
      'maintenance.view',
      'analytics.view',
    ],
  },
  {
    name: 'David Driver',
    email: 'david.driver@transitops.com',
    password: 'Driver@123',
    phone: '+91-9876543214',
    role: 'Driver',
    status: 'Active',
    permissions: [
      'trips.view',
      'trips.update',
      'vehicles.view',
    ],
  },
  {
    name: 'Lisa Driver',
    email: 'lisa.driver@transitops.com',
    password: 'Driver@123',
    phone: '+91-9876543215',
    role: 'Driver',
    status: 'Active',
    permissions: [
      'trips.view',
      'trips.update',
      'vehicles.view',
    ],
  },
  {
    name: 'Robert Driver',
    email: 'robert.driver@transitops.com',
    password: 'Driver@123',
    phone: '+91-9876543216',
    role: 'Driver',
    status: 'Active',
    permissions: [
      'trips.view',
      'trips.update',
      'vehicles.view',
    ],
  },
  {
    name: 'Jennifer Mechanic',
    email: 'jennifer.mechanic@transitops.com',
    password: 'Mechanic@123',
    phone: '+91-9876543217',
    role: 'Mechanic',
    status: 'Active',
    permissions: [
      'vehicles.view',
      'maintenance.view',
      'maintenance.create',
      'maintenance.update',
    ],
  },
  {
    name: 'William Mechanic',
    email: 'william.mechanic@transitops.com',
    password: 'Mechanic@123',
    phone: '+91-9876543218',
    role: 'Mechanic',
    status: 'Active',
    permissions: [
      'vehicles.view',
      'maintenance.view',
      'maintenance.create',
      'maintenance.update',
    ],
  },
  {
    name: 'Amanda Dispatcher',
    email: 'amanda.dispatcher@transitops.com',
    password: 'Dispatcher@123',
    phone: '+91-9876543219',
    role: 'Dispatcher',
    status: 'Active',
    permissions: [
      'vehicles.view',
      'drivers.view',
      'trips.view', 'trips.create', 'trips.update', 'trips.dispatch', 'trips.complete', 'trips.cancel',
      'maintenance.view',
      'analytics.view',
    ],
  },
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/transitops';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing users)
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const usersWithHashedPasswords = await Promise.all(
      dummyUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users
    const insertedUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`Successfully inserted ${insertedUsers.length} users`);

    // Display inserted users
    console.log('\n=== Inserted Users ===');
    insertedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
      console.log(`   Password: ${dummyUsers[index].password}`);
    });

    console.log('\n=== Login Credentials ===');
    console.log('Admin: john.admin@transitops.com / Admin@123');
    console.log('Manager: sarah.manager@transitops.com / Manager@123');
    console.log('Dispatcher: mike.dispatcher@transitops.com / Dispatcher@123');
    console.log('Driver: david.driver@transitops.com / Driver@123');
    console.log('Mechanic: jennifer.mechanic@transitops.com / Mechanic@123');

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedUsers();
