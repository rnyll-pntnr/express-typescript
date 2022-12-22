import { Service } from "typedi"
import ProductsRepository from "./products.repository";

@Service()
export default class ProductsService {
    constructor(private readonly productsRepo: ProductsRepository) { }

    async getAll() {
        return await this.productsRepo.getAll()
    }
}