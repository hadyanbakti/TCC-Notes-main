import Notes from "../model/NotesModel.js";

export const createNotes = async (req, res) => {
  const { title, note } = req.body;
  const userId = req.user.id;

  try {
    const notes = await Notes.create({
      title,
      note,
      userId
    });
    res.status(201).json({
      message: "Notes created",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await Notes.findAll({ 
      where: { userId },
      order: [['Tanggal_dibuat', 'DESC']]
    });

    res.status(200).json({
      message: "Notes found",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, note } = req.body;

  try {
    const existingNote = await Notes.findOne({
      where: { id, userId }
    });

    if (!existingNote) {
      return res.status(404).json({ 
        message: "Note not found" 
      });
    }

    await Notes.update(
      { title, note },
      { where: { id, userId } }
    );

    const updatedNote = await Notes.findOne({
      where: { id, userId }
    });

    res.status(200).json({
      message: "Notes updated",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const existingNote = await Notes.findOne({
      where: { id, userId }
    });

    if (!existingNote) {
      return res.status(404).json({ 
        message: "Note not found" 
      });
    }

    await Notes.destroy({
      where: { id, userId }
    });

    res.status(200).json({
      message: "Notes deleted",
      data: existingNote
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
