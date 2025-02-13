import cron from "node-cron";
import { deleteManyOldNotes } from "../services/noteService.js";

// Schedule: Runs at 12:00 AM every 3 days
cron.schedule("0 0 */3 * *", async () => {
  try {
    const result = await deleteManyOldNotes();
    console.log(`Deleted ${result.deletedCount} old notes.`);
  } catch (error) {
    console.error("Error deleting old notes:", error);
  }
});
