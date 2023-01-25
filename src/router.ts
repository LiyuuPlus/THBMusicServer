import express from 'express';
import { routes } from './routes';

let router = express.Router();

routes.map((value) => {
  const { path, type, cb } = value;
  if (type === "GET") {
    router.get(path, cb);
  }
  if (type === "POST") {
    router.post(path, cb);
  }
  if (type === "DELETE") {
    router.delete(path, cb);
  }
  if (type === "PUT") {
    router.put(path, cb);
  }
});

export default router;