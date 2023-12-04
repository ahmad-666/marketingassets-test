import { db, errorHandler } from ".";

export async function dbConnect() {
  //before sending any req first we call it
  try {
    if (!db.initialized) {
      await db.initialize();
      return db;
    } else {
      return db;
    }
  } catch (err) {
    // global error handler
    console.log(err);
    errorHandler(err);
  }
}
