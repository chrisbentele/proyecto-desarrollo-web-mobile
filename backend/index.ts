import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Book } from "./entity/Book.js";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

createConnection()
  .then((connection) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    // Define routes here
    app.get("/books", async (req, res) => {
      const bookRepository = connection.getRepository(Book);
      const books = await bookRepository.find();
      res.json(books);
    });

    app.get("/books/:id", async (req: Request, res: Response) => {
      const bookRepository = connection.getRepository(Book);
      const bookId = req.params.id;

      if (!bookId) {
        return res.status(400).send();
      }

      const results = await bookRepository.findOne({ where: { id: bookId } });
      return res.send(results);
    });

    app.post("/books", async (req: Request, res: Response) => {
      const bookRepository = connection.getRepository(Book);
      const book = await bookRepository.create(req.body);
      const results = await bookRepository.save(book);
      return res.send(results);
    });

    app.put("/books/:id", async (req: Request, res: Response) => {
      const bookRepository = connection.getRepository(Book);
      const bookId = req.params.id;
      const book = await bookRepository.findOne({ where: { id: bookId } });

      if (!book) {
        return res.status(404).send("Book not found");
      }

      const updatedBook = await bookRepository.merge(book, req.body);
      const results = await bookRepository.save(updatedBook);
      return res.send(results);
    });

    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => console.log(error));
