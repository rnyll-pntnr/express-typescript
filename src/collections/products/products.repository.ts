import { Service } from "typedi"

@Service()
export default class ProductsRepository {
    async getAll() {
        return {
            message: "",
            data: "Get all"
        }
    }
}