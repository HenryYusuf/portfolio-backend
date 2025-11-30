import type  { Context } from 'hono';

export const successResponse = (c: Context, data: any, message = 'Success', status = 200) => {
  return c.json({
    success: true,
    message,
    data,
  }, status as any);
};

export const errorResponse = (c: Context, message = 'Internal Server Error', status = 500, errors?: any) => {
  return c.json({
    success: false,
    message,
    errors,
  }, status as any);
};