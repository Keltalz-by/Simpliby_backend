import { Router } from 'express';
import { type Routes } from '@src/common';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (_req, res) => {
      return res.status(200).json({ message: 'User API working' });
    });
  }
}
