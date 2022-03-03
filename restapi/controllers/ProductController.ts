import {Request, Response} from "express";
import * as ProductRepository from "./../repository/ProductRepository";

// - GET - /product/list # returns all products
// - GET - /product/details/{1} # returns a product with id 1
// - PUT - /product/add # inserts a new product into the table
// - DELETE - /product/{1} # deletes a product with id of 1
// - POST - /product/update/{1} # updates a book with id of 1