import express from 'express';
import isAdmin from '../util/isAdmin';

export default ({ appUrl, passport }) => {
  const router = express.Router();

  router.get('/homepage', isAdmin, (req, res) => res.render('pages/admin_dashboard', { appLocation: appUrl }));
  router.get('/page', isAdmin, (req, res) => res.render('pages/admin_page', { appLocation: appUrl }));

  return router;
};