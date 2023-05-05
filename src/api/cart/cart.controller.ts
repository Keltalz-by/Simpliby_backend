import { type Request, type Response, type NextFunction } from 'express';
import { CartService } from './cart.service';
import { type AddToCartInput } from './cart.schema';

export class CartController {
  public cartService = new CartService();

  public AddProductToCart = async (req: Request<{}, {}, AddToCartInput>, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const cartData = req.body;

      const cart = await this.cartService.addToCart(cartData, userId);

      return res.status(200).json({ success: true, data: cart });
    } catch (err: any) {
      next(err);
    }
  };

  public getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;

      const cart = await this.cartService.getUserCart(userId);

      return res.status(200).json({ success: true, data: cart });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;

      await this.cartService.deleteUserCart(userId);

      return res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}
