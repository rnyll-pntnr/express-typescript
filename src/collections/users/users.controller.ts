import {
    JsonController,
    Get
} from "routing-controllers";
import { Service } from "typedi"
import UsersService from "./users.service";

@Service()
@JsonController('/users')
export default class UsersController {
    
    constructor(private readonly usersService: UsersService) { }

    @Get('/')
    async getAll() {
        return this.usersService.getAll()
    }
}