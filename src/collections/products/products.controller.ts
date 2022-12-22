import {
    JsonController,
    Get
} from "routing-controllers";
import { Service } from "typedi"
import ProductsService from "./products.service";

@Service()
@JsonController('/products')
export default class ProductsController {
    
    constructor(private readonly productsService: ProductsService) { }

    @Get('/')
    async getAll() {
        return this.productsService.getAll()
    }
}