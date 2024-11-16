import express from 'express';
import Page2 from '../../models/page2Model.js'; // Adjust path based on structure
import authMiddleware from '../../middleware/authMiddleware.js'; // Adjust path based on structure

const router = express.Router();

// Fetch all entries for Page 2
router.get('/', authMiddleware, async (req, res) => {
    try {
        const entries = await Page2.find({ username: req.user.username });
        res.status(200).json(entries);
    } catch (err) {
        console.error('Error fetching entries:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new entry for Page 2
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, age, team } = req.body;
        const username = req.user.username;

        const entry = new Page2({ name, age, team, username });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        console.error('Error adding entry:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an entry for Page 2
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, age, team } = req.body;
        const entry = await Page2.findByIdAndUpdate(
            req.params.id,
            { name, age, team },
            { new: true, runValidators: true }
        );

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(200).json(entry);
    } catch (err) {
        console.error('Error updating entry:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an entry for Page 2
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const entry = await Page2.findByIdAndDelete(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting entry:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;