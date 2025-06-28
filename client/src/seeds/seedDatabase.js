import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import users from './users.js';
import cases from './cases.js';
import User from './models/Users.js';
import Case from './models/Case.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/missing-alert';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB with options
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    // Clear existing data
    await User.deleteMany({});
    await Case.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        if (!user.password) {
          throw new Error(`User ${user.email} is missing password`);
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const insertedUsers = await User.insertMany(hashedUsers);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Create user email to ID mapping
    const userMap = {};
    insertedUsers.forEach(user => {
      userMap[user.email] = user._id;
    });

    // Process cases with proper error handling
    const updatedCases = cases.map((caseItem, index) => {
      let createdBy;
      
      // Try to find matching user by email
      if (caseItem.contactInfo?.primaryContact?.email) {
        createdBy = userMap[caseItem.contactInfo.primaryContact.email];
      }
      
      // Fallback to first user if no match found
      if (!createdBy) {
        createdBy = insertedUsers[0]._id;
        console.warn(`Case ${index}: No matching user found for email ${caseItem.contactInfo?.primaryContact?.email}, using fallback user`);
      }

      // Add author to updates if they exist
      const updatesWithAuthor = caseItem.updates?.map(update => ({
        ...update,
        author: createdBy,
      })) || [];

      return {
        ...caseItem,
        createdBy,
        updates: updatesWithAuthor,
      };
    });

    const insertedCases = await Case.insertMany(updatedCases);
    console.log(`Inserted ${insertedCases.length} cases`);

    console.log('Database seeding completed successfully');
    
    // Close the connection properly
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    
    // Close connection on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

seedDatabase();