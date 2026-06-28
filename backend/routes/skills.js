const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { res.json({ success: true, skills: ['Frontend','Backend','Full Stack','Mobile','AI/ML','DevOps','Marketing','Growth','SEO','Design','UI/UX','Product','Sales','Finance','Operations','Data','Blockchain','Content','Legal','Branding'] }); });
router.post('/certify', auth, async (req, res) => { res.json({ success: true, message: 'Coming soon' }); });
module.exports = router;
