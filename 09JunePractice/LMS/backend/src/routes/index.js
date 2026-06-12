const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const progressRoutes = require('./progressRoutes');

router.use('/auth', authRoutes);
// progressRoutes MUST be registered before courseRoutes.
// /courses/enrolled must resolve before /courses/:id (wildcard) captures it.
router.use('/', progressRoutes);
router.use('/', courseRoutes);

module.exports = router;
