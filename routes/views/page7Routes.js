import express from 'express';
import Page7 from '../../models/page7Model.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// Fetch all entries for Page 7
router.get('/', authMiddleware, async (req, res) => {
    try {
        const entries = await Page7.find({ username: req.user.username });
        res.status(200).json(entries);
    } catch (err) {
        console.error('Error fetching entries for Page 7:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new entry for Page 7
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, age, team } = req.body;
        const username = req.user.username;

        const entry = new Page7({ name, age, team, username });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        console.error('Error adding entry for Page 7:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an entry for Page 7
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, age, team } = req.body;
        const entry = await Page7.findByIdAndUpdate(
            req.params.id,
            { name, age, team },
            { new: true, runValidators: true }
        );

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found for Page 7' });
        }

        res.status(200).json(entry);
    } catch (err) {
        console.error('Error updating entry for Page 7:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an entry for Page 7
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const entry = await Page7.findByIdAndDelete(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found for Page 7' });
        }

        res.status(200).json({ message: 'Entry deleted successfully for Page 7' });
    } catch (err) {
        console.error('Error deleting entry for Page 7:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
