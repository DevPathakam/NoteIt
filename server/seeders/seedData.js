import NoteType from "../models/noteType.js";
import systemNoteTypes from "../data/systemNoteTypes.js";

const seedSystemNoteTypes = async () => {
  try {
    // Check if system types already exist
    const existingTypes = await NoteType.find({ isSystemType: true });

    if (existingTypes.length === 0) {
      const systemNoteTypesWithFlag = systemNoteTypes.map((type) => ({
        ...type,
        isSystemType: true, // Ensure isSystemType flag is true
      }));

      // Insert the system note types
      await NoteType.insertMany(systemNoteTypesWithFlag);
      console.log("✅ System note types seeded successfully.");
    } else {
      console.log("⚡ System note types already exist.");
    }
  } catch (error) {
    console.error("❌ Error seeding system note types:", error.message);
  }
};

export default seedSystemNoteTypes;
