import { Service } from "typedi"

@Service()
export default class UsersRepository {
    async getAll() {
        return {
            message: "",
            data: "Get all"
        }
    }
}