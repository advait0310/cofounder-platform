const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const skills = [
      'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI/ML',
      'DevOps', 'Marketing', 'Growth', 'SEO', 'Design',
      'UI/UX', 'Product', 'Sales', 'Finance', 'Operations',
      'Data', 'Blockchain', 'Content', 'Legal', 'Branding'
    ];
    res.json({ success: true, skills });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/certify', auth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Skill certification coming soon' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
