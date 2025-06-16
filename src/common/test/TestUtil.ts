import { User } from "./../../user/user.entity";
export default class TestUtil {
    static giveMeAvaliduser(): User {
        const user = new User();
        user.email = "validator@email.com";
        user.name = "validator"
        user.id = "1"
        return user;
    }
}