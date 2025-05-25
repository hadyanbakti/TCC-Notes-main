import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Notes from "./NotesModel.js";

Users.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil!");

    await db.sync({ force: true });
    console.log("Semua tabel berhasil disinkronisasi dan di-reset.");
  } catch (err) {
    console.error("Gagal konek DB:", err);
  }
})();

export { Users, Notes };
